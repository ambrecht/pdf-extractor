import React, { useState } from 'react';
import ldv from 'de-compromise';
import styled from 'styled-components';

const StyledTextEditor = styled.div`
  text-align: center;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.75);
`;

const HighlightedText = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: bold;
`;

const TextEditor = ({ paragraph }) => {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const colorMap = new Map([
    ['Adverb', 'grey'],
    ['Adjective', 'green'],
    ['Noun', 'red'],
    ['Verb', 'tomato'],
    ['Pronoun', 'purple'],
    ['Determiner', 'orange'],
    ['Preposition', 'pink'],
    ['Conjunction', 'grey'],
    ['Interjection', 'grey'],

    // and so on...
  ]);

  const highlightWords = (text) => {
    const doc = ldv(text);
    const terms = doc.termList();
    let highlightedText = text;

    terms.forEach((term) => {
      term.tags.forEach((tag) => {
        if (colorMap.has(tag)) {
          highlightedText = highlightedText.replace(
            new RegExp(term.text, 'g'),
            `<span style="color: ${colorMap.get(tag)};">${term.text}</span>`,
          );
        }
      });
    });

    return highlightedText;
  };

  return (
    <StyledTextEditor>
      <HighlightedText
        dangerouslySetInnerHTML={{ __html: highlightWords(paragraph) }}
      />
    </StyledTextEditor>
  );
};

export default TextEditor;
