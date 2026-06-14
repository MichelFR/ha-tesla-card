/* Value sources — every value-bearing field can be backed by an entity (with an
 * optional attribute) OR a Jinja template, resolved live.
 *
 *   { entity: "sensor.x", attribute?: "y" }
 *   { template: "{{ ... }}" }
 *   { value: "static" }
 *   "sensor.x"  (shorthand for { entity: "sensor.x" })
 */

export function normalizeSource(vs) {
  if (!vs) return null;
  if (typeof vs === "string") return { entity: vs };
  return vs;
}

export function valueOf(vs, hass, templates) {
  const s = normalizeSource(vs);
  if (!s) return undefined;
  if (s.template) return templates ? templates.get(s.template) : undefined;
  if (s.entity) {
    const st = hass && hass.states && hass.states[s.entity];
    if (!st) return undefined;
    return s.attribute ? st.attributes[s.attribute] : st.state;
  }
  if (s.value != null) return s.value;
  return undefined;
}

export function stateObjOfSource(vs, hass) {
  const s = normalizeSource(vs);
  if (s && s.entity && hass && hass.states) return hass.states[s.entity];
  return undefined;
}

export function templatesIn(...sources) {
  const out = [];
  for (const vs of sources) {
    const s = normalizeSource(vs);
    if (s && s.template) out.push(s.template);
  }
  return out;
}

/* Manages live `render_template` subscriptions for a host element. */
export class TemplateController {
  constructor(host) {
    this._host = host;
    this._subs = new Map();
    this.results = {};
  }

  sync(hass, templates) {
    const want = new Set(templates);
    for (const [tpl, unsubP] of this._subs) {
      if (!want.has(tpl)) {
        unsubP.then((u) => typeof u === "function" && u()).catch(() => {});
        this._subs.delete(tpl);
        delete this.results[tpl];
      }
    }
    if (!hass || !hass.connection) return;
    for (const tpl of want) {
      if (this._subs.has(tpl)) continue;
      const p = hass.connection
        .subscribeMessage(
          (msg) => {
            this.results[tpl] = msg.error ? `⚠ ${msg.error}` : msg.result;
            this._host.requestUpdate();
          },
          { type: "render_template", template: tpl, report_errors: true }
        )
        .catch(() => null);
      this._subs.set(tpl, p);
    }
  }

  get(tpl) {
    return this.results[tpl];
  }

  disconnect() {
    for (const [, unsubP] of this._subs) {
      unsubP.then((u) => typeof u === "function" && u()).catch(() => {});
    }
    this._subs.clear();
    this.results = {};
  }
}
