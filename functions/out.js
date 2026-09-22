import { renderPage } from "./_shared/layout.js";
import { safeExternalUrl, escapeHtml } from "./_shared/utils.js";

/**
 * /out?u=<encoded url>
 *
 * Privacy exit page. We:
 *   - show the destination host + full URL for inspection
 *   - require an explicit user click to continue
 *   - send no Referer from the destination link itself
 *   - never log, store, or transmit the target URL anywhere except in the HTML
 */
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const raw = url.searchParams.get("u");
  const dest = safeExternalUrl(raw);

  if (!dest) {
    const html = renderPage({
      title: "Invalid link — news.jao.life",
      body: `
        <div class="out-card">
          <p class="out-host">That link couldn't be opened.</p>
          <p class="out-note">It may be malformed or use an unsupported protocol. Only <code>http:</code> and <code>https:</code> links are allowed.</p>
          <div class="out-actions">
            <a class="btn primary" href="/" rel="noreferrer">← Back to headlines</a>
          </div>
        </div>`,
      categories: { list: [], active: null },
    });
    return htmlResponse(html, 400);
  }

  const u = new URL(dest);
  const host = u.host;
  const body = `
    <div class="out-card">
      <p class="out-host">${escapeHtml(host)}</p>
      <p class="out-url">${escapeHtml(dest)}</p>
      <div class="out-actions">
        <a class="btn primary" href="${escapeHtml(dest)}" rel="noreferrer noopener" referrerpolicy="no-referrer">
          Continue to ${escapeHtml(host)} →
        </a>
        <a class="btn" href="/" rel="noreferrer">← Back</a>
      </div>
      <p class="out-note">
        You're about to leave <strong>news.jao.life</strong> and open the publisher's site directly.
        We send <strong>no referrer</strong> and no identifying information — the publisher will not
        know you came from here. Their site has its own privacy policy, which we don't control.
      </p>
    </div>
  `;

  return htmlResponse(renderPage({
    title: `Leaving to ${host} — news.jao.life`,
    body,
    categories: { list: [], active: null },
  }), 200);
}

function htmlResponse(html, status) {
  return new Response(html, {
    status,
    headers: {
      "Content-Type": "text/html;charset=UTF-8",
      "Cache-Control": "no-store",
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
        "script-src 'none'",
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
