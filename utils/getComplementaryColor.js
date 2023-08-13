const getComplementaryColor = (color) => {
  if (color.charAt(0) === '#') {
    color = color.slice(1);
  }

  // Umwandlung von Hex in RGB
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);

  // Berechnung des komplementären Farbwerts
  const compR = 255 - r;
  const compG = 255 - g;
  const compB = 255 - b;

  // Umwandlung von RGB zurück in Hex
  const compColor = `#${compR.toString(16).padStart(2, '0')}${compG
    .toString(16)
    .padStart(2, '0')}${compB.toString(16).padStart(2, '0')}`;

  return compColor;
};

export default getComplementaryColor;
