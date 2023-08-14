import { useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
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
} from '../store/teleprompterSlice';
import estimateReadingTime from '../utils/readingTime';
import countWords from '../utils/wordCount';

const PUNCTUATION_SET = new Set(['.', ',', '!', '?', ';', ':']);

const isPunctuation = (char) => PUNCTUATION_SET.has(char);
let paused = false;
let totalPauseTime = 0;

const useTeleprompter = () => {
  const dispatch = useDispatch();

  const {
    wpm,
    index,
    isLinear,
    paragraphs,
    time,
    intervalIsRunning,
    wordCount,
    progress,
  } = useSelector((state) => state.teleprompter, shallowEqual);

  const uploadedParagraphs = useSelector(
    (state) => state.upload.response,
    shallowEqual,
  );

  const updateSelectedParagraphs = useCallback(() => {
    const selectedParagraphs = [
      uploadedParagraphs[index - 1]?.paragraph || '',
      uploadedParagraphs[index]?.paragraph || '',
      uploadedParagraphs[index + 1]?.paragraph || '',
    ];
    dispatch(setParagraphs(selectedParagraphs));
    dispatch(setTime(estimateReadingTime(selectedParagraphs[1], wpm)));
    dispatch(setWordCount(countWords(selectedParagraphs[1])));
    dispatch(setProgress(0));
  }, [uploadedParagraphs, index, wpm, dispatch]);

  useEffect(() => {
    if (uploadedParagraphs.length > 0) {
      updateSelectedParagraphs();
    }
  }, [uploadedParagraphs, index, wpm, updateSelectedParagraphs]);

  const updateIndexBasedOnMode = useCallback(() => {
    const mode = isLinear ? 'linear' : 'random';
    const newIndex =
      mode === 'linear'
        ? (index + 1) % uploadedParagraphs.length
        : Math.floor(Math.random() * uploadedParagraphs.length);
    dispatch(setIndex(newIndex));
  }, [isLinear, index, uploadedParagraphs, dispatch]);

  useEffect(() => {
    let intervalId;
    if (intervalIsRunning) {
      let startTime = Date.now();
      let delayTime = 0; // Neue Variable für die Verzögerung

      const punctuationIndices = paragraphs[1]
        .split('')
        .map((char, idx) => (isPunctuation(char) ? idx : -1))
        .filter((idx) => idx !== -1);

      const updateProgress = () => {
        const elapsedTime = (Date.now() - startTime - totalPauseTime) / 1000;
        const newProgress = (elapsedTime / time) * 100;

        const currentCharIndex = Math.floor((wordCount * newProgress) / 100);
        if (punctuationIndices.includes(currentCharIndex) && !paused) {
          paused = true;
          const delay = (60 / wpm) * 2 * 1000; // 2 Sekunden Verzögerung für jedes Satzzeichen
          setTimeout(() => {
            paused = false;
            totalPauseTime += delay; // Fügen Sie die Pausenzeit zur gesamten Pausenzeit hinzu
            intervalId = requestAnimationFrame(updateProgress);
          }, delay);
          return;
        }

        dispatch(setProgress(newProgress > 100 ? 100 : newProgress));
        if (newProgress < 100) {
          intervalId = requestAnimationFrame(updateProgress);
        } else {
          updateIndexBasedOnMode();
        }
      };
      intervalId = requestAnimationFrame(updateProgress);
    }
    return () => {
      if (intervalId) {
        cancelAnimationFrame(intervalId);
      }
    };
  }, [
    intervalIsRunning,
    time,
    wpm,
    wordCount,
    updateIndexBasedOnMode,
    dispatch,
    paragraphs,
  ]);

  const handleNewParagraph = useCallback(() => {
    dispatch(setIndex(Math.floor(Math.random() * uploadedParagraphs.length)));
  }, [uploadedParagraphs, dispatch]);

  const handleNextClick = useCallback(() => {
    if (index < uploadedParagraphs.length - 1) {
      dispatch(setIndex(index + 1));
    }
  }, [index, uploadedParagraphs, dispatch]);

  const handlePrevClick = useCallback(() => {
    if (index > 0) {
      dispatch(setIndex(index - 1));
    }
  }, [index, dispatch]);

  const toggleMode = useCallback(() => {
    dispatch(toggleLinearMode());
  }, [dispatch]);

  return {
    wpm,
    setWpm: (newWpm) => dispatch(setWpm(newWpm)),
    paragraphs,
    index,
    time,
    intervalIsRunning,
    isLinear,
    wordCount,
    progress,
    updateIndex: (newIndex) => dispatch(setIndex(newIndex)),
    toggleIntervalRunning: () => dispatch(toggleIntervalRunning()),
    handleNewParagraph,
    handleNextClick,
    handlePrevClick,
    toggleMode,
  };
};

export default useTeleprompter;
