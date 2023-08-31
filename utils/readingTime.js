/**
 * Estimates the reading time for a given text.
 *
 * @param {string} text - The text to be read.
 * @param {number} wordsPerMinute - The average reading speed in words per minute.
 * @param {Object} pauseTimes - An object mapping punctuation marks to pause times in seconds.
 * @returns {number} The estimated reading time in seconds.
 */
export const estimateReadingTime = (
  text,
  wordsPerMinute,
  pauseTimes = { '.': 0.5, ',': 0.25, '!': 0.5, '?': 0.5 },
) => {
  // Let's be adults and validate our inputs, shall we?
  if (
    typeof text !== 'string' ||
    typeof wordsPerMinute !== 'number' ||
    wordsPerMinute <= 0
  ) {
    console.warn('Invalid input. I expected better from you.');
    return 0;
  }

  // Counting words like a poet contemplating the essence of each syllable.
  const words = text.match(/\b[\w'-]+\b/g) || [];
  const wordCount = words.length;

  // Calculating pause time, because even speed readers need to breathe.
  const pauseTime = Object.entries(pauseTimes).reduce(
    (acc, [punctuation, time]) => {
      const count =
        text.match(new RegExp(`\\${punctuation}`, 'g'))?.length || 0;
      return acc + count * time;
    },
    0,
  );

  // Ah, the grand finale. The moment of truth.
  const minutes = wordCount / wordsPerMinute;
  const seconds = minutes * 60 + pauseTime;

  console.log(
    `Estimated reading time: ${Math.ceil(
      seconds,
    )} seconds. Plan your life accordingly.`,
  );

  return Math.ceil(seconds);
};
