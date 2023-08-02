const estimateReadingTime = (text, wordsPerMinute) => {
  if (
    typeof text !== 'string' ||
    typeof wordsPerMinute !== 'number' ||
    wordsPerMinute <= 0
  ) {
    throw new Error('Invalid input');
  }

  const words = text.match(/\b[\w'-]+\b/g); // Findet alle Wörter, einschließlich Zahlen und Bindestriche
  const wordCount = words ? words.length : 0;
  const sentenceCount = text.match(/[.!?]/g)?.length || 0; // Zählt die Sätze
  const pauseTime = sentenceCount * 0.5; // Schätzt die Pausenzeit in Sekunden

  const minutes = wordCount / wordsPerMinute;
  const seconds = minutes * 60 + pauseTime;
  console.log(wordCount, Math.ceil(seconds));

  return Math.ceil(seconds);
};

export default estimateReadingTime;
