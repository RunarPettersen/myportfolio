function setMode(mode) {
  document.body.classList.toggle("mode-sketch", mode === "sketch");
  document.body.classList.toggle("mode-final", mode === "final");

  const toggleBtn = document.querySelector("[data-mode-toggle]");
  if (toggleBtn) {
    toggleBtn.setAttribute("aria-pressed", String(mode === "final"));
  }
}

function initToggle() {
  const toggleBtn = document.querySelector("[data-mode-toggle]");
  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    const isFinal = document.body.classList.contains("mode-final");
    setMode(isFinal ? "sketch" : "final");
  });
}

function initYear() {
  const el = document.querySelector("[data-year]");
  if (el) el.textContent = String(new Date().getFullYear());
}

/* Always start in sketch mode (surprise effect stays every visit) */
setMode("sketch");
initToggle();
initYear();