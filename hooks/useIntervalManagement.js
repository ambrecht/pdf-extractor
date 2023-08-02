import { useState, useEffect } from 'react';
import estimateReadingTime from '../utils/readingTime'; // Stellen Sie sicher, dass der Pfad korrekt ist

const useIntervalManagement = (
  paragraph,
  wpm,
  data,
  history,
  isLinear,
  index,
) => {
  const [intervalId, setIntervalId] = useState(null);
  const [intervalIsRunning, setIntervalIsRunning] = useState(false);
  const [time, setTime] = useState(5);

  useEffect(() => {
    setTime(estimateReadingTime(paragraph, wpm));
  }, [wpm]);

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
        // Hier können Sie den aktuellen Absatz und Index aktualisieren
        // z.B. setParagraph(data[currentIndex].paragraph);
        // setIndex(currentIndex);
        // setHistory([...history, currentIndex]);
      }, time * 1000);

      setIntervalId(id);
      return () => clearInterval(id);
    }
  }, [intervalIsRunning, time, data, history, isLinear, index, wpm]);

  return [intervalIsRunning, setIntervalIsRunning, time, setTime];
};

export default useIntervalManagement;
