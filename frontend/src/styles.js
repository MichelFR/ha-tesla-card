import { css } from "lit";

export const cardStyles = css`
  :host {
    --tesla-bg: #1c1c1e;
    --tesla-fg: #ffffff;
    --tesla-muted: #8e8e93;
    --tesla-green: #7cb342;
    --tesla-green-fg: #8bc34a;
    --tesla-btn-bg: rgba(255, 255, 255, 0.08);
    --tesla-btn-active: #3478f6;
    --tesla-track: rgba(255, 255, 255, 0.14);
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
  .battery-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .battery-left {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }
  .battery-icon {
    --mdc-icon-size: 22px;
    color: var(--tesla-fg);
  }
  .battery-icon.charging {
    color: var(--tesla-green-fg);
  }
  .battery-pct {
    font-size: 18px;
    font-weight: 700;
  }
  .battery-label {
    color: var(--tesla-muted);
    font-size: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .charge-pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: rgba(124, 179, 66, 0.18);
    color: var(--tesla-green-fg);
    padding: 4px 12px;
    border-radius: 999px;
    font-size: 15px;
    font-weight: 600;
    white-space: nowrap;
    flex: none;
  }
  .charge-pill .bolt {
    --mdc-icon-size: 18px;
    color: var(--tesla-green-fg);
    animation: bolt-pulse 1.2s ease-in-out infinite;
  }
  @keyframes bolt-pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.35;
    }
  }
  .progress {
    height: 6px;
    border-radius: 3px;
    background: var(--tesla-track);
    overflow: hidden;
    margin-top: 12px;
  }
  .progress-fill {
    height: 100%;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.85);
    transition: width 0.5s ease;
    position: relative;
    overflow: hidden;
  }
  .progress-fill.charging {
    background: var(--tesla-green);
  }
  .progress-fill.charging::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.45),
      transparent
    );
    transform: translateX(-100%);
    animation: progress-shine 1.6s ease-in-out infinite;
  }
  @keyframes progress-shine {
    0% {
      transform: translateX(-100%);
    }
    60%,
    100% {
      transform: translateX(100%);
    }
  }
  .status-text {
    color: var(--tesla-muted);
    font-size: 16px;
    margin-top: 8px;
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
  .action.active {
    background: var(--tesla-btn-active);
    color: #fff;
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
`;
