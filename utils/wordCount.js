const countWords = (text) => {
  const words = text.match(/\b\w+\b/g);
  return words ? words.length : 0;
};

export default countWords;
