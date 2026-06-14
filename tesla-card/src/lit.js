/**
 * Resolves the Lit library bundled with the Home Assistant frontend so the
 * card needs no build step and ships no copy of Lit.
 */

const LitElement =
  customElements.get("ha-panel-lovelace") ||
  customElements.get("hui-view") ||
  customElements.get("home-assistant-main");

export const Lit = Object.getPrototypeOf(LitElement);
export const html = Lit.prototype.html;
export const css = Lit.prototype.css;
