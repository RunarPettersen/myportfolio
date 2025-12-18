/**
 * Applies the requested display mode by toggling body classes and syncing the toggle button state.
 *
 * Expects the body to use:
 * - .mode-sketch for sketch mode
 * - .mode-final for finished mode
 *
 * Also updates:
 * - [data-mode-toggle] aria-pressed (true when in "final" mode)
 *
 * @param {"sketch"|"final"} mode - The mode to set.
 * @returns {void}
 */
function setMode(mode) {
  document.body.classList.toggle("mode-sketch", mode === "sketch");
  document.body.classList.toggle("mode-final", mode === "final");

  const toggleBtn = document.querySelector("[data-mode-toggle]");
  if (toggleBtn) {
    toggleBtn.setAttribute("aria-pressed", String(mode === "final"));
  }
}

/**
 * Initialises the sketch/finished toggle button click handler.
 * Clicking toggles between "sketch" and "final" mode.
 *
 * Expects:
 * - a button element with [data-mode-toggle]
 *
 * @returns {void}
 */
function initToggle() {
  const toggleBtn = document.querySelector("[data-mode-toggle]");
  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    const isFinal = document.body.classList.contains("mode-final");
    setMode(isFinal ? "sketch" : "final");
  });
}

/**
 * Writes the current year into the first element matching [data-year].
 * Used for the footer copyright year.
 *
 * @returns {void}
 */
function initYear() {
  const el = document.querySelector("[data-year]");
  if (el) el.textContent = String(new Date().getFullYear());
}

/* Always start in sketch mode (surprise effect stays every visit) */
setMode("sketch");
initToggle();
initYear();