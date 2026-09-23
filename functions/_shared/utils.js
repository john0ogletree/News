export function timeAgo(iso) {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  if (isNaN(then)) return "";

  const diff = Date.now() - then;
  const min = Math.floor(diff / 60000);
  const hr = Math.floor(diff / 3600000);
  const day = Math.floor(diff / 86400000);

  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  if (hr < 24) return `${hr}h ago`;
  if (day < 7) return `${day}d ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Like escapeHtml but also safe for use inside HTML attribute values.
 * (escapeHtml already covers quotes, so this is an alias kept for clarity.)
 */
export function escapeAttr(str) {
  return escapeHtml(str);
}

/**
 * Only allow http(s) URLs we can safely hand to /out.
 * Rejects javascript:, data:, file:, vbscript:, etc.
 * Returns a normalized string or null.
 */
export function safeExternalUrl(raw) {
  if (!raw || typeof raw !== "string") return null;
  try {
    const u = new URL(raw.trim());
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    return u.toString();
  } catch {
    return null;
  }
}
