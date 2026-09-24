import { FEEDS, fetchFeed } from "./_shared/feeds.js";
import { renderPage } from "./_shared/layout.js";
import { timeAgo, escapeHtml, safeExternalUrl } from "./_shared/utils.js";

const CACHE_TTL = 300;

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const activeCat = url.searchParams.get("cat");

  const cache = caches.default;
  const cacheKey = new Request(
    new URL(`/__cache/feed/${activeCat || "all"}`, request.url).toString()
  );
  const cached = await cache.match(cacheKey);
  if (cached) return withPrivacyHeaders(cached);

  const results = await Promise.all(FEEDS.map(fetchFeed));
  let items = results.flat();

  if (activeCat) items = items.filter((i) => i.category === activeCat);

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

  const body = items.length
    ? items.map(renderStory).join("")
    : `<p class="empty">No stories right now. Try refreshing in a minute.</p>`;

  const html = renderPage({
    title: activeCat ? `${activeCat} — news.jao.life` : "news.jao.life",
    body,
    categories,
    query: "",
  });

  const response = new Response(html, {
    headers: {
      "Content-Type": "text/html;charset=UTF-8",
      "Cache-Control": `public, max-age=${CACHE_TTL}`,
    },
  });

  context.waitUntil(cache.put(cacheKey, response.clone()));
  return withPrivacyHeaders(response);
}

export function renderStory(item) {
  const dest = safeExternalUrl(item.link);
  if (!dest) return "";
  const outHref = `/out?u=${encodeURIComponent(dest)}`;
  const host = hostOf(dest);

  const title = escapeHtml(item.title || "");
  const desc = item.description ? escapeHtml(item.description) : "";
  const source = escapeHtml(item.source || "");
  const hostEsc = escapeHtml(host);

  return `
    <a class="story" href="${escapeHtml(outHref)}" rel="noreferrer noopener">
      <h2 class="story-title">${title}</h2>
      ${desc ? `<p class="story-desc">${desc}</p>` : ""}
      <div class="story-meta">
        <span class="source">${source}</span>
        ${item.pubDate ? `<span>${escapeHtml(timeAgo(item.pubDate))}</span>` : ""}
        <span class="read-full">${hostEsc} →</span>
      </div>
    </a>
  `;
}

export function hostOf(u) {
  try { return new URL(u).host; } catch { return "link"; }
}

export function withPrivacyHeaders(res) {
  const headers = new Headers(res.headers);
  headers.set("Referrer-Policy", "no-referrer");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set(
    "Permissions-Policy",
    "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()"
  );
  headers.set("Cross-Origin-Opener-Policy", "same-origin");
  headers.set("Cross-Origin-Resource-Policy", "same-origin");
  headers.set(
    "Content-Security-Policy",
    [
      "default-src 'none'",
      "style-src 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'none'",
      "script-src https://support.jao.life",
      "connect-src 'none'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "base-uri 'none'",
    ].join("; ")
  );
  return new Response(res.body, { status: res.status, headers });
}
