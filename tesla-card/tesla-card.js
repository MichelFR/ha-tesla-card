/**
 * Tesla Card — a custom Home Assistant Lovelace card that mimics the Tesla
 * mobile app: vehicle name, battery, status line, a rotatable 3D vehicle and an
 * action bar.
 *
 * This is the entry module. The implementation is split into ./src/*:
 *   lit.js          — Lit base reused from the HA frontend
 *   variants.js     — vehicles / facelifts + bundled 3D models
 *   colors.js       — paint colours (3D recolour + 2D codes)
 *   compositor.js   — Tesla 2D configurator fallback
 *   model-loader.js — lazy <model-viewer> loader
 *   model-cache.js  — IndexedDB cache for the .glb models
 *   value.js        — entity/template value resolution + live templates
 *   items.js        — configurable action-bar items + tap actions
 *   styles.js       — card styling
 *   card.js         — the <tesla-card> element
 *   editor.js       — the <tesla-card-editor> visual editor
 *
 * No build step required — it reuses the Lit library shipped with HA.
 */

import "./src/card.js";
import "./src/editor.js";

const CARD_VERSION = "3.0.0";

/* eslint-disable no-console */
console.info(
  `%c TESLA-CARD %c v${CARD_VERSION} `,
  "color: white; background: #171a20; font-weight: 700;",
  "color: #171a20; background: #e0e0e0; font-weight: 700;"
);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "tesla-card",
  name: "Tesla Card",
  description: "A Tesla-app-style card with a rotatable 3D vehicle and quick actions.",
  preview: true,
  documentationURL: "https://github.com/MichelFR/ha-tesla-card",
});
