/**
 * Gets the complementary color of a given color.
 *
 * @param {string} color - The color in HEX format.
 * @returns {string} The complementary color in HEX format.
 */
const getComplementaryColor = (color) => {
  // Remove the '#' if it exists, because we're not into sharp objects here.
  const sanitizedColor = color.charAt(0) === '#' ? color.slice(1) : color;

  // Convert Hex to RGB, because we're not savages.
  const [r, g, b] = [0, 2, 4].map((start) =>
    parseInt(sanitizedColor.substring(start, start + 2), 16),
  );

  // Calculate the complementary color, because opposites attract.
  const [compR, compG, compB] = [r, g, b].map((channel) => 255 - channel);

  // Convert RGB back to Hex, because we like to come full circle.
  const compColor = `#${[compR, compG, compB]
    .map((channel) => channel.toString(16).padStart(2, '0'))
    .join('')}`;

  return compColor;
};

export default getComplementaryColor;
