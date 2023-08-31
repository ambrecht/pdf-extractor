const crypto = require('crypto');

/**
 * normalizeText - A function that normalizes the text by replacing multiple spaces with a single space.
 * It's like the "inciting incident" in a screenplay, setting the stage for what's to come.
 *
 * @param {string} text - The text to be normalized.
 * @returns {string} - The normalized text.
 */
const normalizeText = (text) => text.replace(/ +/g, ' ').replace(/-\s+/g, '');

/**
 * splitIntoSentences - A function that splits the text into sentences.
 * It's like the "rising action" in a screenplay, where things start to get interesting.
 *
 * @param {string} text - The text to be split.
 * @returns {Array} - An array of sentences.
 */
const splitIntoSentences = (text) =>
  text.split(/(?<=[.!?])\s+/).filter((sentence) => sentence.trim() !== '');

/**
 * createParagraphs - A function that combines sentences into paragraphs.
 * It's the "climax" of our text's journey, where all the elements come together.
 *
 * @param {Array} sentences - An array of sentences.
 * @param {number} maxWordsPerParagraph - The maximum number of words per paragraph.
 * @returns {Array} - An array of paragraphs.
 */
const createParagraphs = (sentences, maxWordsPerParagraph) => {
  const paragraphs = [];
  let currentParagraph = '';

  sentences.forEach((sentence) => {
    const combinedParagraph = `${currentParagraph} ${sentence}`;
    const wordCount = combinedParagraph.split(' ').length;

    if (wordCount <= maxWordsPerParagraph) {
      currentParagraph = combinedParagraph;
    } else {
      if (currentParagraph.trim() !== '') {
        paragraphs.push(currentParagraph.trim());
      }
      currentParagraph = sentence;
    }
  });

  if (currentParagraph.trim() !== '') paragraphs.push(currentParagraph.trim());

  return paragraphs;
};

/**
 * extractParas - A function that takes a string and returns an array of paragraph objects.
 * It's like a text's journey from chaos to order, much like a hero's journey but with fewer dragons.
 *
 * @param {string} text - The text to be transformed into paragraphs.
 * @returns {Array} - An array of paragraph objects, each with a unique ID and the paragraph text.
 */
const extractParas = async (text) => {
  const normalizedText = normalizeText(text);
  const sentences = splitIntoSentences(normalizedText);
  const maxWordsPerParagraph = 30;
  const paragraphs = createParagraphs(sentences, maxWordsPerParagraph);

  const paragraphsObjects = paragraphs.map((paragraph) => ({
    id: crypto.randomUUID(), // A unique ID, because every paragraph is special!
    paragraph: paragraph,
  }));

  return paragraphsObjects;
};

export default extractParas;
