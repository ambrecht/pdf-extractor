import React, { useState, useEffect } from 'react';
import wordcloud from 'wink-wordcloud';
const WordCloud = ({ file }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const extractWordsFromPdf = async () => {
      // Convert PDF to text using Wink-JS
      const pdfText = await wordcloud.text.pdf2txt(file);
      // Extract words from the text using Wink-JS
      const words = await wordcloud.terms.extractTerms(pdfText);
      // Set the extracted words as state
      setData(words);
    };
    extractWordsFromPdf();
  }, [file]);
  return (
    <div>{data ? <wordcloud.Renderer words={data} /> : <p>Loading...</p>}</div>
  );
};
export default WordCloud;
