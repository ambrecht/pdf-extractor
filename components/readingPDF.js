import React, { useState, useEffect } from 'react';
import TextToSpeech from './txt2speech';

const ParagraphReader = ({ data }) => {
  const [index, setIndex] = useState(0);
  const [paragraph, setParagraph] = useState(data[index]?.paragraph || '');

  const handleAudioEnd = () => {
    if (index < data.length - 1) {
      setIndex(index + 1);
      setParagraph(data[index + 1].paragraph);
    }
  };

  const jumpParagraphs = (step) => {
    let newIndex = index + step;
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= data.length) newIndex = data.length - 1;
    setIndex(newIndex);
    setParagraph(data[newIndex].paragraph);
  };

  return (
    <div>
      <p className="random-paragraph mb-4">{paragraph}</p>
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => jumpParagraphs(-10)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          10 zurück
        </button>
        <button
          onClick={() => jumpParagraphs(-1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Zurück
        </button>
        <button
          onClick={() => jumpParagraphs(1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Vor
        </button>
        <button
          onClick={() => jumpParagraphs(10)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          10 vor
        </button>
      </div>
      {paragraph && (
        <TextToSpeech
          key={index} // Hinzufügen eines Schlüssels, der sich mit dem Absatz ändert
          text={paragraph}
          voice_id={'MegJLH6AOB6VKL6gZ4JT'}
          onEnd={handleAudioEnd}
        />
      )}
    </div>
  );
};

export default ParagraphReader;
