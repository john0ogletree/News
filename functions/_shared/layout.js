import { escapeHtml } from "./utils.js";

export function renderPage({ title, body, categories, query = "" }) {
  const safeTitle = escapeHtml(title);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <meta name="theme-color" content="#0f172a">
  <meta name="description" content="A privacy-first, snippet-only RSS reader. Headlines link out to original publishers. No tracking, no cookies, no analytics.">
  <meta name="referrer" content="no-referrer">
  <meta name="robots" content="index, follow">
  <meta name="color-scheme" content="dark">
  <title>${safeTitle}</title>
  <style>${styles()}</style>
  <script src="https://support.jao.life/support.js"
          crossorigin="anonymous"
          defer></script>
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>

  <div class="wrap">
    <header>
      <h1><a href="/" rel="noreferrer">news<span>.jao.life</span></a></h1>
      <p class="subtitle">A calm feed of what's actually happening — without the tracking.</p>

      <form class="search" method="get" action="/search" role="search" autocomplete="off">
        ${categories.active ? `<input type="hidden" name="cat" value="${escapeAttr(categories.active)}">` : ""}
        <input
          class="search-input"
          type="search"
          name="q"
          value="${escapeAttr(query)}"
          placeholder="Search headlines…"
          aria-label="Search headlines"
          enterkeyhint="search"
          autocapitalize="off"
          autocorrect="off"
          spellcheck="false"
          maxlength="120">
        <button class="search-btn" type="submit" aria-label="Search">Search</button>
      </form>

      <div class="notice">
        <strong>Privacy-first by design.</strong>
        This site shows <em>headlines and short snippets only</em>. Every story opens a
        preview page first, then links out to the original publisher with
        <em>no referrer</em>. No cookies. No analytics. The only script on the page is
        our own first-party support widget (<em>support.jao.life</em>), which sets no
        cookies and does no tracking.
        <a href="/privacy" rel="noreferrer">Read the full promise →</a>
      </div>

      <nav class="filters" aria-label="Categories">
        <a class="pill ${!categories.active ? "active" : ""}" href="/" rel="noreferrer">all</a>
        ${categories.list.map(c => `
          <a class="pill ${categories.active === c ? "active" : ""}" href="/?cat=${encodeURIComponent(c)}" rel="noreferrer">${escapeHtml(c)}</a>
        `).join("")}
      </nav>
    </header>

    <main id="main">
      ${body}
    </main>

    <footer>
      <div class="footer-brand">
        This subdomain is a product of <a href="https://jao.life" rel="noreferrer noopener">jao.life</a> — a privacy-first ecosystem made by an indie developer.
      </div>
      <div class="footer-meta">
        Snippet aggregator · Headlines link to original publishers · No full articles hosted here · No tracking · No cookies · No analytics · One first-party support script, no trackers
      </div>
    </footer>
  </div>
</body>
</html>`;
}

function escapeAttr(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function styles() {
  return `
    :root {
      --bg: #0f172a;
      --card: #1e293b;
      --card-hover: #263449;
      --border: #334155;
      --text: #e2e8f0;
      --muted: #94a3b8;
      --accent: #fcd34d;
      --accent-strong: #f59e0b;
      --link: #93c5fd;
      --notice-bg: rgba(245,158,11,0.06);
      --notice-border: rgba(245,158,11,0.25);

      --step--1: clamp(0.72rem, 0.70rem + 0.10vw, 0.78rem);
      --step-0:  clamp(0.88rem, 0.85rem + 0.15vw, 0.95rem);
      --step-1:  clamp(1.00rem, 0.96rem + 0.20vw, 1.10rem);
      --step-2:  clamp(1.25rem, 1.15rem + 0.50vw, 1.60rem);
      --step-3:  clamp(1.55rem, 1.35rem + 1.00vw, 2.10rem);

      --gutter:   clamp(0.9rem, 4vw, 1.5rem);
      --radius:   12px;
      --radius-sm: 8px;
      --tap:      44px;
    }

    * { box-sizing: border-box; }
    html { -webkit-text-size-adjust: 100%; }
    body {
      margin: 0;
      padding:
        calc(var(--gutter) + env(safe-area-inset-top))
        var(--gutter)
        calc(var(--gutter) + 4rem + env(safe-area-inset-bottom));
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      font-size: var(--step-0);
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      min-height: 100vh;
      overflow-wrap: anywhere;
      word-break: break-word;
    }
    .wrap { max-width: 720px; margin: 0 auto; }

    .skip {
      position: absolute;
      left: -9999px;
      top: 0;
      background: var(--accent-strong);
      color: #1a1a1a;
      padding: 0.6rem 1rem;
      border-radius: 0 0 var(--radius-sm) 0;
      font-weight: 600;
      z-index: 100;
    }
    .skip:focus { left: 0; }

    a:focus-visible,
    .pill:focus-visible,
    .btn:focus-visible,
    .search-input:focus-visible,
    .search-btn:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
      border-radius: var(--radius-sm);
    }

    header {
      margin-bottom: clamp(1.25rem, 4vw, 2rem);
      padding-bottom: clamp(1rem, 3vw, 1.5rem);
      border-bottom: 1px solid var(--border);
    }
    h1 {
      margin: 0 0 0.4rem;
      font-size: var(--step-3);
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.15;
    }
    h1 a { text-decoration: none; color: var(--text); }
    h1 a span {
      background: linear-gradient(135deg, #fcd34d, #f59e0b);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .subtitle {
      color: var(--muted);
      font-size: var(--step-0);
      margin: 0 0 1rem;
    }

    /* Search */
    .search {
      display: flex;
      gap: 0.5rem;
      margin: 0 0 1rem;
    }
    .search-input {
      flex: 1 1 auto;
      min-width: 0;
      min-height: var(--tap);
      padding: 0.55rem 0.85rem;
      font: inherit;
      font-size: var(--step-0);
      color: var(--text);
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      transition: border-color 0.15s ease;
      -webkit-appearance: none;
      appearance: none;
    }
    .search-input::placeholder { color: var(--muted); opacity: 0.85; }
    .search-input:hover { border-color: var(--accent-strong); }
    .search-input:focus { border-color: var(--accent-strong); }
    .search-input::-webkit-search-cancel-button {
      -webkit-appearance: none;
      appearance: none;
    }
    .search-btn {
      flex: 0 0 auto;
      min-height: var(--tap);
      padding: 0.55rem 1rem;
      font: inherit;
      font-size: var(--step-0);
      font-weight: 500;
      color: #1a1a1a;
      background: var(--accent-strong);
      border: 1px solid var(--accent-strong);
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: filter 0.15s ease;
      -webkit-tap-highlight-color: transparent;
    }
    .search-btn:hover { filter: brightness(1.05); }
    @media (max-width: 420px) {
      .search { flex-wrap: wrap; }
      .search-input { flex-basis: 100%; }
      .search-btn { flex-basis: 100%; }
    }

    .notice {
      background: var(--notice-bg);
      border: 1px solid var(--notice-border);
      border-left: 3px solid var(--accent-strong);
      border-radius: var(--radius);
      padding: clamp(0.7rem, 2.5vw, 0.9rem) clamp(0.8rem, 3vw, 1rem);
      font-size: var(--step--1);
      color: var(--muted);
      line-height: 1.55;
      margin: 0 0 clamp(0.9rem, 3vw, 1.25rem);
    }
    .notice strong { color: var(--accent); }
    .notice em { color: var(--text); font-style: normal; font-weight: 500; }
    .notice a { color: var(--link); text-decoration: none; white-space: nowrap; }
    .notice a:hover { text-decoration: underline; }

    .filters {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin: 0;
      padding: 0;
    }
    .pill {
      display: inline-flex;
      align-items: center;
      min-height: 34px;
      padding: 6px 14px;
      background: transparent;
      border: 1px solid var(--border);
      color: var(--muted);
      border-radius: 999px;
      font-size: var(--step--1);
      text-decoration: none;
      white-space: nowrap;
      transition: all 0.15s ease;
      -webkit-tap-highlight-color: transparent;
    }
    .pill:hover { border-color: var(--accent-strong); color: var(--accent); }
    .pill.active {
      background: var(--accent-strong);
      border-color: var(--accent-strong);
      color: #1a1a1a;
      font-weight: 600;
    }
    @media (max-width: 480px) {
      .filters {
        flex-wrap: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        margin: 0 calc(var(--gutter) * -1);
        padding: 0 var(--gutter) 4px;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
      }
      .filters::-webkit-scrollbar { display: none; }
    }

    .story {
      display: block;
      padding: clamp(0.85rem, 3vw, 1.1rem) clamp(0.9rem, 3.5vw, 1.15rem);
      margin-bottom: 0.6rem;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      text-decoration: none;
      color: var(--text);
      transition: background 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
      -webkit-tap-highlight-color: transparent;
    }
    @media (hover: hover) and (pointer: fine) {
      .story:hover {
        background: var(--card-hover);
        border-color: var(--accent-strong);
        transform: translateX(3px);
      }
    }
    @media (hover: none) {
      .story:active {
        background: var(--card-hover);
        border-color: var(--accent-strong);
      }
    }
    .story-title {
      font-size: var(--step-1);
      font-weight: 500;
      margin: 0 0 0.35rem;
      color: var(--text);
      line-height: 1.35;
    }
    .story-desc {
      font-size: var(--step-0);
      color: var(--muted);
      margin: 0 0 0.6rem;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .story-meta {
      display: flex;
      gap: 0.6rem 0.85rem;
      font-size: var(--step--1);
      color: var(--muted);
      align-items: center;
      flex-wrap: wrap;
    }
    .source { color: var(--accent); font-weight: 500; }
    .read-full {
      margin-left: auto;
      color: var(--link);
      font-weight: 500;
      white-space: nowrap;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    @media (max-width: 420px) {
      .read-full { margin-left: 0; flex-basis: 100%; }
    }

    .empty {
      color: var(--muted);
      font-style: italic;
      text-align: center;
      padding: clamp(2rem, 10vw, 3rem) 0;
      font-size: var(--step-0);
    }

    /* Search results header */
    .results-head {
      font-size: var(--step-0);
      color: var(--muted);
      margin: 0 0 1rem;
    }
    .results-head strong { color: var(--text); font-weight: 600; }
    .results-head .clear {
      color: var(--link);
      text-decoration: none;
      margin-left: 0.5rem;
    }
    .results-head .clear:hover { text-decoration: underline; }

    .out-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: clamp(1rem, 4vw, 1.5rem);
      margin-top: 1rem;
    }
    .out-host {
      font-size: var(--step-2);
      font-weight: 600;
      color: var(--accent);
      margin: 0 0 0.5rem;
      line-height: 1.25;
      word-break: break-word;
    }
    .out-url {
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: var(--step--1);
      color: var(--muted);
      word-break: break-all;
      background: #0b1220;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 0.6rem 0.75rem;
      margin: 0 0 1rem;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
    .out-actions { display: flex; gap: 0.6rem; flex-wrap: wrap; }
    .out-actions .btn { flex: 1 1 auto; justify-content: center; }
    @media (max-width: 420px) {
      .out-actions .btn { flex-basis: 100%; }
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: var(--tap);
      padding: 0.55rem 1rem;
      border-radius: var(--radius-sm);
      font-size: var(--step-0);
      font-weight: 500;
      text-decoration: none;
      border: 1px solid var(--border);
      color: var(--text);
      background: transparent;
      cursor: pointer;
      transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
      -webkit-tap-highlight-color: transparent;
      text-align: center;
    }
    .btn:hover { border-color: var(--accent-strong); color: var(--accent); }
    .btn.primary {
      background: var(--accent-strong);
      border-color: var(--accent-strong);
      color: #1a1a1a;
    }
    .btn.primary:hover { color: #1a1a1a; filter: brightness(1.05); }
    .out-note {
      font-size: var(--step--1);
      color: var(--muted);
      margin-top: 1rem;
      line-height: 1.6;
    }

    .out-card h3 { font-size: var(--step-1); }
    .out-card ul { padding-left: 1.2rem; margin: 0; }
    .out-card li { margin-bottom: 0.3rem; }

    footer {
      margin-top: clamp(2rem, 8vw, 3rem);
      padding-top: clamp(1rem, 3vw, 1.5rem);
      border-top: 1px solid var(--border);
      text-align: center;
      color: var(--muted);
      font-size: var(--step--1);
      line-height: 1.6;
    }
    footer a { color: var(--link); text-decoration: none; }
    footer a:hover { text-decoration: underline; }
    .footer-brand {
      margin-bottom: 0.5rem;
      font-size: var(--step--1);
      color: var(--text);
    }
    .footer-brand a { color: var(--accent); }
    .footer-meta { font-size: var(--step--1); }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        transition: none !important;
        animation: none !important;
      }
    }
  `;
}
