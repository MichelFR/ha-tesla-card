/* Vehicle variants. Each bundles its own 3D model (hosted alongside the card),
 * the compositor model used for the 2D fallback, model years shown in the
 * picker, and the body-paint material names used for 3D recolouring. */

// Resolved relative to the built bundle so it works under /local/ and /hacsfiles/.
const MODELS_BASE = new URL("./models", import.meta.url).href;

export const VARIANTS = {
  model3: {
    label: "Model 3",
    years: "2017–2023",
    glb: `${MODELS_BASE}/model-3/model-3.glb`,
    compositor: "m3",
    paintMaterials: ["Paint_Color", "metal_white"],
  },
  model3_highland: {
    label: "Model 3 Highland",
    years: "2024–",
    glb: `${MODELS_BASE}/model-3-highland/model-3-highland.glb`,
    compositor: "m3",
    paintMaterials: [
      "Geohoodsub00021Mtl",
      "Geohoodsub00031Mtl",
      "Geodoorl2sub11Mtl",
      "Geodoorl2sub31Mtl",
      "Geodoorr2sub31Mtl",
    ],
  },
  modely: {
    label: "Model Y",
    years: "2020–2024",
    glb: `${MODELS_BASE}/model-y/model-y.glb`,
    compositor: "my",
    paintMaterials: ["visionarq.mx_car_carpaint"],
  },
  modely_juniper: {
    label: "Model Y Juniper",
    years: "2025–",
    glb: `${MODELS_BASE}/model-y-juniper/model-y-juniper.glb`,
    compositor: "my",
    paintMaterials: ["black_base", "black_reflection"],
  },
  models: {
    label: "Model S",
    years: "2016–2020",
    glb: `${MODELS_BASE}/model-s/model-s.glb`,
    compositor: "ms",
    paintMaterials: [],
  },
  modelx: {
    label: "Model X",
    years: "2016–2021",
    glb: `${MODELS_BASE}/model-x/model-x.glb`,
    compositor: "mx",
    paintMaterials: [],
  },
};

export const DEFAULT_VARIANT = "model3_highland";

export const LEGACY_MODEL_MAP = {
  m3: "model3_highland",
  my: "modely_juniper",
  ms: "models",
  mx: "modelx",
};

export function resolveVariantKey(config) {
  if (config.variant && VARIANTS[config.variant]) return config.variant;
  if (config.model && LEGACY_MODEL_MAP[config.model]) return LEGACY_MODEL_MAP[config.model];
  return DEFAULT_VARIANT;
}
