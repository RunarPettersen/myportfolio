/**
 * Attempts to copy a string to the user's clipboard.
 * Uses the Clipboard API when available (secure context), and falls back to a hidden textarea + execCommand.
 *
 * @param {string} text - The text to copy.
 * @returns {Promise<boolean>} Resolves to true if the copy succeeded, otherwise false.
 */
async function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "absolute";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();

  const ok = document.execCommand("copy");
  document.body.removeChild(ta);
  return ok;
}

/**
 * Wires up the "Copy share link" button (if present) to copy the current page URL to the clipboard.
 * Updates a status element (if present) with a short success/error message.
 *
 * Expected markup:
 * - Button: [data-copy-link]
 * - Status text element: [data-copy-status]
 *
 * @returns {void}
 */
function initCopyLink() {
  const btn = document.querySelector("[data-copy-link]");
  const status = document.querySelector("[data-copy-status]");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const url = window.location.href;

    try {
      const ok = await copyToClipboard(url);
      if (status) status.textContent = ok ? "Link copied." : "Could not copy link.";
    } catch {
      if (status) status.textContent = "Could not copy link.";
    }

    window.setTimeout(() => {
      if (status) status.textContent = "";
    }, 2000);
  });
}

initCopyLink();