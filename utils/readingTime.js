/**
 * A function that estimates the reading time for a given text, considering the average reading speed and pause times for punctuation marks.
 *
 * @param {string} text - The text whose reading time is to be estimated.
 * @param {number} wordsPerMinute - The average reading speed in words per minute.
 * @param {Object} pauseTimes - An object mapping punctuation marks to pause times in seconds.
 * @returns {number} - The estimated reading time in seconds.
 */
export const estimateReadingTime = (
  text,
  wordsPerMinute,
  pauseTimes = { '.': 0.2, ',': 0.1, '!': 0.2, '?': 0.2 },
) => {
  if (!validateInputs(text, wordsPerMinute)) {
    console.warn(
      'Oh dear, it seems you have entered an invalid input. How utterly disappointing.',
    );
    return 0;
  }

  const wordCount = countWords(text);
  const pauseTime = calculatePauseTime(text, pauseTimes);

  return calculateReadingTime(wordCount, wordsPerMinute, pauseTime);
};

/**
 * Validates the inputs for the estimateReadingTime function.
 *
 * @param {string} text - The text to be validated.
 * @param {number} wordsPerMinute - The words per minute value to be validated.
 * @returns {boolean} - Returns true if the inputs are valid, otherwise false.
 */
const validateInputs = (text, wordsPerMinute) => {
  return (
    typeof text === 'string' &&
    typeof wordsPerMinute === 'number' &&
    wordsPerMinute > 0
  );
};

/**
 * Counts the number of words in a text.
 *
 * @param {string} text - The text whose words are to be counted.
 * @returns {number} - The number of words in the text.
 */
const countWords = (text) => {
  const words = text.match(/\b[\w'-]+\b/g) || [];
  return words.length;
};

/**
 * Calculates the total pause time based on the occurrence of punctuation marks in the text.
 *
 * @param {string} text - The text in which to calculate the pause time.
 * @param {Object} pauseTimes - An object mapping punctuation marks to pause times in seconds.
 * @returns {number} - The total pause time in seconds.
 */
const calculatePauseTime = (text, pauseTimes) => {
  return Object.entries(pauseTimes).reduce((acc, [punctuation, time]) => {
    const count = (text.match(new RegExp(`\\${punctuation}`, 'g')) || [])
      .length;
    return acc + count * time;
  }, 0);
};

/**
 * Calculates the total reading time based on the word count and pause time.
 *
 * @param {number} wordCount - The number of words in the text.
 * @param {number} wordsPerMinute - The average reading speed in words per minute.
 * @param {number} pauseTime - The total pause time in seconds.
 * @returns {number} - The total reading time in seconds.
 */
const calculateReadingTime = (wordCount, wordsPerMinute, pauseTime) => {
  const minutes = wordCount / wordsPerMinute;
  const seconds = minutes * 60 + pauseTime;
  return Math.ceil(seconds);
};
