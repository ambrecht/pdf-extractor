const estimateReadingTime = (
  text,
  wordsPerMinute,
  pauseTimes = { '.': 0.5, ',': 0.25, '!': 0.5, '?': 0.5 },
) => {
  if (
    typeof text !== 'string' ||
    typeof wordsPerMinute !== 'number' ||
    wordsPerMinute <= 0
  ) {
    console.warn('Invalid input');
    return 0;
  }

  const words = text.match(/\b[\w'-]+\b/g);
  const wordCount = words ? words.length : 0;

  let pauseTime = 0;
  for (const punctuation in pauseTimes) {
    const count = text.match(new RegExp(`\\${punctuation}`, 'g'))?.length || 0;
    pauseTime += count * pauseTimes[punctuation];
  }

  const minutes = wordCount / wordsPerMinute;
  const seconds = minutes * 60 + pauseTime;
  console.log(wordCount, Math.ceil(seconds));

  return Math.ceil(seconds);
};

export default estimateReadingTime;
