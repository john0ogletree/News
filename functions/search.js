import { FEEDS, fetchFeed } from "./_shared/feeds.js";
import { renderPage } from "./_shared/layout.js";
import { renderStory, hostOf, withPrivacyHeaders } from "./index.js";
import { escapeHtml } from "./_shared/utils.js";

/**
 * /search?q=<term>&cat=<category>
 *
 * Server-side substring search over the currently fetched feed items.
 * No result caching: a shared edge cache must never retain someone's query.
 * The query itself is not logged, stored, or transmitted anywhere except
 * back into the HTML for the user to see their own input.
 */
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const rawQ = url.searchParams.get("q") || "";
  const activeCat = url.searchParams.get("cat") || null;

  // Normalize: trim, collapse whitespace, cap length. No logging.
  const q = rawQ.replace(/\s+/g, " ").trim().slice(0, 120);
  const terms = q
    .toLowerCase()
    .split(" ")
    .filter(Boolean);

  // Fetch all feeds in parallel (not cached — search is query-specific).
  const results = await Promise.all(FEEDS.map(fetchFeed));
  let items = results.flat();

  // Filter by category first (cheap), then by search terms.
  if (activeCat) items = items.filter((i) => i.category === activeCat);

  if (terms.length) {
    items = items.filter((item) => {
      const haystack = (
        (item.title || "") + " " +
        (item.description || "") + " " +
        (item.source || "") + " " +
        (item.category || "")
      ).toLowerCase();
      // Every term must appear somewhere (AND semantics)
      return terms.every((t) => haystack.includes(t));
    });
  }

  // Sort newest first
  items.sort((a, b) => {
    const ta = a.pubDate ? new Date(a.pubDate).getTime() : 0;
    const tb = b.pubDate ? new Date(b.pubDate).getTime() : 0;
    return tb - ta;
  });

  items = items.slice(0, 100);

  const categories = {
    list: [...new Set(FEEDS.map((f) => f.category))].sort(),
    active: activeCat,
  };

  const head = renderResultsHead({ q, activeCat, count: items.length });

  const body = items.length
    ? head + items.map(renderStory).join("")
    : head + `<p class="empty">No stories match ${q ? `“${escapeHtml(q)}”` : "your search"}${activeCat ? ` in ${escapeHtml(activeCat)}` : ""}.</p>`;

  const html = renderPage({
    title: q ? `Search: ${q} — news.jao.life` : "Search — news.jao.life",
    body,
    categories,
    query: q,
  });

  const response = new Response(html, {
    headers: {
      "Content-Type": "text/html;charset=UTF-8",
      // Never cache search results — they contain user-supplied input.
      "Cache-Control": "no-store",
    },
  });

  return withPrivacyHeaders(response);
}

function renderResultsHead({ q, activeCat, count }) {
  if (!q && !activeCat) {
    return `<p class="results-head">Showing <strong>${count}</strong> recent stories across all categories.</p>`;
  }

  const parts = [];
  if (q) parts.push(`<strong>“${escapeHtml(q)}”</strong>`);
  if (activeCat) parts.push(`in <strong>${escapeHtml(activeCat)}</strong>`);

  const clearParams = [];
  if (activeCat) clearParams.push(`cat=${encodeURIComponent(activeCat)}`);
  const clearHref = clearParams.length ? `/?${clearParams.join("&")}` : "/";

  return `<p class="results-head">Found <strong>${count}</strong> ${count === 1 ? "story" : "stories"} matching ${parts.join(" ")}.<a class="clear" href="${clearHref}" rel="noreferrer">clear</a></p>`;
}
