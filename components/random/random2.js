import React, { useState, useEffect } from 'react';

const RandomParagraph = ({ data }) => {
  const [paragraph, setParagraph] = useState(null);
  const [index, setIndex] = useState(null);
  const [intervalIsRunning, setIntervalIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * data.length);
    setParagraph(data[randomIndex].paragraph);
    setIndex(randomIndex);
  }, []);

  useEffect(() => {
    if (intervalIsRunning) {
      const id = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * data.length);
        setParagraph(data[randomIndex].paragraph);
        setIndex(randomIndex);
      }, 10000);
      setIntervalId(id);
      return () => clearInterval(id);
    }
  }, [intervalIsRunning]);

  const handleIntervalToggle = () => {
    setIntervalIsRunning((prev) => !prev);
  };

  const handleVorZuruck = (direction) => {
    switch (direction) {
      case 'For':
        setParagraph(data[index + 1].paragraph) && setIndex(index + 1);
        break;

      case 'Back':
        setParagraph(data[index - 1].paragraph) && setIndex(index - 1);
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <p className="random-paragraph">{paragraph}</p>
      {paragraph && (
        <>
          <button
            onClick={() => {
              const randomIndex = Math.floor(Math.random() * data.length);
              setParagraph(data[randomIndex].paragraph);
              setIndex(randomIndex);
            }}
          >
            New Paragraph
          </button>
          <button onClick={handleIntervalToggle}>
            {intervalIsRunning ? 'Stop Interval' : 'Start Interval'}
          </button>
          <button onClick={() => handleVorZuruck('For')}>Vor</button>
          <button onClick={() => handleVorZuruck('Back')}>Zurück</button>
        </>
      )}
    </div>
  );
};

export default RandomParagraph;
