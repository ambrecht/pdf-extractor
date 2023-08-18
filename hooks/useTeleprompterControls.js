import { useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import {
  updateTeleprompterData,
  setIndex,
  toggleLinearMode,
  setWpm,
  setParagraphs,
  setTime,
  toggleIntervalRunning,
  intervalIsRunning,
  setWordCount,
  setProgress,
} from '../store/teleprompterSlice';

const useTeleprompterControls = () => {
  const dispatch = useDispatch();

  // Zustand innerhalb des Hooks abrufen
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

  const uploadedParagraphs = useSelector((state) => state.upload.response);

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
    index,
    isLinear,
    toggleIntervalRunning: () => dispatch(toggleIntervalRunning()),
    handleNewParagraph,
    handleNextClick,
    handlePrevClick,
    toggleMode,
    intervalIsRunning,
  };
};

export default useTeleprompterControls;
