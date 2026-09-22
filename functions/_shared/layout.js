export function renderPage({ title, body, categories }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>${styles()}</style>
</head>
<body>
  <div class="wrap">
    <header>
      <h1><a href="/">news<span>.jao.life</span></a></h1>
      <p class="subtitle">A calm feed of what's actually happening.</p>
      <nav class="filters">
        <a class="pill ${!categories.active ? "active" : ""}" href="/">all</a>
        ${categories.list.map(c => `
          <a class="pill ${categories.active === c ? "active" : ""}" href="/?cat=${c}">${c}</a>
        `).join("")}
      </nav>
    </header>

    <main>
      ${body}
    </main>

    <footer>
      <div class="footer-brand">
        This subdomain is a product of <a href="https://jao.life">jao.life</a> — a privacy-first ecosystem made by an indie developer.
      </div>
      <div class="footer-meta">
        Headlines link to the original publishers · No tracking · No cookies
      </div>
    </footer>
  </div>
</body>
</html>`;
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
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 2.5rem 1.5rem 6rem;
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      min-height: 100vh;
    }
    .wrap { max-width: 720px; margin: 0 auto; }

    header {
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--border);
    }
    h1 {
      margin: 0 0 0.4rem;
      font-size: 1.75rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    h1 a {
      text-decoration: none;
      color: var(--text);
    }
    h1 a span {
      background: linear-gradient(135deg, #fcd34d, #f59e0b);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .subtitle {
      color: var(--muted);
      font-size: 0.9rem;
      margin: 0 0 1.25rem;
    }
    .filters {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
    }
    .pill {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--muted);
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 0.75rem;
      text-decoration: none;
      transition: all 0.15s ease;
    }
    .pill:hover { border-color: var(--accent-strong); color: var(--accent); }
    .pill.active {
      background: var(--accent-strong);
      border-color: var(--accent-strong);
      color: #1a1a1a;
      font-weight: 600;
    }

    .story {
      display: block;
      padding: 1rem 1.1rem;
      margin-bottom: 0.6rem;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 10px;
      text-decoration: none;
      color: var(--text);
      transition: all 0.15s ease;
    }
    .story:hover {
      background: var(--card-hover);
      border-color: var(--accent-strong);
      transform: translateX(3px);
    }
    .story-title {
      font-size: 1rem;
      font-weight: 500;
      margin: 0 0 0.35rem;
      color: var(--text);
      line-height: 1.4;
    }
    .story-desc {
      font-size: 0.85rem;
      color: var(--muted);
      margin: 0 0 0.5rem;
      line-height: 1.5;
    }
    .story-meta {
      display: flex;
      gap: 0.75rem;
      font-size: 0.72rem;
      color: var(--muted);
      align-items: center;
    }
    .source {
      color: var(--accent);
      font-weight: 500;
    }
    .empty {
      color: var(--muted);
      font-style: italic;
      text-align: center;
      padding: 3rem 0;
    }

    footer {
      margin-top: 3rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border);
      text-align: center;
      color: var(--muted);
      font-size: 0.8rem;
    }
    footer a { color: var(--link); text-decoration: none; }
    footer a:hover { text-decoration: underline; }
    .footer-brand {
      margin-bottom: 0.5rem;
      font-size: 0.82rem;
      color: var(--text);
    }
    .footer-brand a { color: var(--accent); }
    .footer-meta {
      font-size: 0.75rem;
      color: var(--muted);
    }
  `;
}
