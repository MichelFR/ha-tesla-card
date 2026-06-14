/**
 * Backwards-compatibility shim.
 *
 * Older installs registered the Lovelace resource as `/local/tesla-card.js`.
 * The card now lives in a modular folder; this re-exports the real entry so the
 * old resource URL keeps working. New installs should point the resource at
 * `/local/tesla-card/tesla-card.js` instead.
 */
import "/local/tesla-card/tesla-card.js";
