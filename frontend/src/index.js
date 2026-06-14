/* Tesla Card — Home Assistant Lovelace card.
 *
 * A card styled after the Tesla mobile app: name, battery state with charging
 * animation + progress bar, a rotatable 3D vehicle (model-viewer + bundled glb
 * models per facelift variant, IndexedDB-cached), and a fully-configurable
 * action bar. Every value field is an entity or a live template.
 *
 * Built on Home Assistant's own frontend elements; Lit is bundled at build
 * time (esbuild) so the module is self-contained. The 3D models and the
 * model-viewer bundle are loaded as separate hosted assets next to this file.
 */

import { CARD_TYPE, CARD_VERSION } from "./const.js";
import { TeslaCard } from "./card.js";
import { TeslaCardEditor } from "./editor.js";

customElements.define(CARD_TYPE, TeslaCard);
customElements.define(`${CARD_TYPE}-editor`, TeslaCardEditor);

console.info(
  `%c TESLA-CARD %c v${CARD_VERSION} `,
  "color: white; background: #171a20; font-weight: 700;",
  "color: #171a20; background: #e0e0e0; font-weight: 700;"
);

window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_TYPE,
  name: "Tesla Card",
  description: "A Tesla-app-style card with a rotatable 3D vehicle and quick actions.",
  preview: true,
  documentationURL: "https://github.com/MichelFR/ha-tesla-card",
});
