import { css } from "./lit.js";

export const cardStyles = css`
  :host {
    --tesla-bg: #1c1c1e;
    --tesla-fg: #ffffff;
    --tesla-muted: #8e8e93;
    --tesla-btn-bg: rgba(255, 255, 255, 0.08);
    --tesla-btn-active: #3478f6;
  }
  ha-card {
    background: var(--tesla-bg);
    color: var(--tesla-fg);
    border-radius: 22px;
    overflow: hidden;
    border: none;
    box-shadow: none;
  }
  .card {
    padding: 18px 18px 22px;
    display: flex;
    flex-direction: column;
  }
  .header {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .name {
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.02em;
  }
  .chevron {
    --mdc-icon-size: 26px;
    color: var(--tesla-fg);
    margin-top: 4px;
  }
  .status {
    margin-top: 6px;
  }
  .battery {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .battery-icon {
    --mdc-icon-size: 22px;
    color: var(--tesla-fg);
  }
  .battery-icon.charging {
    color: #34c759;
  }
  .battery-pct {
    font-size: 18px;
    font-weight: 600;
  }
  .range {
    color: var(--tesla-muted);
    font-size: 16px;
  }
  .status-text {
    color: var(--tesla-muted);
    font-size: 16px;
    margin-top: 2px;
  }
  .car {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    margin: 8px 0 18px;
  }
  .car img {
    width: 100%;
    max-width: 460px;
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 24px 24px rgba(0, 0, 0, 0.55));
    user-select: none;
    -webkit-user-drag: none;
  }
  .car-3d {
    width: 100%;
    height: 240px;
    --poster-color: transparent;
    background: transparent;
    cursor: grab;
  }
  .car-3d:active {
    cursor: grabbing;
  }
  .car-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    width: 100%;
  }
  .actions {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 8px;
  }
  .action {
    background: transparent;
    border: none;
    color: var(--tesla-fg);
    cursor: pointer;
    min-width: 52px;
    padding: 6px 4px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    transition: background 0.15s ease, transform 0.1s ease;
  }
  .action ha-icon {
    --mdc-icon-size: 26px;
  }
  .action-value {
    font-size: 11px;
    color: var(--tesla-muted);
    max-width: 64px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .action.active .action-value {
    color: rgba(255, 255, 255, 0.85);
  }
  .action:hover {
    background: var(--tesla-btn-bg);
  }
  .action:active {
    transform: scale(0.92);
  }
  .action.active {
    background: var(--tesla-btn-active);
    color: #fff;
  }
`;
