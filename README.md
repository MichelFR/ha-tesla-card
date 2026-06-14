# Tesla Card for Home Assistant

A custom Lovelace card that mimics the Tesla mobile app: vehicle name, battery
level, status line, a **rotatable 3D vehicle** (drag to rotate) and a
fully-configurable action bar.

[![Validate](https://github.com/MichelFR/ha-tesla-card/actions/workflows/validate.yml/badge.svg)](https://github.com/MichelFR/ha-tesla-card/actions/workflows/validate.yml)
[![Release](https://github.com/MichelFR/ha-tesla-card/actions/workflows/release.yml/badge.svg)](https://github.com/MichelFR/ha-tesla-card/actions/workflows/release.yml)
[![GitHub release](https://img.shields.io/github/v/release/MichelFR/ha-tesla-card)](https://github.com/MichelFR/ha-tesla-card/releases)
[![hacs](https://img.shields.io/badge/HACS-Dashboard-41BDF5.svg)](https://github.com/hacs/integration)

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=MichelFR&repository=ha-tesla-card&category=dashboard)

> Adds this repo to **HACS** in one click. After installing, add the resource
> and the card with the buttons below.

[![Add Lovelace resource](https://my.home-assistant.io/badges/lovelace_resources.svg)](https://my.home-assistant.io/redirect/lovelace_resources/)
[![Open dashboards](https://my.home-assistant.io/badges/lovelace_dashboards.svg)](https://my.home-assistant.io/redirect/lovelace_dashboards/)

## Quick start

1. Click **Open in HACS** above → install → reload your browser.
2. Click **Add Lovelace resource** above and add
   `/hacsfiles/ha-tesla-card/tesla-card/tesla-card.js` (type *JavaScript Module*).
   *(Manual install instead? use `/local/tesla-card/tesla-card.js` — see below.)*
3. Edit a dashboard → **Add card** → search **"Tesla Card"**.

## Project structure

```
tesla-card/
  tesla-card.js          # entry module (register this as the resource)
  src/                   # modular source
    lit.js               # Lit base reused from the HA frontend
    variants.js          # vehicles / facelifts + bundled 3D models
    colors.js            # paint colours (3D recolour + 2D codes)
    compositor.js        # Tesla 2D configurator fallback
    model-loader.js      # lazy <model-viewer> loader
    model-cache.js       # IndexedDB cache for the .glb models
    value.js             # entity/template value resolution + live templates
    items.js             # configurable action-bar items + tap actions
    styles.js            # card styling
    card.js              # <tesla-card> element
    editor.js            # <tesla-card-editor> visual editor
  vendor/
    model-viewer.min.js  # self-contained 3D viewer (offline)
  models/                # built-in 3D models, one folder per vehicle
    model-3/ model-3-highland/ model-y/ model-y-juniper/ model-s/ model-x/
```

## Installation

### Automatic (HACS) — recommended

1. **Add the repository.** Click the badge:

   [![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=MichelFR&repository=ha-tesla-card&category=dashboard)

   …or in HACS → ⋮ → **Custom repositories**, add
   `https://github.com/MichelFR/ha-tesla-card` with category **Dashboard**.
2. Open the **Tesla Card** entry in HACS and click **Download**.
3. **Add the Lovelace resource** (HACS usually does this automatically; verify
   via [![Add Lovelace resource](https://my.home-assistant.io/badges/lovelace_resources.svg)](https://my.home-assistant.io/redirect/lovelace_resources/)):

   ```yaml
   url: /hacsfiles/ha-tesla-card/tesla-card/tesla-card.js
   type: module
   ```

4. **Hard-refresh** the browser (Ctrl/Cmd+Shift+R).
5. Edit a dashboard → **Add card** → search **"Tesla Card"**.

### Manual

1. Download this repo and copy the whole `tesla-card/` folder to
   `<config>/www/tesla-card/` (so you have
   `<config>/www/tesla-card/tesla-card.js`).
2. Add it as a Lovelace resource — **Settings → Dashboards → ⋮ → Resources →
   Add resource** ([![Add Lovelace resource](https://my.home-assistant.io/badges/lovelace_resources.svg)](https://my.home-assistant.io/redirect/lovelace_resources/)):

   ```yaml
   url: /local/tesla-card/tesla-card.js
   type: module
   ```

3. **Hard-refresh** the browser (Ctrl/Cmd+Shift+R).
4. Edit a dashboard → **Add card** → search **"Tesla Card"**.

> A back-compat shim at `<config>/www/tesla-card.js` (resource
> `/local/tesla-card.js`) is also provided for older installs — it just imports
> the modular entry above.

## Model caching

The 3D models (4–15 MB each) are cached in the browser via **IndexedDB** the
first time they load, and served to `<model-viewer>` as a `blob:` URL on every
subsequent view — so there is no repeated download, even across page reloads.
IndexedDB is used (rather than the Cache API) because it also works over plain
`http://homeassistant.local`, which is not a secure context. After replacing a
model file, clear the cache from the browser console:

```js
import("/local/tesla-card/src/model-cache.js").then((m) => m.clearModelCache());
```

## Configuration

Add the card via the dashboard UI ("Tesla Card" appears in the picker, with a
visual editor), or in YAML:

```yaml
type: custom:tesla-card
name: Tessi
variant: model3_highland        # picks the 3D model + year (see table below)
color: white                    # white | black | grey | blue | red | #rrggbb

# value fields — each is an entity (+ optional attribute) OR a template
battery: { entity: sensor.tessi_battery }
charging: { entity: binary_sensor.tessi_charging }
range: { template: "{{ states('sensor.tessi_range') }} km" }
status: { entity: sensor.tessi_shift_state }

# the action bar is a list of fully-configurable items
items:
  - icon: mdi:lock
    name: Lock
    value: { entity: lock.tessi_doors }     # shows the value under the icon
    tap_action: { action: toggle }          # standard HA click action
  - icon: mdi:fan
    tap_action:
      action: perform-action
      perform_action: climate.toggle
      target: { entity_id: climate.tessi_hvac }
  - icon: mdi:map-marker
    tap_action: { action: more-info, entity: device_tracker.tessi_location }
  - icon: mdi:speedometer
    value: { template: "{{ states('sensor.tessi_speed') }}" }
    tap_action: { action: none }            # display-only
```

### Visual editor

The editor is a **subpage navigator** (sticky header with a back arrow), not
collapsibles. The root lists: **General**, **Vehicle & paint**, **3D model**,
**Status values**, **Items**. Each value field has an **Entity / Template**
toggle, and each item is edited on its own subpage with an icon picker, an
optional value, and Home Assistant's native **action** editor (tap-action /
click events).

### Value fields (entity or template)

`battery`, `charging`, `range`, `status` and each item's `value` accept either:

```yaml
{ entity: sensor.x }                 # state
{ entity: sensor.x, attribute: y }   # an attribute
{ template: "{{ ... }}" }            # a live Jinja template
```

Templates are rendered live over the WebSocket (`render_template`). The legacy
`*_entity` keys (`battery_level_entity`, …) are still accepted as a fallback.

## Vehicle variants

Each variant ships with its own built-in 3D model (drag to rotate):

| `variant`          | Vehicle           | Years       |
| ------------------ | ----------------- | ----------- |
| `model3`           | Model 3           | 2017–2023   |
| `model3_highland`  | Model 3 Highland  | 2024–       |
| `modely`           | Model Y           | 2020–2024   |
| `modely_juniper`   | Model Y Juniper   | 2025–       |
| `models`           | Model S           | 2016–2020   |
| `modelx`           | Model X           | 2016–2021   |

## Paint colour

`color` accepts a named colour (`white`, `black`, `grey`, `blue`, `red`) or any
`#rrggbb` hex. In 3D it recolours the body material; in the 2D fallback it maps
to the matching Tesla paint code.

> Recolour quality depends on the 3D model's materials. It works well on
> Model 3, Model 3 Highland and Model Y; it's best-effort on Model Y Juniper and
> **off by default on Model S / Model X** (single combined material). Override the
> recoloured materials per card with `paint_materials: ["MaterialName", ...]`.

## 3D model (drag to rotate)

For a true rotatable 3D vehicle, the card uses Google
[`<model-viewer>`](https://modelviewer.dev) with a `.glb`/`.gltf` model. Drag to
rotate; pinch/scroll to zoom (unless disabled).

Each variant has a built-in model under `tesla-card/models/`. To use your own:

```yaml
type: custom:tesla-card
name: Tessi
model_url: /local/tesla-card/models/model-3-highland/model-3-highland.glb
auto_rotate: false                           # idle spin
disable_zoom: true                           # rotate only
camera_orbit: "-25deg 78deg 105%"            # starting angle/zoom
```

| Option                | Type    | Default               | Description                                            |
| --------------------- | ------- | --------------------- | ------------------------------------------------------ |
| `model_url`           | string  | per-variant default   | `.glb`/`.gltf` to render in 3D. Empty → 2D compositor. |
| `model_viewer_src`    | string  | `/local/tesla-card/vendor/model-viewer.min.js` | Viewer bundle (CDN fallback).   |
| `auto_rotate`         | boolean | `false`               | Slowly spin the model when idle.                       |
| `disable_zoom`        | boolean | `true`                | Rotate only; ignore zoom gestures.                     |
| `camera_orbit`        | string  | `-25deg 78deg 105%`   | Initial `<model-viewer>` camera orbit.                 |
| `rotation_per_second` | string  | `20deg`               | Auto-rotate speed.                                     |

If `model_url` is empty (and the model has no bundled default), the card falls
back to Tesla's 2D configurator render (a single 3/4 angle — not rotatable).

## Options

| Option             | Type    | Default           | Description                                                  |
| ------------------ | ------- | ----------------- | ------------------------------------------------------------ |
| `name`             | string  | variant label     | Title shown in the header.                                   |
| `variant`          | string  | `model3_highland` | Vehicle + facelift (see Variants table).                    |
| `color`            | string  | —                 | Paint colour: name or `#rrggbb`.                            |
| `paint_materials`  | list    | per-variant       | Override which 3D materials get recoloured.                  |
| `battery`          | value   | —                 | Battery % — entity or template (see Value fields).          |
| `charging`         | value   | —                 | Charging state — `on`/`charging` means charging.            |
| `range`            | value   | —                 | Range shown next to the battery %.                          |
| `status`           | value   | —                 | Status line under the battery.                             |
| `items`            | list    | 5 placeholders    | The action bar (see Items).                                  |
| `model_url`        | string  | per-variant       | Custom `.glb`/`.gltf` (empty → 2D compositor).              |
| `auto_rotate`      | boolean | `false`           | Idle spin.                                                  |
| `disable_zoom`     | boolean | `true`            | Rotate only; ignore zoom.                                   |
| `camera_orbit`     | string  | `-25deg 78deg 105%` | Initial camera orbit.                                     |
| `image`            | string  | —                 | Static 2D image; overrides the 3D model.                    |
| `image_entity`     | string  | —                 | `image`/`camera` entity used as the 2D image.              |
| `model`            | string  | —                 | Legacy alias (`m3`/`my`/`ms`/`mx`) → variant.              |

## Items (action bar)

Each item is fully configurable — there are no fixed "lock/climate/…" slots:

| Field        | Description                                                              |
| ------------ | ---------------------------------------------------------------------- |
| `icon`       | mdi icon.                                                               |
| `name`       | Optional label / tooltip.                                               |
| `value`      | Optional value source (entity or template) shown under the icon.        |
| `show_value` | `false` to hide the value text (default shows it when `value` is set).  |
| `tap_action` | Standard HA action: `more-info`, `toggle`, `perform-action`, `navigate`, `url`, `none`. |

```yaml
items:
  - icon: mdi:lock
    name: Lock
    value: { entity: lock.tessi_doors }
    tap_action: { action: toggle }
  - icon: mdi:flash
    tap_action:
      action: perform-action
      perform_action: button.press
      target: { entity_id: button.tessi_charge_port_door }
```

The 3D render falls back to Tesla's public 2D compositor (single 3/4 angle) if
no model is available; set `image:` for any static picture of your car.

## Releases & validation

CI runs on every push (`.github/workflows`):

- **Validate** — [HACS validation](https://github.com/hacs/action) (category
  *plugin*) plus a `node --check` of every module. (Note: Home Assistant's
  *hassfest* only validates custom **integrations** with a `manifest.json`, so it
  does not apply to a dashboard/frontend card — HACS validation is the
  equivalent here.)
- **Release** — bump `CARD_VERSION` in `tesla-card/tesla-card.js`, push to
  `main`, and a matching `vX.Y.Z` tag + GitHub Release is created automatically.
  HACS then offers the new version.

## Credits

The bundled 3D models are from Sketchfab and licensed **CC‑BY** (Model Y Juniper
is **CC‑BY‑NC**, non-commercial). Thanks to the authors:

| Vehicle | Model | Author | License |
| ------- | ----- | ------ | ------- |
| Model 3 | Tesla Model 3 2020 | [ItsDiyor](https://sketchfab.com/ItsDiyor) | CC‑BY |
| Model 3 Highland | Tesla Model 3 2024 | [brandonleong28](https://sketchfab.com/brandonleong28) | CC‑BY |
| Model Y | Tesla Model Y | [Nieve5677](https://sketchfab.com/niev) | CC‑BY |
| Model Y Juniper | 2025 Tesla Model Y | [BloxBloger](https://sketchfab.com/BloxBloger) | CC‑BY‑NC |
| Model S | Tesla Model S 90D | [pancakesbassoondonut](https://sketchfab.com/vrchris) | CC‑BY |
| Model X | Tesla Model X | [David_Holiday](https://sketchfab.com/David_Holiday) | CC‑BY |

3D rendering by [`<model-viewer>`](https://modelviewer.dev) (Apache‑2.0).
The 2D fallback uses Tesla's public configurator compositor.

## License

Card code: MIT. Bundled 3D models retain their original Sketchfab licenses
(see Credits); the Model Y Juniper model is CC‑BY‑NC (personal/non-commercial
use only).
