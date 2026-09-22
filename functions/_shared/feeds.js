export const FEEDS = [
  // ── World News ──────────────────────────────────────────────────────────
  { name: "BBC News",              url: "https://feeds.bbci.co.uk/news/rss.xml",                          category: "world" },
  { name: "BBC World",             url: "https://feeds.bbci.co.uk/news/world/rss.xml",                    category: "world" },
  { name: "Reuters",               url: "https://feeds.reuters.com/reuters/topNews",                      category: "world" },
  { name: "The Guardian",          url: "https://www.theguardian.com/world/rss",                          category: "world" },
  { name: "NPR",                   url: "https://feeds.npr.org/1001/rss.xml",                            category: "world" },
  { name: "Al Jazeera",            url: "https://www.aljazeera.com/xml/rss/all.xml",                      category: "world" },
  { name: "CNN World",             url: "http://rss.cnn.com/rss/edition_world.rss",                       category: "world" },
  { name: "New York Times World",  url: "https://www.nytimes.com/section/world/rss.xml",                  category: "world" },
  { name: "Washington Post World", url: "https://feeds.washingtonpost.com/rss/world",                     category: "world" },
  { name: "Deutsche Welle",        url: "https://rss.dw.com/rdf/rss-en-all",                              category: "world" },
  { name: "France 24",             url: "https://www.france24.com/en/rss",                                category: "world" },
  { name: "South China Morning Post", url: "https://www.scmp.com/rss/2/feed",                             category: "world" },
  { name: "The Hindu",             url: "https://www.thehindu.com/news/feeder/default.rss",               category: "world" },
  { name: "ABC News Australia",    url: "https://www.abc.net.au/news/feed/51120/rss.xml",                 category: "world" },
  { name: "Sydney Morning Herald", url: "https://www.smh.com.au/rss/feed.xml",                            category: "world" },
  { name: "AllAfrica",             url: "https://allafrica.com/tools/headlines/rdf/africa/headlines.rdf", category: "world" },

  // ── Technology ──────────────────────────────────────────────────────────
  { name: "Ars Technica",          url: "https://feeds.arstechnica.com/arstechnica/index",                category: "tech" },
  { name: "Hacker News",           url: "https://hnrss.org/frontpage",                                    category: "tech" },
  { name: "Hacker News Best",      url: "https://hnrss.org/best",                                         category: "tech" },
  { name: "Hacker News Newest",    url: "https://hnrss.org/newest",                                       category: "tech" },
  { name: "Hacker News Ask",       url: "https://hnrss.org/ask",                                          category: "tech" },
  { name: "Hacker News Show",      url: "https://hnrss.org/show",                                         category: "tech" },
  { name: "The Verge",             url: "https://www.theverge.com/rss/index.xml",                         category: "tech" },
  { name: "TechCrunch",            url: "https://techcrunch.com/feed/",                                   category: "tech" },
  { name: "Wired",                 url: "https://www.wired.com/feed/rss",                                 category: "tech" },
  { name: "Engadget",              url: "https://www.engadget.com/rss.xml",                               category: "tech" },
  { name: "ZDNet",                 url: "https://www.zdnet.com/news/rss.xml",                             category: "tech" },
  { name: "MIT Technology Review", url: "https://www.technologyreview.com/feed/",                         category: "tech" },
  { name: "VentureBeat",           url: "https://venturebeat.com/feed/",                                  category: "tech" },
  { name: "Mashable",              url: "https://mashable.com/feeds/rss/all",                             category: "tech" },
  { name: "Slashdot",              url: "https://rss.slashdot.org/Slashdot/slashdotMain",                 category: "tech" },
  { name: "Cloudflare Blog",       url: "https://blog.cloudflare.com/rss/",                               category: "tech" },
  { name: "GitHub Blog",           url: "https://github.blog/feed/",                                      category: "tech" },
  { name: "Stack Overflow Blog",   url: "https://stackoverflow.blog/feed/",                               category: "tech" },
  { name: "Vercel News",           url: "https://vercel.com/atom",                                        category: "tech" },

  // ── Security ────────────────────────────────────────────────────────────
  { name: "Krebs on Security",     url: "https://krebsonsecurity.com/feed/",                              category: "security" },
  { name: "The Hacker News",       url: "https://feeds.feedburner.com/TheHackersNews",                    category: "security" },
  { name: "Schneier on Security",  url: "https://www.schneier.com/feed/",                                 category: "security" },
  { name: "CISA News",             url: "https://www.cisa.gov/news.xml",                                  category: "security" },
  { name: "Google Security Blog",  url: "https://security.googleblog.com/atom.xml",                       category: "security" },
  { name: "FreeBuf",               url: "https://www.freebuf.com/feed",                                   category: "security" },

  // ── AI & Research ───────────────────────────────────────────────────────
  { name: "OpenAI News",           url: "https://openai.com/news/rss.xml",                                category: "ai" },
  { name: "Anthropic",             url: "https://www.anthropic.com/rss.xml",                              category: "ai" },
  { name: "Hugging Face Blog",     url: "https://huggingface.co/blog/feed.xml",                           category: "ai" },
  { name: "arXiv CS.AI",           url: "https://export.arxiv.org/rss/cs.AI",                             category: "ai" },
  { name: "arXiv CS.LG",           url: "https://export.arxiv.org/rss/cs.LG",                             category: "ai" },
  { name: "Google AI Blog",        url: "https://blog.google/technology/ai/rss/",                         category: "ai" },

  // ── Business & Finance ──────────────────────────────────────────────────
  { name: "Bloomberg Technology",  url: "https://feeds.bloomberg.com/technology/news.rss",                category: "business" },
  { name: "Financial Times",       url: "https://www.ft.com/?format=rss",                                 category: "business" },
  { name: "CNBC Technology",       url: "https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=19854910", category: "business" },
  { name: "The Economist",         url: "https://www.economist.com/finance-and-economics/rss.xml",        category: "business" },
  { name: "CoinDesk",              url: "https://www.coindesk.com/arc/outboundfeeds/rss/",                category: "business" },
  { name: "CoinTelegraph",         url: "https://cointelegraph.com/rss",                                  category: "business" },

  // ── Science & Space ─────────────────────────────────────────────────────
  { name: "NASA Breaking News",    url: "https://www.nasa.gov/rss/dyn/breaking_news.rss",                 category: "science" },
  { name: "Nature News",           url: "https://www.nature.com/nature.rss",                              category: "science" },
  { name: "Science Daily",         url: "https://www.sciencedaily.com/rss/all.xml",                       category: "science" },
  { name: "Phys.org",              url: "https://phys.org/rss-feed/",                                     category: "science" },
  { name: "Space.com",             url: "https://www.space.com/feeds/all",                                category: "science" },
];

/**
 * Fetch and parse an RSS feed. Returns a normalized array of items.
 * Never throws — on failure, returns [].
 *
 * PRIVACY NOTE: We deliberately construct a fresh, minimal request with NO
 * client-supplied headers. The visitor's IP, cookies, and Referer never reach
 * the upstream publisher. Cloudflare's edge cache (`cf.cacheTtl`) also means
 * most fetches are served entirely from cache without hitting the origin.
 */
export async function fetchFeed(feed) {
  try {
    const res = await fetch(feed.url, {
      method: "GET",
      headers: {
        "User-Agent": "news.jao.life aggregator (+https://news.jao.life; privacy-first)",
        "Accept": "application/rss+xml, application/atom+xml, application/xml, text/xml, */*",
        "Accept-Language": "en",
        // Explicitly NOT forwarded: Cookie, Referer, Authorization, X-Forwarded-For
      },
      redirect: "follow",
      cf: {
        cacheTtl: 300,
        cacheEverything: true,
        // Strip identifying info when Cloudflare talks to origin
        scrapeShield: false,
      },
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
