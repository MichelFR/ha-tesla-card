/* Lazily loads the self-contained Google <model-viewer> bundle. Local first
 * (works offline), CDN as a fallback. Loaded once per page. */

const MODEL_VIEWER_LOCAL = new URL("./vendor/model-viewer.min.js", import.meta.url).href;
const MODEL_VIEWER_CDN =
  "https://unpkg.com/@google/model-viewer@3.5.0/dist/model-viewer.min.js";

let _loading = null;

function inject(url) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.type = "module";
    s.src = url;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`failed to load ${url}`));
    document.head.appendChild(s);
  });
}

export function loadModelViewer(src) {
  if (customElements.get("model-viewer")) return Promise.resolve();
  if (_loading) return _loading;
  _loading = inject(src || MODEL_VIEWER_LOCAL)
    .catch(() => inject(MODEL_VIEWER_CDN))
    .then(() => customElements.whenDefined("model-viewer"));
  return _loading;
}
