import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateTeleprompterData,
  setIndex,
  toggleLinearMode,
  setWpm,
  setParagraphs,
  setTime,
  toggleIntervalRunning,
  setWordCount,
  setProgress,
  updateParagraphs,
} from '../store/teleprompterSlice';
import estimateReadingTime from '../utils/readingTime';
import countWords from '../utils/wordCount';

const useRandomParagraph = (data, initialWpm = 160) => {
  const dispatch = useDispatch();
  const wpm = useSelector((state) => state.teleprompter.wpm);
  const index = useSelector((state) => state.teleprompter.index);
  const isLinear = useSelector((state) => state.teleprompter.isLinear);
  const paragraphs = useSelector((state) => state.teleprompter.paragraphs);
  const time = useSelector((state) => state.teleprompter.time);
  const intervalIsRunning = useSelector(
    (state) => state.teleprompter.intervalIsRunning,
  );
  const wordCount = useSelector((state) => state.teleprompter.wordCount);
  const progress = useSelector((state) => state.teleprompter.progress);
  const uploadResponse = useSelector((state) => state.upload.response);

  // State für die verstrichene Zeit und den Fortschritt des Intervalls
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalProgress, setIntervalProgress] = useState(0);

  useEffect(() => {
    if (uploadResponse.length > 0) {
      const newIndex = isLinear ? 0 : Math.floor(Math.random() * data.length);
      dispatch(setIndex(newIndex));
    }
  }, [dispatch, isLinear, data.length, uploadResponse.length]);

  useEffect(() => {
    if (uploadResponse.length > 0) {
      const selectedParagraphs = [
        data[index - 1]?.paragraph || '',
        data[index]?.paragraph || '',
        data[index + 1]?.paragraph || '',
      ];
      console.log('inside hook', selectedParagraphs);
      dispatch(setParagraphs(selectedParagraphs));
      dispatch(setTime(estimateReadingTime(selectedParagraphs[1], wpm)));
      dispatch(setWordCount(countWords(selectedParagraphs[1])));
      dispatch(setProgress(0));
    }
  }, [index, wpm, data, dispatch, uploadResponse]);

  useEffect(() => {
    // Logik für das Intervall
    if (intervalIsRunning) {
      const startTime = Date.now(); // Record the start time

      const interval = setInterval(() => {
        const currentTime = Date.now(); // Get the current time
        const elapsedSeconds = (currentTime - startTime) / 1000; // Calculate elapsed time in seconds
        const newProgress = (elapsedSeconds / time) * 100; // Calculate interval progress

        // Set interval progress using Redux action
        dispatch(setProgress(newProgress > 100 ? 100 : newProgress));

        // Set interval progress using local state (if needed)
        setIntervalProgress(newProgress > 100 ? 100 : newProgress);
        // Clear interval when progress reaches 100
        if (newProgress >= 100) {
          clearInterval(interval);
          if (isLinear) {
            dispatch(setIndex((index + 1) % data.length));
          } else {
            dispatch(setIndex(Math.floor(Math.random() * data.length)));
          }
        }
      }, 500);

      return () => {
        clearInterval(interval);

        // Reset interval progress using Redux action
        dispatch(setProgress(0));
        // Reset interval progress using local state (if needed)
        setIntervalProgress(0);
      };
    }
  }, [data.length, dispatch, index, intervalIsRunning, isLinear, time]);

  const toggleLinearModeHandler = () => {
    dispatch(toggleLinearMode());
  };

  const handleNewParagraph = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    dispatch(setIndex(randomIndex));
  };

  const handleNextClick = () => {
    if (index < data.length - 1) {
      dispatch(setIndex(index + 1));
    }
  };

  const handlePrevClick = () => {
    if (index > 0) {
      dispatch(setIndex(index - 1));
    }
  };

  const handleIntervalToggle = () => {
    dispatch(toggleIntervalRunning());
  };

  const updateTeleprompterDataHandler = () => {
    dispatch(updateTeleprompterData(data, wpm, index));
  };
  return {
    // Rückgabe der benötigten Zustände und Funktionen
    wpm,
    setWpm: (newWpm) => dispatch(setWpm(newWpm)),
    paragraphs,
    index,
    time,
    intervalIsRunning,
    isLinear,
    wordCount,
    progress,
    elapsedTime,
    intervalProgress,
    updateIndex: (newIndex) => dispatch(setIndex(newIndex)),
    updateTeleprompterData: () =>
      dispatch(updateTeleprompterData(data, wpm, index)),
    toggleIntervalRunning: handleIntervalToggle,
    toggleLinearMode: toggleLinearModeHandler,
    setWordCount: (count) => dispatch(setWordCount(count)),
    setProgress: (progress) => dispatch(setProgress(progress)),
    handleNewParagraph,
    handleNextClick,
    handlePrevClick,
    updateTeleprompterDataHandler,
  };
};

export default useRandomParagraph;
