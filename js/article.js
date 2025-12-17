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