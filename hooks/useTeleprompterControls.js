import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setWpm,
  setIndex,
  toggleLinearMode,
  toggleIntervalRunning,
} from '../store/teleprompterSlice';

const useTeleprompterControls = () => {
  const dispatch = useDispatch();
  const { wpm, index, isLinear, uploadedParagraphs } = useSelector(
    (state) => state.teleprompter,
  );

  const handleNewParagraph = useCallback(() => {
    dispatch(setIndex(Math.floor(Math.random() * uploadedParagraphs.length)));
  }, [uploadedParagraphs, dispatch]);

  const handleNextClick = useCallback(() => {
    console.log('inside');
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
  };
};

export default useTeleprompterControls;
