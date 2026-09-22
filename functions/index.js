import { FEEDS, fetchFeed } from "./_shared/feeds.js";
import { renderPage } from "./_shared/layout.js";
import { timeAgo, escapeHtml } from "./_shared/utils.js";

const CACHE_TTL = 300; // 5 minutes

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const activeCat = url.searchParams.get("cat");

  const cache = caches.default;
  const cacheKey = new Request(new URL(`/__cache/feed/${activeCat || "all"}`, request.url).toString());
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  // Fetch all feeds in parallel
  const results = await Promise.all(FEEDS.map(fetchFeed));
  let items = results.flat();

  // Filter by category if requested
  if (activeCat) {
    items = items.filter(i => i.category === activeCat);
  }

  // Sort newest first
  items.sort((a, b) => {
    const ta = a.pubDate ? new Date(a.pubDate).getTime() : 0;
    const tb = b.pubDate ? new Date(b.pubDate).getTime() : 0;
    return tb - ta;
  });

  // Cap to avoid gigantic pages
  items = items.slice(0, 100);

  const categories = {
    list: [...new Set(FEEDS.map(f => f.category))].sort(),
    active: activeCat,
  };

  const body = items.length
    ? items.map(renderStory).join("")
    : `<p class="empty">No stories right now. Try refreshing in a minute.</p>`;

  const html = renderPage({
    title: activeCat ? `${activeCat} — news.jao.life` : "news.jao.life",
    body,
    categories,
  });

  const response = new Response(html, {
    headers: {
      "Content-Type": "text/html;charset=UTF-8",
      "Cache-Control": `public, max-age=${CACHE_TTL}`,
    },
  });

  context.waitUntil(cache.put(cacheKey, response.clone()));
  return response;
}

function renderStory(item) {
  return `
    <a class="story" href="${escapeHtml(item.link)}" target="_blank" rel="noopener noreferrer">
      <h2 class="story-title">${escapeHtml(item.title)}</h2>
      ${item.description ? `<p class="story-desc">${escapeHtml(item.description)}</p>` : ""}
      <div class="story-meta">
        <span class="source">${escapeHtml(item.source)}</span>
        ${item.pubDate ? `<span>${timeAgo(item.pubDate)}</span>` : ""}
      </div>
    </a>
  `;
}
