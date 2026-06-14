import { Lit, html, css } from "./lit.js";
import { VARIANTS } from "./variants.js";
import { COLORS } from "./colors.js";
import { DEFAULT_ITEMS } from "./items.js";

const LABELS = {
  name: "Vehicle name",
  variant: "Vehicle / facelift",
  color: "Paint colour",
  mode: "Render mode",
  model_url: "Custom 3D model URL (.glb / .gltf)",
  auto_rotate: "Auto-rotate",
  disable_zoom: "Disable zoom",
  camera_orbit: "Camera orbit (e.g. -25deg 78deg 105%)",
  image: "Custom 2D image URL",
  image_entity: "Image / camera entity",
};

export class TeslaCardEditor extends Lit {
  static get properties() {
    return {
      hass: { attribute: false },
      _config: { state: true },
      _stack: { state: true },
    };
  }

  constructor() {
    super();
    this._stack = [];
  }

  setConfig(config) {
    this._config = config;
  }

  /* ---- config plumbing -------------------------------------------- */

  _emit(config) {
    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }

  _update(partial) {
    this._emit({ ...this._config, ...partial });
  }

  _computeLabel = (s) => LABELS[s.name] || s.name;

  _form(schema) {
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${schema}
        .computeLabel=${this._computeLabel}
        @value-changed=${(e) => this._emit(e.detail.value)}
      ></ha-form>
    `;
  }

  /* ---- navigation -------------------------------------------------- */

  _push(page) {
    this._stack = [...this._stack, page];
  }
  _back() {
    this._stack = this._stack.slice(0, -1);
  }

  /* ---- entity-or-template value field ----------------------------- */

  _valueField(value, label, onChange) {
    const v = value || {};
    const mode = v.template != null ? "template" : "entity";
    return html`
      <div class="vfield">
        <div class="vlabel">${label}</div>
        <div class="seg">
          <button
            class=${mode === "entity" ? "on" : ""}
            @click=${() => onChange({ entity: v.entity || "" })}
          >
            Entity
          </button>
          <button
            class=${mode === "template" ? "on" : ""}
            @click=${() => onChange({ template: v.template || "" })}
          >
            Template
          </button>
        </div>
        ${mode === "entity"
          ? html`
              <ha-selector
                .hass=${this.hass}
                .selector=${{ entity: {} }}
                .value=${v.entity || ""}
                @value-changed=${(e) => onChange({ ...v, entity: e.detail.value })}
              ></ha-selector>
              <ha-selector
                .hass=${this.hass}
                .selector=${{ attribute: { entity_id: v.entity } }}
                .value=${v.attribute || ""}
                .label=${"Attribute (optional)"}
                .disabled=${!v.entity}
                @value-changed=${(e) => onChange({ ...v, attribute: e.detail.value })}
              ></ha-selector>
            `
          : html`
              <ha-selector
                .hass=${this.hass}
                .selector=${{ template: {} }}
                .value=${v.template || ""}
                @value-changed=${(e) => onChange({ ...v, template: e.detail.value })}
              ></ha-selector>
            `}
      </div>
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
    this._updateItems(this._items.map((it, idx) => (idx === i ? { ...it, ...partial } : it)));
  }
  _addItem() {
    const items = [...this._items, { icon: "mdi:flash", tap_action: { action: "more-info" } }];
    this._updateItems(items);
    this._push({ id: "item", index: items.length - 1, title: "Item" });
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
    // keep the open subpage pointed at the same item after reordering
    const top = this._stack[this._stack.length - 1];
    if (top && top.id === "item" && top.index === i) {
      const ns = [...this._stack];
      ns[ns.length - 1] = { ...top, index: j };
      this._stack = ns;
    }
  }

  /* ---- pages ------------------------------------------------------- */

  _renderRoot() {
    const rows = [
      { id: "general", title: "General", icon: "mdi:car", sub: this._config.name || "" },
      { id: "vehicle", title: "Vehicle & paint", icon: "mdi:palette" },
      { id: "model3d", title: "3D model", icon: "mdi:rotate-3d" },
      { id: "status", title: "Status values", icon: "mdi:battery-high" },
      {
        id: "items",
        title: "Items",
        icon: "mdi:gesture-tap-button",
        sub: `${this._items.length} item${this._items.length === 1 ? "" : "s"}`,
      },
    ];
    return html`
      <mwc-list>
        ${rows.map(
          (r) => html`
            <ha-list-item
              graphic="icon"
              ?twoline=${!!r.sub}
              hasMeta
              @click=${() => this._push({ id: r.id, title: r.title })}
            >
              <ha-icon slot="graphic" icon=${r.icon}></ha-icon>
              ${r.title}
              ${r.sub ? html`<span slot="secondary">${r.sub}</span>` : ""}
              <ha-icon slot="meta" icon="mdi:chevron-right"></ha-icon>
            </ha-list-item>
          `
        )}
      </mwc-list>
    `;
  }

