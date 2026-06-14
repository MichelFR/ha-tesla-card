/* Nudge the frontend into defining the lazy-loaded elements the editor uses
 * (ha-form, ha-selector, ha-switch, mwc-list…). Pulling in a more-info control
 * loads the whole component stack. The editor degrades gracefully if missing. */

let loaded = false;

export async function ensureHaComponents() {
  if (loaded) return;
  loaded = true;
  try {
    const helpers = await window.loadCardHelpers?.();
    await helpers?.importMoreInfoControl?.("light");
  } catch (e) {
    /* ignore */
  }
}
