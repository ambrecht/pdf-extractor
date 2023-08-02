const crypto = require('crypto');

const extractParas = (text: string) => {
  // Ersetzen Sie mehrere Leerzeichen durch ein einzelnes Leerzeichen, behalten Sie aber Zeilenumbrüche bei
  text = text.replace(/ +/g, ' ').replace(/-\s+/g, '');

  // Teilen Sie den Text an Satzzeichen auf, behalten Sie aber Dialogzeichen und Zeilenumbrüche bei
  const sentences = text.split(/(?<=[.!?])\s+/);

  // Maximale Wörter pro Absatz
  const maxWordsPerParagraph = 30;

  // Zusammenführen von Sätzen zu Paragraphen, wobei die maximale Wortanzahl pro Absatz berücksichtigt wird
  const paragraphs = [];
  let currentParagraph = '';
  sentences.forEach((sentence) => {
    const combinedParagraph = currentParagraph + ' ' + sentence;
    const wordCount = combinedParagraph.split(' ').length;

    if (wordCount <= maxWordsPerParagraph) {
      currentParagraph = combinedParagraph;
    } else {
      paragraphs.push(currentParagraph.trim());
      currentParagraph = sentence;
    }
  });

  // Füge den letzten Absatz hinzu, falls vorhanden
  if (currentParagraph) paragraphs.push(currentParagraph.trim());

  // Erstelle ein Array von Objekten, jedes mit einer eindeutigen ID und dem formatierten Absatz
  const paragraphsObjects = paragraphs.map((paragraph) => ({
    id: crypto.randomUUID(),
    paragraph: paragraph,
  }));

  return paragraphsObjects;
};

export default extractParas;
