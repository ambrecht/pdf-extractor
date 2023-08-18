// teleprompterUtils.js

export const updateIndexBasedOnMode = (
  isLinear,
  index,
  uploadedParagraphsLength,
) => {
  const mode = isLinear ? 'linear' : 'random';
  const newIndex =
    mode === 'linear'
      ? (index + 1) % uploadedParagraphsLength
      : Math.floor(Math.random() * uploadedParagraphsLength);
  return newIndex;
};
