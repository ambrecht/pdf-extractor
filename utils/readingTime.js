const estimateReadingTime = (text, wordsPerMinute) => {
  const words = text.match(/\b[a-zA-Z]+\b/g); // Findet alle Wörter, die nur Buchstaben enthalten
  const wordCount = words ? words.length : 0; // Zählt die Wörter im Text
  const minutes = wordCount / wordsPerMinute; // Berechnet die Minuten
  const seconds = minutes * 60; // Konvertiert die Minuten in Sekunden
  return Math.ceil(seconds); // Rundet auf die nächste ganze Sekunde auf
};

export default estimateReadingTime;
