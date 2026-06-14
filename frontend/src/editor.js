/* Visual editor with subpages: the root shows a settings list (nav rows); each
 * row opens a subpage with a sticky header + back button. Value slots offer an
 * Entity / Template toggle. Mirrors the look of the ABRP vehicle card editor. */

import { LitElement, html, css } from "lit";
import { CARD_TYPE } from "./const.js";
import { VARIANTS } from "./variants.js";
import { COLORS } from "./colors.js";
import { DEFAULT_ITEMS } from "./items.js";
import { localize } from "./localize.js";
import { ensureHaComponents } from "./ha-components.js";

const PAGES = [
  { id: "vehicle", icon: "mdi:car" },
  { id: "model", icon: "mdi:rotate-3d" },
  { id: "battery", icon: "mdi:battery-charging" },
  { id: "status", icon: "mdi:information-outline" },
  { id: "items", icon: "mdi:gesture-tap-button" },
];

export class TeslaCardEditor extends LitElement {
  static get properties() {
    return {
      hass: {},
      _config: { state: true },
      _nav: { state: true },
    };
  }

  constructor() {
    super();
    this._nav = [];
  }

  connectedCallback() {
    super.connectedCallback();
    ensureHaComponents();
  }

  setConfig(config) {
    this._config = config || {};
  }

  _t(key, vars) {
    return localize(this.hass, key, vars);
  }

  /* ---- config plumbing -------------------------------------------- */

