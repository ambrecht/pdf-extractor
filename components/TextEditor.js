import useSWR from 'swr';
import React, { useState } from 'react';

const fetcher = (url) => fetch(url).then((res) => res.json());

const TextEditor = ({ jsonFilePath }) => {
  const { data, error } = useSWR('/api/staticdata', fetcher);
  const [text, setText] = useState('');

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  if (data) console.log(data);

  let wordTypes = {};
  for (let key in data) {
    let words = data[key];
    words.forEach((word) => {
      wordTypes[word] = key;
    });
  }

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const markWords = (text) => {
    console.log('HIER', wordTypes);
    let words = text.split(' ');
    let markedText = words.map((word) => {
      if (wordTypes[word]) {
        return <mark key={word}>{word}</mark>;
      } else {
        return word;
      }
    });
    return markedText.join(' ');
  };

  return (
    <div>
      <textarea onChange={handleChange} value={text} />
      <div>{markWords(text)}</div>
    </div>
  );
};

export default TextEditor;
