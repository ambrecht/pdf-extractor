import { useCallback } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
  updateIndex,
  toggleLinearMode,
  setWpm,
  toggleIntervalRunning,
} from '../store/teleprompterSlice';

const useTeleprompterControls = () => {
  console.log('control hook loded');
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
