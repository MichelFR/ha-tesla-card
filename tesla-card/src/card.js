import { Lit, html } from "./lit.js";
import { VARIANTS, resolveVariantKey } from "./variants.js";
import { resolveColorHex, hexToLinearRgba } from "./colors.js";
import { buildCompositorUrl } from "./compositor.js";
import { loadModelViewer } from "./model-loader.js";
import { getCachedModelUrl } from "./model-cache.js";
import {
  TemplateController,
  valueOf,
  stateObjOfSource,
  templatesIn,
} from "./value.js";
import { DEFAULT_ITEMS, performAction, itemActive } from "./items.js";
import { cardStyles } from "./styles.js";

const CHARGING_STATES = ["charging", "on", "true", "active", "yes"];

export class TeslaCard extends Lit {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
      _mvReady: { state: true },
      _srcUrl: { state: true },
    };
  }

  setConfig(config) {
    if (!config) throw new Error("Invalid configuration");
    this._config = { ...config };
    this._resolvingFor = null;
  }

  static getConfigElement() {
    return document.createElement("tesla-card-editor");
  }

  static getStubConfig() {
    return { name: "My Tesla", variant: "model3_highland" };
  }

  getCardSize() {
    return 5;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._tpl) this._tpl.disconnect();
  }

  get tpl() {
    if (!this._tpl) this._tpl = new TemplateController(this);
    return this._tpl;
  }

  /* ---- value sources (entity OR template), with legacy fallbacks --- */

  get battery() {
    return this._config.battery ||
      (this._config.battery_level_entity
        ? { entity: this._config.battery_level_entity }
        : null);
  }
  get charging() {
    return this._config.charging ||
      (this._config.charging_entity ? { entity: this._config.charging_entity } : null);
  }
  get range() {
    return this._config.range ||
      (this._config.range_entity ? { entity: this._config.range_entity } : null);
  }
  get status() {
    return this._config.status ||
      (this._config.status_entity ? { entity: this._config.status_entity } : null);
  }

  get items() {
    return Array.isArray(this._config.items) ? this._config.items : DEFAULT_ITEMS;
  }

  /* ---- variant / colour ------------------------------------------- */

  get variant() {
    return VARIANTS[resolveVariantKey(this._config)];
  }
  get colorKey() {
    return this._config.color || null;
  }
  get colorHex() {
    return resolveColorHex(this._config.color);
  }

  /* ---- generic helpers -------------------------------------------- */

  openMoreInfo(entityId) {
    if (!entityId) return;
    this.dispatchEvent(
      new CustomEvent("hass-more-info", {
        bubbles: true,
        composed: true,
        detail: { entityId },
      })
    );
  }

  /* ---- derived display values ------------------------------------- */

  get batteryLevel() {
    const n = Number(valueOf(this.battery, this.hass, this.tpl));
    return Number.isFinite(n) ? Math.round(n) : null;
  }

  get isCharging() {
    const s = valueOf(this.charging, this.hass, this.tpl);
    if (s === undefined || s === null) return false;
    return CHARGING_STATES.includes(String(s).toLowerCase());
  }

  get statusText() {
    const src = this.status;
    const st = stateObjOfSource(src, this.hass);
    if (st && !(src && src.template) && this.hass.formatEntityState) {
      return this.hass.formatEntityState(st);
    }
    const v = valueOf(src, this.hass, this.tpl);
    if (v != null && v !== "") {
      return String(v)
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
    }
    if (this.isCharging) return "Charging";
    return "Asleep";
  }

  get rangeText() {
    const src = this.range;
    const v = valueOf(src, this.hass, this.tpl);
    if (v == null || v === "") return null;
    const st = stateObjOfSource(src, this.hass);
    const unit = st ? st.attributes.unit_of_measurement || "" : "";
    return `${v} ${unit}`.trim();
  }

  /** "3d" (rotatable model) or "2d" (image). Defaults to 3d. */
  get renderMode() {
    return this._config.mode === "2d" ? "2d" : "3d";
  }

  /** The .glb to render in 3D, or "" to fall back to the 2D compositor. */
  get glbUrl() {
    if (this.renderMode === "2d") return "";
    if (this._config.image || this._config.image_entity) return "";
    if ("model_url" in this._config) return this._config.model_url || "";
    return this.variant.glb || "";
  }

  get carImage() {
    if (this._config.image) return this._config.image;
    const st = this._config.image_entity && this.hass.states[this._config.image_entity];
    if (st && st.attributes.entity_picture) return st.attributes.entity_picture;
    return buildCompositorUrl(
      this.variant.compositor,
      this.colorKey,
      this._config.compositor_options
    );
  }

  get batteryIcon() {
    const lvl = this.batteryLevel;
    if (lvl === null) return "mdi:battery-unknown";
    const r = Math.round(lvl / 10) * 10;
    if (this.isCharging) {
      if (r >= 100) return "mdi:battery-charging-100";
      if (r <= 0) return "mdi:battery-charging-outline";
      return `mdi:battery-charging-${r}`;
    }
    if (r >= 100) return "mdi:battery";
    if (r <= 0) return "mdi:battery-outline";
    return `mdi:battery-${r}`;
  }

  /* ---- items ------------------------------------------------------ */

  _handleItem(item) {
    performAction(this, item.tap_action, item);
  }

  _itemValueText(item) {
    if (item.show_value === false || !item.value) return null;
    const src = item.value;
    const st = stateObjOfSource(src, this.hass);
    if (st && !(src && src.template) && this.hass.formatEntityState) {
      return this.hass.formatEntityState(st);
    }
    const v = valueOf(src, this.hass, this.tpl);
    return v == null || v === "" ? null : String(v);
  }

  /* ---- 3D / 2D vehicle view --------------------------------------- */

  willUpdate() {
    if (this.hass) {
      const tpls = templatesIn(
        this.battery,
        this.charging,
        this.range,
        this.status,
        ...this.items.map((i) => i && i.value)
      );
      this.tpl.sync(this.hass, tpls);
    }
  }

  updated() {
    const glb = this.glbUrl;
    if (glb) {
      if (!this._mvReady) {
        loadModelViewer(this._config.model_viewer_src).then(() => {
          this._mvReady = true;
        });
      }
      if (glb !== this._resolvingFor) {
        this._resolvingFor = glb;
        this._srcUrl = null;
        getCachedModelUrl(glb).then((url) => {
          this._srcUrl = url;
        });
      }
    }
    const mv = this.renderRoot && this.renderRoot.querySelector("model-viewer");
    if (mv && mv.model) this._applyPaint(mv);
  }

  _onMvLoad(e) {
    this._applyPaint(e.target);
  }

  _applyPaint(mv) {
    const hex = this.colorHex;
    if (!hex || !mv || !mv.model) return;
    const rgba = hexToLinearRgba(hex);
    if (!rgba) return;
    const names = this._config.paint_materials || this.variant.paintMaterials || [];
    const set = new Set(names);
    const heuristic = names.length === 0;
    try {
      mv.model.materials.forEach((m) => {
        const match =
          set.has(m.name) || (heuristic && /paint|carpaint|body|exterior/i.test(m.name));
        if (match && m.pbrMetallicRoughness) {
          m.pbrMetallicRoughness.setBaseColorFactor(rgba);
        }
      });
    } catch (err) {
      /* scene graph not ready */
    }
  }

  _onImageError(e) {
    e.target.style.visibility = "hidden";
  }

  _renderVehicle(name) {
    const glb = this.glbUrl;
    if (glb && this._mvReady && this._srcUrl) {
      return html`
        <model-viewer
          class="car-3d"
          src=${this._srcUrl}
          alt=${name}
          camera-controls
          touch-action="pan-y"
          interaction-prompt="none"
          @load=${this._onMvLoad}
          ?auto-rotate=${!!this._config.auto_rotate}
          auto-rotate-delay="0"
          rotation-per-second=${this._config.rotation_per_second || "20deg"}
          ?disable-zoom=${this._config.disable_zoom !== false}
          disable-pan
          disable-tap
          shadow-intensity="1"
          shadow-softness="1"
          exposure="1"
          camera-orbit=${this._config.camera_orbit || "-25deg 78deg 105%"}
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
    return html`<img src=${this.carImage} alt=${name} @error=${this._onImageError} />`;
  }

  /* ---- render ----------------------------------------------------- */

  render() {
    if (!this._config || !this.hass) return html``;

    const name = this._config.name || this.variant.label || "Tesla";
    const battery = this.batteryLevel;
    const range = this.rangeText;

    return html`
      <ha-card>
        <div class="card">
          <div class="header">
            <span class="name">${name}</span>
            <ha-icon icon="mdi:chevron-down" class="chevron"></ha-icon>
          </div>

          <div class="status">
            <div class="battery">
              <ha-icon
                icon=${this.batteryIcon}
                class="battery-icon ${this.isCharging ? "charging" : ""}"
              ></ha-icon>
              <span class="battery-pct">${battery !== null ? `${battery}%` : "—"}</span>
              ${range ? html`<span class="range">· ${range}</span>` : ""}
            </div>
            <div class="status-text">${this.statusText}</div>
          </div>

          <div class="car">${this._renderVehicle(name)}</div>

          <div class="actions">
            ${this.items.map((item) => {
              const valueText = this._itemValueText(item);
              return html`
                <button
                  class="action ${itemActive(item, this.hass, this.tpl) ? "active" : ""}"
                  @click=${() => this._handleItem(item)}
                  title=${item.name || ""}
                >
                  <ha-icon icon=${item.icon || "mdi:gesture-tap-button"}></ha-icon>
                  ${valueText ? html`<span class="action-value">${valueText}</span>` : ""}
                </button>
              `;
            })}
          </div>
        </div>
      </ha-card>
    `;
  }

  static get styles() {
    return cardStyles;
  }
}

customElements.define("tesla-card", TeslaCard);
