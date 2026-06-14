# Changelog

All notable changes to the Tesla Card are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.1.2] - 2026-06-15

### Changed

- Improve editor appearance.

## [3.1.1] - 2026-06-15

### Added

- **Charging view** that matches the Tesla app: a green charging pill showing
  the live **charging power** (e.g. `0.3 kW`) with an animated bolt, and a
  battery **progress bar** that fills green with a shimmer while charging.
- **Configurable progress bar** (`show_progress`, off by default). It is always
  shown while charging.
- **Battery label** on the battery row — `show_battery_label` plus a
  `battery_label` value (defaults to the SoC entity's name).
- `charge_power` value field for the charging speed.
- **Internationalisation** — English and German translations
  (`frontend/src/translations`); the card follows the HA user's language.

### Changed

- **Editor redesigned** to look like Home Assistant's own settings: a native
  list of nav rows on the root, each opening a subpage with a sticky header and
  a round back button; value fields use a segmented **Entity / Template** toggle.
- **Project restructured** to a proper build: source now lives in
  `frontend/src/` and is bundled with esbuild (Lit included) to a single
  self-contained `tesla-card/tesla-card.js`. The built bundle is committed, so
  installs still need no build step.

### Developer

- `Validate` workflow now builds the bundle and fails if the committed output is
  stale; `Release` reads the version from `frontend/package.json`.

### Security

- `esbuild` build dependency pinned to `0.28.1` to clear
  [GHSA-gv7w-rqvm-qjhr](https://github.com/advisories/GHSA-gv7w-rqvm-qjhr)
  (build-time only; the shipped bundle is unaffected). `npm audit` reports no
  vulnerabilities.

## [3.0.0] - 2026-06-15

### Added

- **Entity or template** for every value field (`battery`, `charging`, `range`,
  `status` and each item's value). Templates render live over the WebSocket.
- **Configurable items**: the action bar is now a free list — each item has its
  own icon, optional value, and a native Home Assistant tap-action (more-info /
  toggle / perform-action / navigate / url / none), edited on its own subpage.
- **3D / 2D mode** toggle (`mode`) to force the flat render.
- **Subpage editor** (sticky header + back) replacing the collapsible sections.

### Removed

- The fixed "action entities" (lock / climate / charge / locate / trunk slots)
  and the built-in action registry — replaced by configurable items.
- The header message/menu icons.

### Changed

- All entities are config-driven; legacy `*_entity` keys remain as a fallback.

## [Earlier]

Pre-release development that shipped before the first tagged version:

- True **drag-to-rotate 3D** via Google `<model-viewer>` with bundled `.glb`
  models, plus a 2D Tesla configurator fallback.
- **Vehicle variants** with model years — Model 3, Model 3 Highland, Model Y,
  Model Y Juniper, Model S, Model X.
- **Paint colour** selection (3D material recolour + 2D paint codes).
- **IndexedDB model caching** (works over plain http) so large models load once.
- HACS support, install buttons, and the initial Tesla-app-style layout.

[3.1.2]: https://github.com/MichelFR/ha-tesla-card/releases/tag/v3.1.2
[3.1.1]: https://github.com/MichelFR/ha-tesla-card/releases/tag/v3.1.1
[3.0.0]: https://github.com/MichelFR/ha-tesla-card/releases/tag/v3.0.0
