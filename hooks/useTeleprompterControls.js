import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { estimateReadingTime } from '../utils/readingTime';
import {
  updateIndex,
  toggleLinearMode,
  setWpm,
  toggleIntervalRunning,
  setTime,
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
    paragraphcount,
    bookID,
  } = useSelector((state) => state.teleprompter, shallowEqual);

  useEffect(() => {
    const newTime = estimateReadingTime(paragraphs[1], wpm);
    dispatch(setTime(newTime)); // <-- Dispatch the new time to the Redux store
  }, [wpm, paragraphs, dispatch]);

  const handleNewParagraph = useCallback(() => {
    console.log('handleNewParagraph', Math.random() * paragraphcount);
    dispatch(updateIndex(Math.floor(Math.random() * paragraphcount))); // Verwenden Sie updateIndex
  }, [paragraphcount, dispatch]);

  const handleNextClick = useCallback(() => {
    console.log('klick', 'count:', paragraphcount, 'index:', index);
    if (index < paragraphcount - 1) {
      dispatch(updateIndex(index + 1)); // Verwenden Sie updateIndex
    }
  }, [dispatch, index, paragraphcount]);

  const handlePrevClick = useCallback(() => {
    if (index > 0) {
      dispatch(updateIndex(index - 1)); // Verwenden Sie updateIndex
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
    paragraphs,
    time,
    wordCount,
    progress,
    bookID,
  };
};

export default useTeleprompterControls;
