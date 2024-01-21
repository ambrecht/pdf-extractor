import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TextToSpeech from './elevenlabs';
import estimateReadingTime from '../utils/readingTime';
const RandomParagraph = ({ data }) => {
  const [paragraph, setParagraph] = useState('');
  const [intervalId, setIntervalId] = useState(null);
  const [intervalIsRunning, setIntervalIsRunning] = useState(false);
  const [index, setIndex] = useState(null);
  const [history, setHistory] = useState([]);
  const [time, setTime] = useState(5);
  const [isLinear, setIsLinear] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [wpm, setWpm] = useState(160);
  // 1. When the component mounts, set the paragraph state to a random paragraph
  useEffect(() => {
    let randomIndex = Math.floor(Math.random() * data.length);
    let rawpara = data[randomIndex].paragraph;
    setParagraph(rawpara);
    setIndex(randomIndex);
  }, []); // Entfernen Sie wpm aus der Abhängigkeitsliste
  // Neuer Hook, der nur auf Änderungen der wpm-Variable reagiert
  useEffect(() => {
    setTime(estimateReadingTime(paragraph, wpm));
  }, [wpm]);
  // 2. When the intervalIsRunning state changes, start or stop the interval
  useEffect(() => {
    if (intervalIsRunning) {
      setTime(estimateReadingTime(paragraph, wpm));
      let currentIndex = index;
      const id = setInterval(() => {
        if (isLinear) {
          currentIndex = (currentIndex + 1) % data.length;
        } else {
          currentIndex = Math.floor(Math.random() * data.length);
        }
        setParagraph(data[currentIndex].paragraph);
        setIndex(currentIndex);
        setHistory([...history, currentIndex]);
      }, time * 1000);
      setIntervalId(id);
      return () => clearInterval(id);
    }
  }, [intervalIsRunning, time, data, history, isLinear, index, wpm]);
  const handleIntervalChange = (event) => {
    setTime(event.target.value);
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    // Diese Funktion wird aufgerufen, wenn die Komponente unmountet. Sie entfernt den Event Listener, um Memory Leaks zu verhindern
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  const handleKeyDown = (event) => {
    if (event.keyCode === 39) {
      // Pfeiltaste nach rechts
      handleNextClick(); // Zum nächsten Absatz wechseln
    } else if (event.keyCode === 37) {
      // Pfeiltaste nach links
      handlePrevClick(); // Zum vorherigen Absatz wechseln
    }
  };
  // 3. A function that generates a new random paragraph and sets the paragraph state
  const handleNewParagraph = () => {
    setParagraph(getRandomParagraph());
  };
  // 4. A function that returns a random paragraph from the data array
  const getRandomParagraph = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    setIndex(randomIndex);
    setHistory([...history, randomIndex]);
    return `1 ${data[randomIndex].paragraph}, 2 ${
      data[randomIndex + 1].paragraph
    }, 3 ${data[randomIndex + 2].paragraph}`;
  };
  // 5. A function that starts the interval
  const handleIntervalToggle = () => {
    setIntervalIsRunning((prev) => !prev);
  };
  // 6. A function that sets the index state to the next paragraph in the array
  const handleNextClick = () => {
    if (index < data.length - 1) {
      setParagraph(data[index + 1].paragraph);
      setIndex(index + 1);
      setHistory([...history, index + 1]);
    }
  };
  // 7. A function that sets the index state to the previous paragraph in the array
  const handlePrevClick = () => {
    if (index > 0) {
      setParagraph(data[index - 1].paragraph);
      setIndex(index - 1);
      setHistory([...history, index - 1]);
    }
  };
  const teleprompterStyle = {
    animation: intervalIsRunning
      ? `teleprompterScroll ${time}s linear infinite`
      : 'none',
  };
  return (
    <div className="flex flex-col h-full">
      <div className="overflow-y-scroll flex-grow">
        {data.slice(index - 1, index + 2).map((item, idx) => (
          <p
            key={idx}
            className={`text-5xl font-semibold text-center my-8 mx-10 leading-relaxed transition-opacity duration-5000 ${
              idx === 1 ? 'opacity-100' : 'opacity-50 text-gray-400'
            }`}
          >
            {item.paragraph}
          </p>
        ))}
      </div>
      <div className="bg-white p-4 shadow-md">
        <div className="flex flex-wrap justify-center space-x-2">
          <button
            onClick={handleNewParagraph}
            className="text-lg p-2 rounded bg-blue-500 text-white hover:bg-blue-400"
          >
            New Paragraph
          </button>
          <button
            onClick={handleIntervalToggle}
            className="text-lg p-2 rounded bg-blue-500 text-white hover:bg-blue-400"
          >
            {intervalIsRunning ? 'Stop Interval' : 'Start Interval'}
          </button>
          <button
            onClick={() => setIsLinear(!isLinear)}
            className="text-lg p-2 rounded bg-blue-500 text-white hover:bg-blue-400"
          >
            {isLinear ? 'Deactivate Linear' : 'Activate Linear'}
          </button>
          <button
            onClick={handlePrevClick}
            className="text-lg p-2 rounded bg-green-500 text-white hover:bg-green-400"
          >
            Zurück
          </button>
          <button
            onClick={handleNextClick}
            className="text-lg p-2 rounded bg-green-500 text-white hover:bg-green-400"
          >
            Vor
          </button>
          <button
            onClick={() => navigator.clipboard.writeText(paragraph)}
            className="text-lg p-2 rounded bg-green-500 text-white hover:bg-green-400"
          >
            Kopie
          </button>
          <label className="text-lg p-2">Words per Minute:</label>
          <input
            type="number"
            min="50"
            max="1000"
            value={wpm}
            onChange={(e) => setWpm(e.target.value)}
            className="text-lg p-2 border rounded"
          />
          <h1 className="text-lg p-2 rounded bg-green-500 text-white hover:bg-green-400">
            Sekunden{time}
          </h1>
        </div>
      </div>
      <style>
        {`
          @keyframes teleprompterScroll {
            from {
              transform: translateY(0);
            }
            to {
              transform: translateY(-100%);
            }
          }
        `}
      </style>
    </div>
  );
};
export default RandomParagraph;

