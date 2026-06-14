/* Small value helpers. */

export function isTemplate(value) {
  return typeof value === "string" && /\{[{%]/.test(value);
}

export function isEntityId(value) {
  return typeof value === "string" && /^[a-z_]+\.[a-zA-Z0-9_]+$/.test(value);
}

export function cap(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

export function titleCase(s) {
  return String(s)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
