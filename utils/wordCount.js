/**
 * countWords - A function that counts the number of words in a given text.
 * It's like counting the steps on a hero's journey, each word a footprint on the path to destiny.
 *
 * @param {string} text - The text whose words are to be counted.
 * @returns {number} - The number of words in the text.
 */
const countWords = (text) => {
  if (!text) return 0; // Guard clause for null or undefined text
  const words = text.match(/\b\w+\b/g);
  return words ? words.length : 0;
};

export default countWords;
