// E:\pdf-extractor\store\teleprompterSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { mergeDeepRight as merge } from 'ramda';
import { selectResponse } from './uploadSlice';
import { fetchParagraphs } from './thunks/fetchParagraphs';
import fetchParagraphCount from './thunks/fetchParagraphCount';

export const updateIndex = (newIndex) => (dispatch, getState) => {
  console.log('updateIndex action called with newIndex:', newIndex);

  dispatch(setIndex(newIndex));
  const bookId = getState().teleprompter.bookID;

  console.log('Current bookId:', bookId);

  dispatch(fetchParagraphs({ index: newIndex, bookId }));
};

export const updateParagraphCount = () => (dispatch, getState) => {
  const bookId = getState().teleprompter.bookID; // Abrufen der bookID aus dem Store
  dispatch(fetchParagraphCount(bookId)); // Aufrufen des Thunks
};

const teleprompterSlice = createSlice({
  name: 'teleprompter',
  initialState: {
    wpm: 140,
    paragraphs: [],
    index: 0,
    time: 0,
    intervalIsRunning: false,
    isLinear: false,
    wordCount: 99,
    progress: 0,
    paragraphcount: 0,
    bookID: 0,
  },
  reducers: {
    setParagraphCount: (state, action) =>
      merge(state, { paragraphcount: action.payload }),
    setWpm: (state, action) => merge(state, { wpm: action.payload }),
    setIndex: (state, action) => {
      const newIndex = action.payload;
      return merge(state, { index: newIndex });
    },

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
    setBookId: (state, action) => {
      state.bookID = action.payload;
    },
    selectBookId: (state) => state.bookID,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchParagraphCount.fulfilled, (state, action) => {
        console.log(
          'fetchParagraphCount fulfilled with payload:',
          action.payload,
        );
        state.paragraphcount = action.payload;
      })
      .addCase(fetchParagraphs.fulfilled, (state, action) => {
        console.log('fetchParagraphs fulfilled with payload:', action.payload);
        state.paragraphs = action.payload.paragraphs;
        state.wordCount = action.payload.wordcount;
        state.time = action.payload.time;
        console.log('New state.time:', state.time);
      });
  },
});
export const {
  handleNewParagraph,
  setWpm,
  setParagraphs,
  setIndex,
  toggleIntervalRunning,
  toggleLinearMode,
  setWordCount,
  setProgress,
  updateParagraphs,
  setParagraphCount,
  setBookId, // Exportieren Sie die setBookId Aktion
  selectBookId, // Exportieren Sie die selectBookId Aktion
} = teleprompterSlice.actions;
export default teleprompterSlice.reducer;
