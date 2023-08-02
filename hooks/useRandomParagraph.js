import { useState, useEffect } from 'react';
import estimateReadingTime from '../utils/readingTime';
import countWords from '../utils/wordCount';

const useRandomParagraph = (data, initialWpm = 160) => {
  const [wpm, setWpm] = useState(initialWpm);
  const [paragraphs, setParagraphs] = useState([]);
  const [index, setIndex] = useState(null);
  const [time, setTime] = useState(5);
  const [intervalIsRunning, setIntervalIsRunning] = useState(false);
  const [isLinear, setIsLinear] = useState(true);
  const [wordCount, setWordCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [fontSize, setFontSize] = useState('text-5xl');
  const [fontColor, setFontColor] = useState('gray');

  useEffect(() => {
    const newIndex = isLinear ? 0 : Math.floor(Math.random() * data.length);
    setIndex(newIndex);
  }, [isLinear, data.length]);

  useEffect(() => {
    if (index !== null) {
      const selectedParagraphs = [
        data[index - 1]?.paragraph || '',
        data[index]?.paragraph || '',
        data[index + 1]?.paragraph || '',
      ];
      setParagraphs(selectedParagraphs);
      setTime(estimateReadingTime(selectedParagraphs[1], wpm));
      setWordCount(countWords(selectedParagraphs[1]));
      setProgress(0); // Fortschritt zurücksetzen, wenn sich der mittlere Absatz ändert
    }
  }, [index, wpm, data]);

  useEffect(() => {
    if (intervalIsRunning) {
      let currentIndex = index;
      const id = setInterval(() => {
        if (isLinear) {
          currentIndex = (currentIndex + 1) % data.length;
        } else {
          currentIndex = Math.floor(Math.random() * data.length);
        }
        setIndex(currentIndex);
      }, time * 1000);

      return () => clearInterval(id);
    }
  }, [intervalIsRunning, time, data, isLinear, index]);

  useEffect(() => {
    if (intervalIsRunning) {
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsedTime = (Date.now() - startTime) / 1000; // Verstrichene Zeit in Sekunden
        const newProgress = (elapsedTime / (time - 1)) * 100; // Fortschritt basierend auf der verstrichenen Zeit
        setProgress(newProgress > 100 ? 100 : newProgress);
      }, 1000 / 60);

      return () => clearInterval(interval);
    }
  }, [intervalIsRunning, time]);

  const handleNewParagraph = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    setIndex(randomIndex);
  };

  const handleNextClick = () => {
    if (index < data.length - 1) {
      setIndex(index + 1);
    }
  };

  const handlePrevClick = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleIntervalToggle = () => {
    setIntervalIsRunning((prev) => !prev);
  };

  return {
    paragraphs,
    time,
    wpm,
    setWpm,
    handleNewParagraph,
    handleIntervalToggle,
    handleNextClick,
    handlePrevClick,
    intervalIsRunning,
    isLinear,
    setIsLinear,
    wordCount,
    progress,
    fontSize, // Hinzugefügt
    setFontSize, // Hinzugefügt
    fontColor, // Hinzugefügt
    setFontColor, // Hinzugefügt
  };
};

export default useRandomParagraph;
