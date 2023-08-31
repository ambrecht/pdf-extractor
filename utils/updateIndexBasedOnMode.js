/**
 * getLinearIndex - A function that calculates the next index in linear mode.
 *
 * @param {number} index - The current index.
 * @param {number} length - The total number of paragraphs.
 * @returns {number} - The next index in linear mode.
 */
const getLinearIndex = (index, length) => (index + 1) % length;

/**
 * getRandomIndex - A function that calculates a random index.
 *
 * @param {number} length - The total number of paragraphs.
 * @returns {number} - A random index.
 */
const getRandomIndex = (length) => Math.floor(Math.random() * length);

/**
 * updateIndexBasedOnMode - A function that updates the index based on the mode (linear or random).
 * It's like choosing the narrative structure of a screenplay, linear like a classic hero's journey or random like a Tarantino film.
 *
 * @param {boolean} isLinear - Whether the mode is linear.
 * @param {number} index - The current index.
 * @param {number} uploadedParagraphsLength - The total number of uploaded paragraphs.
 * @returns {number} - The updated index.
 */
export const updateIndexBasedOnMode = (
  isLinear,
  index,
  uploadedParagraphsLength,
) => {
  return isLinear
    ? getLinearIndex(index, uploadedParagraphsLength)
    : getRandomIndex(uploadedParagraphsLength);
};
