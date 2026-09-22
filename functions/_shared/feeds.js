export const FEEDS = [
  { name: "BBC News",        url: "https://feeds.bbci.co.uk/news/rss.xml",                    category: "world" },
  { name: "Reuters",         url: "https://feeds.reuters.com/reuters/topNews",                category: "world" },
  { name: "The Guardian",    url: "https://www.theguardian.com/world/rss",                    category: "world" },
  { name: "Ars Technica",    url: "https://feeds.arstechnica.com/arstechnica/index",          category: "tech" },
  { name: "Hacker News",     url: "https://hnrss.org/frontpage",                              category: "tech" },
  { name: "The Verge",       url: "https://www.theverge.com/rss/index.xml",                   category: "tech" },
  { name: "NPR",             url: "https://feeds.npr.org/1001/rss.xml",                       category: "world" },
  { name: "Al Jazeera",      url: "https://www.aljazeera.com/xml/rss/all.xml",                category: "world" },
];

/**
 * Fetch and parse an RSS feed. Returns a normalized array of items.
 * Never throws — on failure, returns [].
 */
export async function fetchFeed(feed) {
  try {
    const res = await fetch(feed.url, {
      headers: {
        "User-Agent": "news.jao.life aggregator (+https://news.jao.life)",
        "Accept": "application/rss+xml, application/xml, text/xml, */*",
      },
      cf: { cacheTtl: 300, cacheEverything: true },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseRSS(xml, feed);
  } catch (_) {
    return [];
  }
}

/**
 * Minimal RSS + Atom parser. Returns [{ title, link, description, pubDate, source, category }]
 */
function parseRSS(xml, feed) {
  const items = [];

  // <item> (RSS 2.0) or <entry> (Atom)
  const blocks = xml.match(/<item[\s>][\s\S]*?<\/item>|<entry[\s>][\s\S]*?<\/entry>/gi) || [];

  for (const block of blocks) {
    const title = extractTag(block, "title");
    const link = extractLink(block);
    const description = extractTag(block, "description") || extractTag(block, "summary");
    const pubDate =
      extractTag(block, "pubDate") ||
      extractTag(block, "published") ||
      extractTag(block, "updated");

    if (!title || !link) continue;

    items.push({
      title: cleanText(title),
      link: link.trim(),
      description: cleanText(stripHTML(description || "")).slice(0, 240),
      pubDate: pubDate ? new Date(pubDate).toISOString() : null,
      source: feed.name,
      category: feed.category,
    });
  }

  return items;
}

function extractTag(block, tag) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = block.match(re);
  if (!m) return null;
  return m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim();
}

function extractLink(block) {
  // RSS: <link>https://...</link>
  const plain = block.match(/<link[^>]*>([\s\S]*?)<\/link>/i);
  if (plain && plain[1].trim()) return plain[1].trim();

  // Atom: <link href="https://..." />
  const href = block.match(/<link[^>]*href=["']([^"']+)["']/i);
  if (href) return href[1];

  return null;
}

function stripHTML(str) {
  return str.replace(/<[^>]*>/g, " ");
}

function cleanText(str) {
  return decodeEntities(str).replace(/\s+/g, " ").trim();
}

function decodeEntities(str) {
  const entities = {
    "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"',
    "&#39;": "'", "&apos;": "'", "&nbsp;": " ",
    "&#8217;": "'", "&#8216;": "'", "&#8220;": '"', "&#8221;": '"',
    "&#8212;": "—", "&#8211;": "–",
  };
  return str.replace(/&[#\w]+;/g, (m) => entities[m] || m);
}
