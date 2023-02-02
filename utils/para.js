const R = require('ramda');
const crypto = require('crypto');

//Eine Funktion die den Text in Absätze aufteilt und diese in einem Array zurückgibt,
//!!ein Absatz hat mindestens 3 Sätze und maximal 100 Wörter!!

const splitText = (text) => {
  const sentences = text.split(/[.!?]+/);
  let currentChunk = [];
  let chunks = [];
  sentences.forEach((sentence) => {
    const words = sentence.split(' ');
    if (currentChunk.length + words.length <= 30) {
      currentChunk = currentChunk.concat(words);
      if (sentence.match(/[A-Z][a-z].([A-Z][a-z].)+$/)) {
        currentChunk.push('.');
      }
    } else {
      chunks.push(currentChunk.join(' '));
      currentChunk = words;
    }
  });
  chunks.push(currentChunk.join(' '));
  return chunks;
};

async function extractParas(text) {
  const paragraphs = splitText(text);
  // Erstelle ein Array von Objekten, jedes mit einem einzelnen Satz
  const sanitizeSentence = R.pipe(
    R.replace(/\r?\n|\r/g, ' '),
    R.replace(/\t/g, ' '),
  );

  const paragraphsObjects = R.map(
    (paragraph, index) => ({
      id: crypto.randomUUID({ disableEntropyCache: true }),
      paragraph: paragraph,
    }),
    paragraphs,
  );

  return paragraphsObjects;
}

export default extractParas;