  _dispatch(config) {
    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config }, bubbles: true, composed: true })
    );
  }

  _update(partial) {
    this._dispatch({ ...this._config, ...partial, type: `custom:${CARD_TYPE}` });
  }

  _setToggle(key, def, checked) {
    const c = { ...this._config, type: `custom:${CARD_TYPE}` };
    if (checked === def) delete c[key];
    else c[key] = checked;
    this._dispatch(c);
  }

  _setSlot(key, obj) {
    const c = { ...this._config, type: `custom:${CARD_TYPE}` };
    if (obj && (obj.entity || obj.template || obj.value)) c[key] = obj;
    else delete c[key];
    this._dispatch(c);
  }

  /* ---- navigation -------------------------------------------------- */

  _push(page) {
    this._nav = [...this._nav, page];
  }
  _back() {
    this._nav = this._nav.slice(0, -1);
  }

  /* ---- shared field builders -------------------------------------- */

  _form(schema) {
    return html`<ha-form
      .hass=${this.hass}
      .data=${this._config}
      .schema=${schema}
      .computeLabel=${(s) => this._t(`field.${s.name}`)}
      @value-changed=${(e) =>
        this._dispatch({ ...e.detail.value, type: `custom:${CARD_TYPE}` })}
    ></ha-form>`;
  }

  _renderToggle(key, def, icon) {
    return html`<div class="row">
      <ha-icon icon=${icon}></ha-icon>
      <span class="row-label">${this._t(`toggle.${key}`)}</span>
      <ha-switch
        .checked=${this._config[key] ?? def}
        @change=${(e) => this._setToggle(key, def, e.target.checked)}
      ></ha-switch>
    </div>`;
  }

  _slotEditor(value, labelKey, icon, onChange) {
    const v = value || {};
    const mode = v.template != null ? "template" : "entity";
    return html`
      <div class="section"><ha-icon icon=${icon}></ha-icon>${this._t(`slot.${labelKey}`)}</div>
      <div class="modes">
        ${["entity", "template"].map(
          (id) => html`<button
            class="mode ${mode === id ? "on" : ""}"
            @click=${() =>
              onChange(id === "entity" ? { entity: v.entity || "" } : { template: v.template || "" })}
          >
            ${this._t(`editor.mode_${id}`)}
          </button>`
        )}
      </div>
      ${mode === "entity"
        ? html`
            <ha-form
              .hass=${this.hass}
              .data=${{ value: v.entity || "" }}
              .schema=${[{ name: "value", selector: { entity: {} } }]}
              .computeLabel=${() => this._t("editor.entity")}
              @value-changed=${(e) => {
                e.stopPropagation();
                onChange({ ...v, entity: e.detail.value.value || "" });
              }}
            ></ha-form>
            ${v.entity
              ? html`<ha-form
                  .hass=${this.hass}
                  .data=${{ value: v.attribute || "" }}
                  .schema=${[{ name: "value", selector: { attribute: { entity_id: v.entity } } }]}
                  .computeLabel=${() => this._t("editor.attribute")}
                  @value-changed=${(e) => {
                    e.stopPropagation();
                    onChange({ ...v, attribute: e.detail.value.value || "" });
                  }}
                ></ha-form>`
              : ""}
          `
        : html`<ha-form
            .hass=${this.hass}
            .data=${{ value: v.template || "" }}
            .schema=${[{ name: "value", selector: { template: {} } }]}
            .computeLabel=${() => this._t("editor.value_template")}
            @value-changed=${(e) => {
              e.stopPropagation();
              onChange({ ...v, template: e.detail.value.value || "" });
            }}
          ></ha-form>`}
    `;
  }

  /* ---- items ------------------------------------------------------- */

  get _items() {
    return Array.isArray(this._config.items) ? this._config.items : DEFAULT_ITEMS;
  }
  _updateItems(items) {
    this._update({ items });
  }
  _updateItem(i, partial) {
    const items = this._items.map((it, idx) => {
      if (idx !== i) return it;
      const next = { ...it, ...partial };
      Object.keys(next).forEach((k) => next[k] == null && delete next[k]);
      return next;
    });
    this._updateItems(items);
  }
  _addItem() {
    const items = [...this._items, { icon: "mdi:flash", tap_action: { action: "more-info" } }];
    this._updateItems(items);
    this._push({ id: "item", index: items.length - 1 });
  }
  _deleteItem(i) {
    this._updateItems(this._items.filter((_, idx) => idx !== i));
    this._back();
  }
  _moveItem(i, dir) {
    const items = [...this._items];
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    [items[i], items[j]] = [items[j], items[i]];
    this._updateItems(items);
    const top = this._nav[this._nav.length - 1];
    if (top && top.id === "item" && top.index === i) {
      const ns = [...this._nav];
      ns[ns.length - 1] = { ...top, index: j };
      this._nav = ns;
    }
  }

  /* ---- pages ------------------------------------------------------- */

  render() {
    if (!this.hass || !this._config) return html``;
    const page = this._nav[this._nav.length - 1];
    if (!page) return this._renderRoot();
    return html`
      <div class="subpage-head">
        <button class="back" @click=${this._back}>
          <ha-icon icon="mdi:chevron-left"></ha-icon>
        </button>
        <span class="subpage-title">${this._pageTitle(page)}</span>
      </div>
      ${this._renderPage(page)}
    `;
  }

  _pageTitle(page) {
    if (page.id === "item") return this._t("page.items");
    return this._t(`page.${page.id}`);
  }

  _renderRoot() {
    return html`<div class="nav">
      ${PAGES.map(
        (page) => html`<button class="nav-row" @click=${() => this._push({ id: page.id })}>
          <ha-icon class="nav-icon" icon=${page.icon}></ha-icon>
          <span class="nav-labels">
            <span class="nav-label">${this._t(`page.${page.id}`)}</span>
            <span class="nav-secondary">${this._summary(page.id)}</span>
          </span>
          <ha-icon icon="mdi:chevron-right"></ha-icon>
        </button>`
      )}
    </div>`;
  }

  _summary(id) {
    if (id === "vehicle") {
      const v = VARIANTS[this._config.variant] || VARIANTS.model3_highland;
      return `${v.label}${this._config.color ? ` · ${this._config.color}` : ""}`;
    }
    if (id === "model") return this._config.mode === "2d" ? "2D" : "3D";
    if (id === "battery") {
      const on = [];
      if (this._config.show_progress) on.push(this._t("toggle.show_progress"));
      if (this._config.show_battery_label) on.push(this._t("toggle.show_battery_label"));
      return on.join(", ") || this._t("editor.automatic");
    }
    if (id === "items") return `${this._items.length}`;
    return "";
  }

  _renderPage(page) {
    switch (page.id) {
      case "vehicle":
        return this._form([
          { name: "name", selector: { text: {} } },
          {
            name: "variant",
            selector: {
              select: {
                mode: "dropdown",
                options: Object.entries(VARIANTS).map(([value, v]) => ({
                  value,
                  label: `${v.label} (${v.years})`,
                })),
              },
            },
          },
          {
            name: "color",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "", label: "Original" },
                  ...Object.entries(COLORS).map(([value, c]) => ({ value, label: c.label })),
                ],
              },
            },
          },
          {
            name: "mode",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "3d", label: "3D" },
                  { value: "2d", label: "2D" },
                ],
              },
            },
          },
        ]);
      case "model":
        return this._form([
          { name: "model_url", selector: { text: {} } },
          { name: "auto_rotate", selector: { boolean: {} } },
          { name: "disable_zoom", selector: { boolean: {} } },
          { name: "camera_orbit", selector: { text: {} } },
          { name: "image", selector: { text: {} } },
          { name: "image_entity", selector: { entity: { domain: ["image", "camera"] } } },
        ]);
      case "battery":
        return html`
          ${this._slotEditor(this._config.battery, "battery", "mdi:battery-high", (v) =>
            this._setSlot("battery", v)
          )}
          ${this._renderToggle("show_battery_label", false, "mdi:label-outline")}
          ${this._config.show_battery_label
            ? this._slotEditor(this._config.battery_label, "battery_label", "mdi:label", (v) =>
                this._setSlot("battery_label", v)
              )
            : ""}
          ${this._renderToggle("show_progress", false, "mdi:gauge")}
          ${this._slotEditor(this._config.charging, "charging", "mdi:battery-charging", (v) =>
            this._setSlot("charging", v)
          )}
          ${this._slotEditor(this._config.charge_power, "charge_power", "mdi:flash", (v) =>
            this._setSlot("charge_power", v)
          )}
        `;
      case "status":
        return html`
          ${this._slotEditor(this._config.range, "range", "mdi:map-marker-distance", (v) =>
            this._setSlot("range", v)
          )}
          ${this._slotEditor(this._config.status, "status", "mdi:information-outline", (v) =>
            this._setSlot("status", v)
          )}
        `;
      case "items":
        return this._renderItemsList();
      case "item":
        return this._renderItem(page.index);
      default:
        return this._renderRoot();
    }
  }

  _renderItemsList() {
    return html`
      <div class="nav">
        ${this._items.map(
          (it, i) => html`<button
            class="nav-row"
            @click=${() => this._push({ id: "item", index: i })}
          >
            <ha-icon class="nav-icon" icon=${it.icon || "mdi:gesture-tap-button"}></ha-icon>
            <span class="nav-labels">
              <span class="nav-label">${it.name || it.icon || `Item ${i + 1}`}</span>
              <span class="nav-secondary"
                >${(it.tap_action && it.tap_action.action) || "more-info"}</span
              >
            </span>
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>`
        )}
      </div>
      <mwc-button raised @click=${this._addItem}>
        <ha-icon icon="mdi:plus"></ha-icon>&nbsp;${this._t("editor.add_item")}
      </mwc-button>
    `;
  }

  _renderItem(i) {
    const it = this._items[i];
    if (!it) return this._renderRoot();
    return html`
      <div class="itembar">
        <button class="back" .disabled=${i === 0} @click=${() => this._moveItem(i, -1)}>
          <ha-icon icon="mdi:arrow-up"></ha-icon>
        </button>
        <button
          class="back"
          .disabled=${i === this._items.length - 1}
          @click=${() => this._moveItem(i, 1)}
        >
          <ha-icon icon="mdi:arrow-down"></ha-icon>
        </button>
        <span class="itembar-label">${this._t("editor.item_n", { n: i + 1, total: this._items.length })}</span>
      </div>
      <ha-form
        .hass=${this.hass}
        .data=${it}
        .schema=${[
          { name: "icon", selector: { icon: {} } },
          { name: "name", selector: { text: {} } },
          { name: "show_value", selector: { boolean: {} } },
          { name: "tap_action", selector: { ui_action: {} } },
        ]}
        .computeLabel=${(s) =>
          this._t(
            { icon: "field.icon", name: "field.item_name", show_value: "toggle.show_value", tap_action: "tap_action" }[
              s.name
            ] || s.name
          )}
        @value-changed=${(e) => {
          e.stopPropagation();
          this._updateItem(i, e.detail.value);
        }}
      ></ha-form>
      ${this._slotEditor(it.value, "value", "mdi:eye-outline", (v) => this._updateItem(i, { value: v }))}
      <mwc-button class="danger" @click=${() => this._deleteItem(i)}>
        <ha-icon icon="mdi:delete"></ha-icon>&nbsp;${this._t("editor.delete_item")}
      </mwc-button>
    `;
  }

  static get styles() {
    return css`
      .nav {
        display: flex;
        flex-direction: column;
        margin-top: 4px;
      }
      .nav-row {
        display: flex;
        align-items: center;
        gap: 14px;
        border: none;
        background: transparent;
        padding: 12px 6px;
        cursor: pointer;
        text-align: left;
        border-radius: 10px;
        color: var(--primary-text-color);
        transition: background-color 0.15s ease;
      }
      .nav-row:hover {
        background: var(--secondary-background-color);
      }
      .nav-row ha-icon {
        color: var(--secondary-text-color);
        --mdc-icon-size: 20px;
      }
      .nav-labels {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
      }
      .nav-label {
        font-size: 1em;
      }
      .nav-secondary {
        font-size: 0.85em;
        color: var(--secondary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .subpage-head {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: -8px 0 12px;
        position: sticky;
        top: 0;
        z-index: 2;
        background: var(--card-background-color, var(--ha-card-background));
        padding: 8px 0;
      }
      .back {
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background: transparent;
        color: var(--primary-text-color);
        cursor: pointer;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        transition: background-color 0.15s ease;
      }
      .back:hover {
        background: var(--secondary-background-color);
      }
      .back[disabled] {
        opacity: 0.35;
        pointer-events: none;
      }
      .subpage-title {
        font-size: 1.1em;
        font-weight: 600;
      }
      .row {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 4px;
      }
      .row ha-icon {
        --mdc-icon-size: 20px;
        color: var(--secondary-text-color);
      }
      .row-label {
        flex: 1;
      }
      .section {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
        margin: 18px 0 8px;
      }
      .section ha-icon {
        --mdc-icon-size: 18px;
        color: var(--secondary-text-color);
      }
      .modes {
        display: flex;
        background: var(--secondary-background-color);
        border-radius: 10px;
        padding: 3px;
        margin-bottom: 10px;
      }
      .mode {
        flex: 1;
        border: none;
        background: transparent;
        color: var(--primary-text-color);
        padding: 8px 0;
        border-radius: 8px;
        cursor: pointer;
        font-size: 0.9em;
        transition: background-color 0.15s ease, color 0.15s ease;
      }
      .mode:hover:not(.on) {
        background: rgba(127, 127, 127, 0.18);
      }
      .mode.on {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
        font-weight: 600;
      }
      .itembar {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-bottom: 8px;
      }
      .itembar-label {
        margin-left: 4px;
        font-size: 0.85em;
        color: var(--secondary-text-color);
      }
      ha-form {
        display: block;
        margin-bottom: 12px;
      }
      mwc-button.danger {
        --mdc-theme-primary: var(--error-color, #db4437);
        margin-top: 8px;
      }
    `;
  }
}
