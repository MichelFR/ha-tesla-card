/**
 * Tesla configurator compositor — the 2D fallback used when no .glb model is
 * available. Only exposes a single STUD_3QTR angle (not rotatable).
 *
 * Option codes are kept minimal (paint + wheel); extra/stale codes make the
 * compositor return HTTP 412.
 */

import { COLORS } from "./colors.js";

export const COMPOSITOR_WHEEL = {
  m3: "$W38B",
  my: "$WY19B",
  ms: "$WS90",
  mx: "$WX00",
};

export function buildCompositorUrl(compositorModel, colorKey, optionsOverride) {
  const wheel = COMPOSITOR_WHEEL[compositorModel] || "$W38B";
  const paint = (COLORS[colorKey] && COLORS[colorKey].code) || "$PPSW";
  const params = new URLSearchParams({
    context: "design_studio_2",
    options: optionsOverride || `${paint},${wheel}`,
    view: "STUD_3QTR",
    model: compositorModel,
    size: "1400",
    bkba_opt: "1",
    crop: "0,0,0,0",
  });
  return `https://static-assets.tesla.com/configurator/compositor?${params.toString()}`;
}
