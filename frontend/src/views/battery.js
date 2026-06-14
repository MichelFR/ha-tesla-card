/* Battery row: icon + % (+ optional label) on the left, a green charging pill
 * on the right while charging, and an optional progress bar underneath. The
 * progress bar is always shown while charging (see the Tesla app look). */

import { html } from "lit";

export function renderBattery(card) {
  const lvl = card.batteryLevel;
  const charging = card.isCharging;
  const label = card.batteryLabelText;
  const power = card.chargePowerText;
  const showProgress = card.showProgress || charging;
  const pct = Math.max(0, Math.min(100, lvl ?? 0));

  return html`
    <div class="status">
      <div class="battery-row">
        <div class="battery-left">
          <ha-icon
            class="battery-icon ${charging ? "charging" : ""}"
            icon=${card.batteryIcon}
          ></ha-icon>
          <span class="battery-pct">${lvl != null ? `${lvl}%` : "—"}</span>
          ${label ? html`<span class="battery-label">${label}</span>` : ""}
        </div>
        ${charging && power
          ? html`<span class="charge-pill">
              <ha-icon class="bolt" icon="mdi:lightning-bolt"></ha-icon>${power}
            </span>`
          : ""}
      </div>
      ${showProgress
        ? html`<div class="progress">
            <div
              class="progress-fill ${charging ? "charging" : ""}"
              style="width:${pct}%"
            ></div>
          </div>`
        : ""}
      <div class="status-text">${card.statusText}</div>
    </div>
  `;
}
