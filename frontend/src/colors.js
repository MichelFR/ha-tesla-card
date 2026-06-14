/* Paint colours: a hex used to recolour the 3D body material and a Tesla
 * configurator code used for the 2D compositor fallback. */

export const COLORS = {
  white: { label: "Pearl White", hex: "#e9e9ec", code: "$PPSW" },
  black: { label: "Solid Black", hex: "#16181c", code: "$PBSB" },
  grey: { label: "Stealth Grey", hex: "#55585d", code: "$PN01" },
  blue: { label: "Deep Blue", hex: "#1e3a63", code: "$PPSB" },
  red: { label: "Red Multi-Coat", hex: "#8c1c1c", code: "$PR01" },
};

export function hexToLinearRgba(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || "");
  if (!m) return null;
  const lin = (c) => {
    const s = parseInt(c, 16) / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return [lin(m[1]), lin(m[2]), lin(m[3]), 1];
}

export function resolveColorHex(color) {
  if (!color) return null;
  if (COLORS[color]) return COLORS[color].hex;
  if (/^#?[a-f\d]{6}$/i.test(color)) return color.startsWith("#") ? color : `#${color}`;
  return null;
}
