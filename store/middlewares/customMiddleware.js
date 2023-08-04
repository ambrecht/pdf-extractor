import estimateReadingTime from '../utils/readingTime';
import countWords from '../utils/wordCount';
import {
  updateParagraphsAndTime,
  setIndex,
  setHistory,
  updateProgress,
} from './actions'; // Importieren Sie die fehlenden Aktionsersteller

export const updateParagraphsAndProgress = () => (dispatch, getState) => {
  const state = getState(); // Zugriff auf den Zustand direkt, ohne .teleprompter
  const { index, wpm, data, intervalIsRunning, time } = state;

  if (index !== null) {
    const selectedParagraphs = [
      data[index - 1]?.paragraph || '',
      data[index]?.paragraph || '',
      data[index + 1]?.paragraph || '',
    ];
    const newTime = estimateReadingTime(selectedParagraphs[1], wpm);
    const wordCount = countWords(selectedParagraphs[1]);
    dispatch(
      updateParagraphsAndTime({
        paragraphs: selectedParagraphs,
        time: newTime,
        wordCount,
        progress: 0,
      }),
    );
  }

  if (intervalIsRunning) {
    let currentIndex = index;
    const id = setInterval(() => {
      if (state.isLinear) {
        currentIndex = (currentIndex + 1) % data.length;
      } else {
        currentIndex = Math.floor(Math.random() * data.length);
      }
      dispatch(setIndex({ index: currentIndex }));
      dispatch(setHistory({ history: [...state.history, currentIndex] }));
    }, time * 1000);

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsedTime = (Date.now() - startTime) / 1000;
      const newProgress = (elapsedTime / (time - 1)) * 100;
      dispatch(
        updateProgress({ progress: newProgress > 100 ? 100 : newProgress }),
      );
    }, 1000 / 60);

    return () => {
      clearInterval(id);
      clearInterval(interval);
    };
  }
};
