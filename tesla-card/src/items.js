/**
 * Configurable action-bar items. Each item is fully user-defined:
 *   - icon            (mdi icon)
 *   - name            (optional label / tooltip)
 *   - value           (optional value source — entity or template — to display)
 *   - show_value      (default true when a value is set)
 *   - tap_action      (Home-Assistant style action; default more-info)
 *
 * An item with no tap_action and a value simply displays the value.
 */

import { valueOf, stateObjOfSource } from "./value.js";

export const DEFAULT_ITEMS = [
  { icon: "mdi:lock", name: "Lock", tap_action: { action: "none" } },
  { icon: "mdi:fan", name: "Climate", tap_action: { action: "none" } },
  { icon: "mdi:ev-station", name: "Charge", tap_action: { action: "none" } },
  { icon: "mdi:crosshairs-gps", name: "Locate", tap_action: { action: "none" } },
  { icon: "mdi:car-back", name: "Trunk", tap_action: { action: "none" } },
];

const ACTIVE_STATES = new Set([
  "on",
  "open",
  "unlocked",
  "heat",
  "cool",
  "heat_cool",
  "charging",
  "home",
  "playing",
]);

export function itemEntity(item) {
  if (item.tap_action && item.tap_action.entity) return item.tap_action.entity;
  if (item.value && item.value.entity) return item.value.entity;
  if (item.entity) return item.entity;
  return undefined;
}

export function itemActive(item, hass, templates) {
  const v = item.value ? valueOf(item.value, hass, templates) : undefined;
  if (v != null && ACTIVE_STATES.has(String(v).toLowerCase())) return true;
  const st = stateObjOfSource(item.value, hass);
  if (st && ACTIVE_STATES.has(String(st.state).toLowerCase())) return true;
  return false;
}

export function performAction(card, action, item) {
  const hass = card.hass;
  if (!hass) return;
  const act = action || { action: "more-info" };
  const entity = act.entity || itemEntity(item || {});

  switch (act.action) {
    case "none":
      return;
    case "toggle": {
      if (!entity) return;
      hass.callService(entity.split(".")[0], "toggle", { entity_id: entity });
      return;
    }
    case "more-info":
      card.openMoreInfo(entity);
      return;
    case "call-service":
    case "perform-action": {
      const svc = act.service || act.perform_action;
      if (!svc) return;
      const [domain, service] = svc.split(".");
      hass.callService(
        domain,
        service,
        act.service_data || act.data || (entity ? { entity_id: entity } : {}),
        act.target
      );
      return;
    }
    case "navigate":
      if (!act.navigation_path) return;
      history.pushState(null, "", act.navigation_path);
      window.dispatchEvent(new CustomEvent("location-changed"));
      return;
    case "url":
      if (act.url_path) window.open(act.url_path, "_blank");
      return;
    default:
      if (entity) card.openMoreInfo(entity);
  }
}
