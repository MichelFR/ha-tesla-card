/* Tiny i18n layer. Language follows the Home Assistant user profile; English
 * is the fallback. Translations live in translations/<lang>.json. */

import de from "./translations/de.json";
import en from "./translations/en.json";

const TRANSLATIONS = { en, de };

export function language(hass) {
  return (hass?.locale?.language || hass?.language || "en").split("-")[0];
}

function lookup(table, key) {
  const value = key.split(".").reduce((node, part) => node?.[part], table);
  return typeof value === "string" ? value : undefined;
}

export function localize(hass, key, vars = {}) {
  const table = TRANSLATIONS[language(hass)] || TRANSLATIONS.en;
  let text = lookup(table, key) ?? lookup(TRANSLATIONS.en, key) ?? key;
  for (const [name, value] of Object.entries(vars)) {
    text = text.replace(`{${name}}`, value);
  }
  return text;
}
