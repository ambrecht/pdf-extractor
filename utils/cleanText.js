/**
 * cleanText - Cleans and formats an array of text strings.
 *
 * @param {Array} texts - An array of text strings to clean and format.
 * @returns {Array} - An array of cleaned and formatted text strings.
 */
export const cleanText = (texts) => {
  const maxLineLength = 80;

  /**
   * cleanString - Cleans a single string by removing extra spaces, HTML tags, and references.
   *
   * @param {string} str - The string to clean.
   * @returns {string} - The cleaned string.
   */
  const cleanString = (str) =>
    str
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/<[^>]*>/g, '')
      .replace(/\[\d+\]/g, '');

  /**
   * splitIntoLines - Splits a string into lines based on the maximum line length.
   *
   * @param {string} str - The string to split.
   * @returns {string} - The string split into lines.
   */
  const splitIntoLines = (str) => {
    const words = str.split(' ');
    const lines = [];
    let line = '';

    words.forEach((word) => {
      if (line.length + word.length > maxLineLength) {
        lines.push(line);
        line = '';
      }
      line += (line ? ' ' : '') + word;
    });

    if (line) lines.push(line);

    return lines.join('\n');
  };

  return texts
    .filter((text) => typeof text === 'string') // Überprüfen, ob der Text ein String ist
    .map(cleanString)
    .map(splitIntoLines);
};
