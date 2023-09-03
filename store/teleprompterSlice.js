import { createSlice } from '@reduxjs/toolkit';
import { selectResponse } from './uploadSlice';
import { fetchParagraphs } from './thunks/fetchParagraphs';
import fetchParagraphCount from './thunks/fetchParagraphCount';

// Thunks
export const updateIndex = (newIndex) => (dispatch, getState) => {
  dispatch(setIndex(newIndex));
  const bookId = getState().teleprompter.bookID;
  dispatch(fetchParagraphs({ index: newIndex, bookId }));
};

export const updateParagraphCount = () => (dispatch, getState) => {
  const bookId = getState().teleprompter.bookID;
  dispatch(fetchParagraphCount(bookId));
};

// Initial State
const initialState = {
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
  history: [],
};

// Slice
const teleprompterSlice = createSlice({
  name: 'teleprompter',
  initialState,
  reducers: {
    // Setters
    setParagraphCount: (state, { payload }) => {
      state.paragraphcount = payload;
    },
    setWpm: (state, { payload }) => {
      state.wpm = payload;
    },
    setTime: (state, { payload }) => {
      state.time = payload;
    },
    setIndex: (state, { payload }) => {
      state.index = payload;
    },
    setBookId: (state, { payload }) => {
      state.bookID = payload;
    },

    // Toggles
    toggleIntervalRunning: (state) => {
      state.intervalIsRunning = !state.intervalIsRunning;
    },
    toggleLinearMode: (state) => {
      state.isLinear = !state.isLinear;
    },

    // History
    updateHistory: (state, action) => {
      state.history = [...state.history, action.payload];
    },

    resetHistory: (state) => {
      state.history = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchParagraphCount.fulfilled, (state, { payload }) => {
        state.paragraphcount = payload;
      })
      .addCase(fetchParagraphs.fulfilled, (state, { payload }) => {
        state.paragraphs = payload.paragraphs;
        state.wordCount = payload.wordcount;
        state.time = payload.time;
      });
  },
});

export const {
  setParagraphCount,
  setWpm,
  setTime,
  setIndex,
  toggleIntervalRunning,
  toggleLinearMode,
  resetHistory,
  updateHistory,
  setBookId,
} = teleprompterSlice.actions;

export default teleprompterSlice.reducer;
