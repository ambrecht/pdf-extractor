import { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { setProgress, setIndex } from '../store/teleprompterSlice';

const PUNCTUATION_SET = new Set(['.', ',', '!', '?', ';', ':']);
const isPunctuation = (char) => PUNCTUATION_SET.has(char);
let paused = false;
let totalPauseTime = 0;

const useProgressUpdate = (updateIndexBasedOnMode) => {
  const dispatch = useDispatch();
  const {
    intervalIsRunning,
    time,
    wpm,
    wordCount,
    paragraphs,
    index,
    isLinear,
  } = useSelector((state) => state.teleprompter);

  const uploadedParagraphsLength = useSelector(
    (state) => state.upload.response.length,
    shallowEqual,
  );

  useEffect(() => {
    let intervalId;
    if (intervalIsRunning) {
      console.log('running');
      let startTime = Date.now();
      let delayTime = 0;

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
          const delay = (60 / wpm) * 2 * 1000;
          setTimeout(() => {
            paused = false;
            totalPauseTime += delay;
            intervalId = requestAnimationFrame(updateProgress);
          }, delay);
          return;
        }

        dispatch(setProgress(newProgress > 100 ? 100 : newProgress));
        if (newProgress >= 100) {
          updateIndexBasedOnMode(index, isLinear, uploadedParagraphsLength);
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
    index,
    isLinear,
    uploadedParagraphsLength,
  ]);
};

export default useProgressUpdate;
