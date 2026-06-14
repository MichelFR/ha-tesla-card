/**
 * Persistent client-side cache for the (large) .glb models.
 *
 * Uses IndexedDB — unlike the Cache API / service workers it works in a
 * non-secure context (plain http://homeassistant.local, the common HA setup)
 * and comfortably stores multi-MB blobs. The cached blob is exposed to
 * <model-viewer> as an object URL, so after the first load there is zero
 * network traffic for the model, even across page reloads.
 *
 * Falls back to the original URL (browser HTTP cache) if IndexedDB is
 * unavailable or anything goes wrong.
 */

const DB_NAME = "tesla-card-cache";
const STORE = "models";
const DB_VERSION = 1;

// Per-session map of url -> object URL so a single fetch/blob is reused across
// re-renders and multiple card instances.
const _objectUrls = new Map();

function openDb() {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("no indexedDB"));
      return;
    }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function idbGet(db, key) {
  return new Promise((resolve) => {
    try {
      const req = db.transaction(STORE, "readonly").objectStore(STORE).get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(undefined);
    } catch (e) {
      resolve(undefined);
    }
  });
}

function idbPut(db, key, value) {
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).put(value, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch (e) {
      resolve();
    }
  });
}

/**
 * Returns a usable URL for `url`, served from IndexedDB when possible.
 * Resolves to an object URL (blob:) for cached/fetched models, or the original
 * url on any failure.
 */
export async function getCachedModelUrl(url) {
  if (!url) return url;
  if (_objectUrls.has(url)) return _objectUrls.get(url);

  try {
    const db = await openDb();
    let blob = await idbGet(db, url);

    if (!(blob instanceof Blob)) {
      const resp = await fetch(url, { credentials: "same-origin" });
      if (!resp.ok) return url;
      blob = await resp.blob();
      await idbPut(db, url, blob);
    }

    const objectUrl = URL.createObjectURL(blob);
    _objectUrls.set(url, objectUrl);
    return objectUrl;
  } catch (e) {
    return url; // graceful fallback to the network / HTTP cache
  }
}

/** Drop every cached model (e.g. after updating model files). */
export async function clearModelCache() {
  _objectUrls.forEach((u) => URL.revokeObjectURL(u));
  _objectUrls.clear();
  try {
    const db = await openDb();
    await new Promise((resolve) => {
      const tx = db.transaction(STORE, "readwrite");
      tx.objectStore(STORE).clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });
  } catch (e) {
    /* ignore */
  }
}
