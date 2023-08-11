import estimateReadingTime from '../../utils/readingTime';
import countWords from '../../utils/wordCount';
import {
  updateParagraphsAndTime,
  setIndex,
  setHistory,
  updateProgress,
} from '../actions'; // Importieren Sie die fehlenden Aktionsersteller

const actionsToHandle = [
  'HANDLE_NEW_PARAGRAPH',
  'HANDLE_NEXT_CLICK',
  'HANDLE_PREV_CLICK',
  'HANDLE_INTERVAL_TOGGLE',
];

export const updateParagraphsAndProgress = (store) => (next) => (action) => {
  next(action);
  if (actionsToHandle.includes(action.type)) {
    const state = store.getState(); // Zugriff auf den Zustand direkt, ohne .teleprompter
    const { index, wpm, response, intervalIsRunning, time } = state;

    if (index !== null) {
      const selectedParagraphs = [
        response[index - 1]?.paragraph || '',
        response[index]?.paragraph || '',
        response[index + 1]?.paragraph || '',
      ];
      const newTime = estimateReadingTime(selectedParagraphs[1], wpm);
      const wordCount = countWords(selectedParagraphs[1]);
      store.dispatch(
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
          currentIndex = (currentIndex + 1) % response.length;
        } else {
          currentIndex = Math.floor(Math.random() * response.length);
        }
        store.dispatch(setIndex({ index: currentIndex }));
        store.dispatch(
          setHistory({ history: [...state.history, currentIndex] }),
        );
      }, time * 1000);

      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsedTime = (Date.now() - startTime) / 1000;
        const newProgress = (elapsedTime / (time - 1)) * 100;
        store.dispatch(
          updateProgress({ progress: newProgress > 100 ? 100 : newProgress }),
        );
      }, 1000 / 60);

      return () => {
        clearInterval(id);
        clearInterval(interval);
      };
    }
  } else {
    console.log('else');
    next(action);
  }
};
