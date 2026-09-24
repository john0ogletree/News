import { renderPage } from "./_shared/layout.js";

export async function onRequest() {
  const body = `
    <div class="out-card">
      <h2 class="out-host" style="font-size:var(--step-2);">Our privacy promise</h2>
      <p class="out-note" style="margin-top:0.5rem;">
        news.jao.life is built to be the least invasive way to read the news.
        Here is exactly what we do and don't do:
      </p>

      <h3 style="color:var(--accent);margin:1.25rem 0 0.4rem;">What we don't do</h3>
      <ul style="color:var(--muted);line-height:1.7;">
        <li>No cookies. None. Not even a session cookie.</li>
        <li>No analytics, no pixels, no beacons, no fingerprinting.</li>
        <li>No third-party requests from the page — no CDNs, no fonts, no ads, no trackers.</li>
        <li>No third-party scripts, no analytics, no trackers. One first-party
            support widget (<code>support.jao.life</code>) loads via
            <code>&lt;script defer&gt;</code> to show ways you can support the site.
            It runs no analytics and sets no cookies.</li>
        <li>No server-side logging of which stories you open or which categories you browse.</li>
        <li>No account, no email, no login.</li>
      </ul>

      <h3 style="color:var(--accent);margin:1.25rem 0 0.4rem;">What we do</h3>
      <ul style="color:var(--muted);line-height:1.7;">
        <li>Fetch RSS feeds server-side, with a generic User-Agent, and cache them at the edge for 5 minutes.</li>
        <li>Strip your <code>Referer</code> header on every outbound click
            (<code>Referrer-Policy: no-referrer</code>).</li>
        <li>Route every story link through <a href="/out" style="color:var(--link);">/out</a>
            so you can see the destination before you go, and so the publisher never learns you came from here.</li>
        <li>Serve the same cached HTML to everyone — meaning your request is often served entirely
            from Cloudflare's edge without ever touching an origin server.</li>
      </ul>

      <h3 style="color:var(--accent);margin:1.25rem 0 0.4rem;">What we technically must process</h3>
      <ul style="color:var(--muted);line-height:1.7;">
        <li>Your IP address reaches Cloudflare (our host) to deliver the page, as it does for any website.
            We don't store it and don't correlate it with what you read.</li>
        <li>Standard Cloudflare edge logs may exist briefly for abuse prevention, under
            <a href="https://www.cloudflare.com/privacypolicy/" rel="noreferrer noopener" style="color:var(--link);">Cloudflare's privacy policy</a>.</li>
      </ul>

      <p class="out-note" style="margin-top:1.25rem;">
        That's the whole story. If you have questions, the source lives on
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
