# news.jao.life

A privacy-first, snippet-only RSS reader. Headlines link out to the original publishers through an interstitial page that sends **no referrer**. No cookies, no analytics, no JavaScript, no third-party requests.

Live at **[news.jao.life](https://news.jao.life)**

I built this because every "minimal" news reader I tried still shipped trackers, fonts from Google, or a cookie banner. This one doesn't.

---

## What it does

Fetches ~60 RSS/Atom feeds server-side, normalizes them, and renders a single HTML page of headlines and short snippets. Every story link routes through `/out`, which shows you the destination host and full URL and requires a click before continuing.

No build step. No framework. No `node_modules`. Plain ES modules on Cloudflare Pages Functions.

---

## Privacy

This is the whole point.

**What I don't do**
- No cookies — not even a session cookie
- No analytics, pixels, beacons, or fingerprinting
- No third-party requests (no CDNs, fonts, ads, trackers)
- No JavaScript on the page — CSP is `script-src 'none'`
- No logging of which stories you open or which categories you browse
- No account, no email, no login

**What I do**
- Fetch feeds server-side with a generic User-Agent and cache them at the edge for 5 minutes
- Strip the `Referer` header on every outbound click
- Route every link through `/out` so you can inspect the destination first, and so the publisher never learns you came from here
- Serve the same cached HTML to everyone — your request is usually served from Cloudflare's edge without touching an origin

**What I technically can't avoid (yet)**

I'm currently running this on Cloudflare Pages Functions because I don't have my own server up yet. That means Cloudflare sits between you and the code, and I can't fully control what they see. Once I'm self-hosting, this section shrinks — but for now, honestly:

- Your IP reaches Cloudflare to deliver the page, same as any website. I don't store it or correlate it with what you read.
- Standard Cloudflare edge logs may exist briefly for abuse prevention, under [their privacy policy](https://www.cloudflare.com/privacypolicy/).

The full promise is also at [`/privacy`](https://news.jao.life/privacy).

---

## Files

```
index.js          →  /            Home feed (cached 5 min at edge)
search.js         →  /search      Server-side substring search (never cached)
out.js            →  /out         Privacy interstitial exit page
privacy.js        →  /privacy     Static privacy promise
_routes.json      →  Route manifest

_shared/
  feeds.js        →  Feed list + RSS/Atom fetch + parse
  layout.js       →  HTML shell + all CSS
  utils.js        →  escapeHtml, safeExternalUrl, timeAgo
```

### Request flow

- **`/`** — Checks `caches.default`. On miss, fetches all feeds in parallel with `cf.cacheTtl: 300`, merges, filters by `?cat=`, sorts newest-first, caps at 100, renders, writes back to the edge cache via `context.waitUntil`.
- **`/search?q=&cat=`** — Same fetch, but **never cached** (`no-store`) because a shared edge cache must never retain someone's query. Terms are whitespace-split, lowercased, AND-matched against title + description + source + category.
- **`/out?u=<encoded>`** — Validates with `safeExternalUrl` (http/https only), shows the host and full URL, links out with `referrerpolicy="no-referrer"`.
- **`/privacy`** — Static, cached 1 hour.

### Headers on every HTML route

```
Referrer-Policy: no-referrer
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
Permissions-Policy: accelerometer=(), camera=(), geolocation=(), gyroscope=(),
                    magnetometer=(), microphone=(), payment=(), usb=(),
                    interest-cohort=()
Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline';
                         img-src 'self' data:; font-src 'none';
                         script-src 'none'; connect-src 'none';
                         form-action 'self'; frame-ancestors 'none';
                         base-uri 'none'
```

`/out` tightens `form-action` to `'none'`.

---

## Adding a feed

Everything lives in `_shared/feeds.js`:

```js
export const FEEDS = [
  { name: "BBC News", url: "https://feeds.bbci.co.uk/news/rss.xml", category: "world" },
  // ...
];
```

- `name` shows as the source label.
- `url` must be RSS 2.0 or Atom.
- `category` becomes a filter pill and a `?cat=` value.

Categories are derived from the unique values in the list — no separate config. Use a new string to create a new category, remove all feeds using one to delete it.

---

## Why it's shaped this way

- **No framework.** Everything renders to a string. Fast responses, tiny attack surface, strict CSP.
- **Server-side everything.** Search, filtering, sorting all happen at the edge. The client gets finished HTML.
- **Escape at the boundary.** Feed text passes through `escapeHtml` before it reaches a template. User query strings are escaped in both the `<title>` and the body.
- **CDATA-aware parsing.** The parser strips comments and unwraps CDATA before tag extraction, so feeds that embed markup inside CDATA don't break the block matcher.
- **Full Unicode entity decoding** via `String.fromCodePoint`, plus a table of common named entities. Unknown entities pass through unchanged.
- **`safeExternalUrl` is the only gate** between feed content and a redirect. It rejects everything but `http:`/`https:`, so a compromised feed can't smuggle a `javascript:` or `data:` link through.

---

## Known limitations

I'd rather list these than pretend they don't exist.

- Search is substring AND-match over currently fetched items. No stemming, no fuzzy, no index.
- The parser is regex-based, not a real XML parser. Handles common RSS 2.0 and Atom shapes; exotic feeds may not parse.
- Feeds are fetched on every uncached request. Fine behind Cloudflare's edge cache, but there's no persistent store — each edge location warms its own.
- No pagination. Home and search cap at 100 items.
- The feed list is hardcoded. Adding one means editing `_shared/feeds.js` and redeploying.
- No tests. The functions are small enough that I've been verifying them by hand, but that won't scale forever.
- Currently hosted on Cloudflare Pages Functions rather than my own server. That's the plan eventually, but for now it means I'm trusting someone else's infrastructure with your request metadata.

---

## Credits

Built by [jao.life](https://jao.life).

Headlines and snippets belong to their original publishers. This site hosts no full articles and links out to the source for every story.
