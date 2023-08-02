import { useState, useEffect } from 'react';
import estimateReadingTime from '../utils/readingTime';

const useRandomParagraph = (data, initialWpm = 160) => {
  // Zustand für die Wörter pro Minute (wpm)
  const [wpm, setWpm] = useState(initialWpm);
  // Zustand für die drei Absätze, die angezeigt werden sollen
  const [paragraphs, setParagraphs] = useState([]);
  // Zustand für den aktuellen Index des ausgewählten Absatzes
  const [index, setIndex] = useState(null);
  // Zustand für die geschätzte Lesezeit
  const [time, setTime] = useState(5);
  // Zustand für das Intervall (ob es läuft oder nicht)
  const [intervalIsRunning, setIntervalIsRunning] = useState(false);
  // Zustand für den linearen Modus (ob aktiviert oder nicht)
  const [isLinear, setIsLinear] = useState(false);

  // Wenn die Komponente eingehängt wird, setze den Absatz auf einen zufälligen Absatz
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * data.length);
    setIndex(randomIndex);
  }, []);

  // Aktualisiere die Absätze und die geschätzte Lesezeit, wenn sich der Index oder die Wörter pro Minute (wpm) ändern
  useEffect(() => {
    if (index !== null) {
      const selectedParagraphs = [
        data[index - 1]?.paragraph || '',
        data[index]?.paragraph || '',
        data[index + 1]?.paragraph || '',
      ];
      setParagraphs(selectedParagraphs);
      setTime(estimateReadingTime(selectedParagraphs[1], wpm));
    }
  }, [index, wpm, data]);

  // Intervalllogik, die den aktuellen Absatz und Index basierend auf den Einstellungen aktualisiert
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

  // Funktion zum Abrufen eines neuen zufälligen Absatzes
  const handleNewParagraph = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    setIndex(randomIndex);
  };

  // Funktion zum Wechseln zum nächsten Absatz
  const handleNextClick = () => {
    if (index < data.length - 1) {
      setIndex(index + 1);
    }
  };

  // Funktion zum Wechseln zum vorherigen Absatz
  const handlePrevClick = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  // Funktion zum Umschalten des Intervalls
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
  };
};

export default useRandomParagraph;
