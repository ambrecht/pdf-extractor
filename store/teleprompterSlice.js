import { createSlice } from '@reduxjs/toolkit';
import { mergeDeepRight as merge } from 'ramda';
import { selectResponse } from './uploadSlice';
import countWords from '../utils/wordCount';
import estimateReadingTime from '../utils/readingTime';

const teleprompterSlice = createSlice({
  name: 'teleprompter',
  initialState: {
    wpm: 140,
    paragraphs: [],
    index: 0,
    time: 0,
    intervalIsRunning: false,
    isLinear: false,
    wordCount: 0,
    progress: 0,
  },
  reducers: {
    setWpm: (state, action) => merge(state, { wpm: action.payload }),
    setParagraphs: (state, action) =>
      merge(state, { paragraphs: action.payload }),
    setIndex: (state, action) => merge(state, { index: action.payload }),
    setTime: (state, action) => merge(state, { time: action.payload }),
    toggleIntervalRunning: (state) =>
      merge(state, { intervalIsRunning: !state.intervalIsRunning }),
    toggleLinearMode: (state) => merge(state, { isLinear: !state.isLinear }),
    setWordCount: (state, action) =>
      merge(state, { wordCount: action.payload }),
    setProgress: (state, action) => merge(state, { progress: action.payload }),
    handleNewParagraph: (state, action) => {
      const response = selectResponse(state);
      if (response && response.length > 0) {
        const randomIndex = Math.floor(Math.random() * response.length);
        return merge(state, {
          index: randomIndex,
        });
      }
      return state;
    },

    updateParagraphs: (state, action) => {
      const response = uploadSelectors.selectResponse(state);
      if (response && response.length >= 3) {
        const selectedParagraphs = [
          response[action.payload - 1]?.paragraph || '',
          response[action.payload]?.paragraph || '',
          response[action.payload + 1]?.paragraph || '',
        ];
        return merge(state, {
          paragraphs: selectedParagraphs,
          index: action.payload,
          time: estimateReadingTime(selectedParagraphs[1], state.wpm),
          wordCount: countWords(selectedParagraphs[1]),
          progress: 0,
        });
      }
      return state;
    },
  },
});

export const {
  handleNewParagraph,
  setWpm,
  setParagraphs,
  setIndex,
  setTime,
  toggleIntervalRunning,
  toggleLinearMode,
  setWordCount,
  setProgress,
  updateParagraphs, // Exportieren Sie die neue Aktion
} = teleprompterSlice.actions;

export default teleprompterSlice.reducer;