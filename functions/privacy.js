import { renderPage } from "./_shared/layout.js";

export async function onRequest() {
  const body = `
    <div class="out-card">
      <h2 class="out-host" style="font-size:var(--step-2);">My privacy promise</h2>
      <p class="out-note" style="margin-top:0.5rem;">
        I built news.jao.life to be the least invasive way to read the news.
        Here is exactly what I do, what I don't do, and what loads when you open a page.
      </p>

      <h3 style="color:var(--accent);margin:1.25rem 0 0.4rem;">Every request a page makes</h3>
      <p class="out-note" style="margin-top:0;">
        When you open any page on this site, your browser makes exactly these requests:
      </p>
      <ul style="color:var(--muted);line-height:1.7;">
        <li><strong>news.jao.life</strong> — the HTML page itself. I inline fonts and styles,
            so there are no font or stylesheet requests.</li>
        <li><strong>support.jao.life/support.js</strong> — a small script I wrote myself that renders
            the ways you can support the project. It sets no cookies, runs no analytics,
            and makes no network requests of its own.</li>
      </ul>
      <p class="out-note" style="margin-top:0.5rem;">
        That's the complete list. No CDNs, no font services, no ad networks,
        no social widgets, no analytics endpoints, no error-reporting services.
      </p>

      <h3 style="color:var(--accent);margin:1.25rem 0 0.4rem;">What I don't do</h3>
      <ul style="color:var(--muted);line-height:1.7;">
        <li>I set no cookies. None. Not even a session cookie.</li>
        <li>I run no analytics, no pixels, no beacons, no fingerprinting, no session recording.</li>
        <li>I make no third-party requests. Everything the page loads is served from a jao.life subdomain.</li>
        <li>I load no third-party scripts or trackers of any kind. The only script is my own support widget.</li>
        <li>I do no server-side logging of which stories you open or which categories you browse.</li>
        <li>I ask for no account, no email, no login, no newsletter.</li>
        <li>I sell, share, and transmit nothing to anyone — there is no data to share.</li>
      </ul>

      <h3 style="color:var(--accent);margin:1.25rem 0 0.4rem;">What I do</h3>
      <ul style="color:var(--muted);line-height:1.7;">
        <li>I fetch RSS feeds server-side with a generic User-Agent, and cache them at the edge for 5 minutes.
            The publisher sees my server, never your browser.</li>
        <li>I strip your <code>Referer</code> header on every outbound click
            (<code>Referrer-Policy: no-referrer</code>).</li>
        <li>I route every story link through <a href="/out" style="color:var(--link);">/out</a>
            so you can inspect the destination before you go, and so the publisher never learns you came from here.</li>
        <li>I serve the same cached HTML to everyone — meaning your request is often served entirely
            from Cloudflare's edge without ever touching an origin server.</li>
        <li>I enforce a strict Content-Security-Policy that blocks everything except the two
            requests listed above.</li>
      </ul>

      <h3 style="color:var(--accent);margin:1.25rem 0 0.4rem;">What I technically must process</h3>
      <ul style="color:var(--muted);line-height:1.7;">
        <li>Your IP address reaches Cloudflare (my host) to deliver the page, as it does for any website.
            I don't store it and don't correlate it with what you read.</li>
        <li>Standard Cloudflare edge logs may exist briefly for abuse prevention, under
            <a href="https://www.cloudflare.com/privacypolicy/" rel="noreferrer noopener" style="color:var(--link);">Cloudflare's privacy policy</a>.</li>
      </ul>

      <h3 style="color:var(--accent);margin:1.25rem 0 0.4rem;">Changes to this promise</h3>
      <ul style="color:var(--muted);line-height:1.7;">
        <li>If this ever changes — a new script, a new request, a new data flow — I'll say so
            on this page in plain language before it ships. I mean to keep the list above
            literally accurate, not aspirational.</li>
      </ul>

      <p class="out-note" style="margin-top:1.25rem;">
        That's the whole story. If you have questions, find me at
        <a href="https://jao.life" rel="noreferrer noopener" style="color:var(--link);">jao.life</a>.
      </p>

      <div class="out-actions" style="margin-top:1.25rem;">
        <a class="btn primary" href="/" rel="noreferrer">← Back to headlines</a>
      </div>
    </div>
  `;

  const html = renderPage({
    title: "Privacy — news.jao.life",
    body,
    categories: { list: [], active: null },
  });

  return new Response(html, {
    headers: {
      "Content-Type": "text/html;charset=UTF-8",
      "Cache-Control": "public, max-age=3600",
      "Referrer-Policy": "no-referrer",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Resource-Policy": "same-origin",
      "Content-Security-Policy": [
        "default-src 'none'",
        "style-src 'unsafe-inline'",
        "img-src 'self' data:",
        "font-src 'none'",
        "script-src https://support.jao.life",
        "connect-src 'none'",
        "form-action 'none'",
        "frame-ancestors 'none'",
        "base-uri 'none'",
      ].join("; "),
      "Permissions-Policy":
        "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()",
    },
  });
}
