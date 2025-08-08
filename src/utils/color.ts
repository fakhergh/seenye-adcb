/**
 * Converts a hex color code to an RGBA string with the specified alpha value.
 * @param {string} hex - The hex color code (e.g., '#FF5733').
 * @param {number} alpha - The alpha value (0 to 1) for transparency.
 * @returns {string} - The RGBA color string (e.g., 'rgba(255, 87, 51, 0.5)').
 */
export function hexToRgba(hex: string, alpha: number): string {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '');

  // Parse the r, g, b values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Return RGBA string
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
