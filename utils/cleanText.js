// textUtils.js

export const cleanText = (texts) => {
  const maxLineLength = 80;
  const cleanedTexts = [];

  texts.forEach((text) => {
    text = text.replace(/\s+/g, ' ').trim();
    text = text.replace(/<[^>]*>/g, '');
    text = text.replace(/\[\d+\]/g, '');

    const lines = [];
    let line = '';
    text.split(' ').forEach((word) => {
      if (line.length + word.length > maxLineLength) {
        lines.push(line);
        line = '';
      }
      line += (line ? ' ' : '') + word;
    });
    if (line) lines.push(line);
    cleanedTexts.push(lines.join('\n'));
  });

  return cleanedTexts;
};