  _renderPage(page) {
    if (!page) return this._renderRoot();
    switch (page.id) {
      case "general":
        return this._form([{ name: "name", selector: { text: {} } }]);
      case "vehicle":
        return this._form([
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
                  { value: "", label: "Original (model default)" },
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
                  { value: "3d", label: "3D — rotatable model" },
                  { value: "2d", label: "2D — image" },
                ],
              },
            },
          },
        ]);
      case "model3d":
        return this._form([
          { name: "model_url", selector: { text: {} } },
          { name: "auto_rotate", selector: { boolean: {} } },
          { name: "disable_zoom", selector: { boolean: {} } },
          { name: "camera_orbit", selector: { text: {} } },
          { name: "image", selector: { text: {} } },
          { name: "image_entity", selector: { entity: { domain: ["image", "camera"] } } },
        ]);
      case "status":
        return html`
          ${this._valueField(this._config.battery, "Battery level (%)", (v) =>
            this._update({ battery: v })
          )}
          ${this._valueField(this._config.charging, "Charging state", (v) =>
            this._update({ charging: v })
          )}
          ${this._valueField(this._config.range, "Range", (v) => this._update({ range: v }))}
          ${this._valueField(this._config.status, "Status line", (v) =>
            this._update({ status: v })
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
      <mwc-list>
        ${this._items.map(
          (it, i) => html`
            <ha-list-item
              graphic="icon"
              twoline
              hasMeta
              @click=${() => this._push({ id: "item", index: i, title: it.name || "Item" })}
            >
              <ha-icon slot="graphic" icon=${it.icon || "mdi:gesture-tap-button"}></ha-icon>
              ${it.name || it.icon || `Item ${i + 1}`}
              <span slot="secondary">${(it.tap_action && it.tap_action.action) || "more-info"}</span>
              <ha-icon slot="meta" icon="mdi:chevron-right"></ha-icon>
            </ha-list-item>
          `
        )}
      </mwc-list>
      <mwc-button raised @click=${this._addItem}>
        <ha-icon icon="mdi:plus"></ha-icon>&nbsp;Add item
      </mwc-button>
    `;
  }

  _renderItem(i) {
    const it = this._items[i];
    if (!it) return this._renderRoot();
    return html`
      <div class="itembar">
        <ha-icon-button .disabled=${i === 0} @click=${() => this._moveItem(i, -1)}>
          <ha-icon icon="mdi:arrow-up"></ha-icon>
        </ha-icon-button>
        <ha-icon-button
          .disabled=${i === this._items.length - 1}
          @click=${() => this._moveItem(i, 1)}
        >
          <ha-icon icon="mdi:arrow-down"></ha-icon>
        </ha-icon-button>
        <span class="itembar-label">Item ${i + 1} of ${this._items.length}</span>
      </div>
      <ha-selector
        .hass=${this.hass}
        .selector=${{ icon: {} }}
        .value=${it.icon || ""}
        .label=${"Icon"}
        @value-changed=${(e) => this._updateItem(i, { icon: e.detail.value })}
      ></ha-selector>
      <ha-selector
        .hass=${this.hass}
        .selector=${{ text: {} }}
        .value=${it.name || ""}
        .label=${"Name (optional)"}
        @value-changed=${(e) => this._updateItem(i, { name: e.detail.value })}
      ></ha-selector>

      ${this._valueField(it.value, "Value to display (optional)", (v) =>
        this._updateItem(i, { value: v })
      )}

      <ha-formfield .label=${"Show value under icon"}>
        <ha-switch
          .checked=${it.show_value !== false}
          @change=${(e) => this._updateItem(i, { show_value: e.target.checked })}
        ></ha-switch>
      </ha-formfield>

      <div class="vlabel">Tap action</div>
      <ha-selector
        .hass=${this.hass}
        .selector=${{ ui_action: {} }}
        .value=${it.tap_action || { action: "more-info" }}
        @value-changed=${(e) => this._updateItem(i, { tap_action: e.detail.value })}
      ></ha-selector>

      <mwc-button class="danger" @click=${() => this._deleteItem(i)}>
        <ha-icon icon="mdi:delete"></ha-icon>&nbsp;Delete item
      </mwc-button>
    `;
  }

  /* ---- render ------------------------------------------------------ */

  render() {
    if (!this.hass || !this._config) return html``;
    const page = this._stack[this._stack.length - 1];
    return html`
      ${page
        ? html`
            <div class="subheader">
              <ha-icon-button @click=${this._back}>
                <ha-icon icon="mdi:arrow-left"></ha-icon>
              </ha-icon-button>
              <span class="subtitle">${page.title}</span>
            </div>
          `
        : ""}
      <div class="page">${this._renderPage(page)}</div>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      .subheader {
        position: sticky;
        top: 0;
        z-index: 2;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px 0 8px;
        margin-bottom: 8px;
        background: var(--card-background-color, #fff);
        border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      }
      .subtitle {
        font-size: 16px;
        font-weight: 600;
      }
      .page {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      mwc-list {
        --mdc-list-vertical-padding: 0;
        margin: 0 -8px;
      }
      ha-list-item ha-icon[slot="meta"] {
        color: var(--secondary-text-color);
      }
      .itembar {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .itembar-label {
        margin-left: 4px;
        font-size: 12px;
        color: var(--secondary-text-color);
      }
      .vfield {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .vlabel {
        font-size: 13px;
        font-weight: 600;
        color: var(--secondary-text-color);
      }
      .seg {
        display: inline-flex;
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.2));
        border-radius: 18px;
        overflow: hidden;
        align-self: flex-start;
      }
      .seg button {
        border: none;
        background: transparent;
        color: var(--primary-text-color);
        padding: 4px 14px;
        cursor: pointer;
        font-size: 13px;
      }
      .seg button.on {
        background: var(--primary-color);
        color: var(--text-primary-color, #fff);
      }
      mwc-button.danger {
        --mdc-theme-primary: var(--error-color, #db4437);
        margin-top: 8px;
      }
    `;
  }
}

customElements.define("tesla-card-editor", TeslaCardEditor);
