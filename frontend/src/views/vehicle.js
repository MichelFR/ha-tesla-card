/* Vehicle render — rotatable 3D <model-viewer> (cached blob URL) or the 2D
 * compositor / image fallback. */

import { html } from "lit";

export function renderVehicle(card, name) {
  const glb = card.glbUrl;
  if (glb && card._mvReady && card._srcUrl) {
    return html`
      <model-viewer
        class="car-3d"
        src=${card._srcUrl}
        alt=${name}
        camera-controls
        touch-action="pan-y"
        interaction-prompt="none"
        @load=${(e) => card._onMvLoad(e)}
        ?auto-rotate=${!!card._config.auto_rotate}
        auto-rotate-delay="0"
        rotation-per-second=${card._config.rotation_per_second || "20deg"}
        ?disable-zoom=${card._config.disable_zoom !== false}
        disable-pan
        disable-tap
        shadow-intensity="1"
        shadow-softness="1"
        exposure="1"
        camera-orbit=${card._config.camera_orbit || "-25deg 78deg 105%"}
        field-of-view="30deg"
        min-field-of-view="20deg"
        max-field-of-view="40deg"
      ></model-viewer>
    `;
  }
  if (glb) {
    return html`<div class="car-loading">
      <ha-circular-progress active></ha-circular-progress>
    </div>`;
  }
  return html`<img src=${card.carImage} alt=${name} @error=${(e) => card._onImageError(e)} />`;
}
