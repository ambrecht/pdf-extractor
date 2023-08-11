import { createSlice } from '@reduxjs/toolkit';
import { assoc } from 'ramda';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    fontSize: 16,
    fontColor: 'black',
    theme: 'light',
    textAlignment: 'left',
    backgroundColor: 'white',
  },
  reducers: {
    setFontSize: (state, action) => assoc('fontSize', action.payload, state),
    setFontColor: (state, action) => assoc('fontColor', action.payload, state),
    setTheme: (state, action) => assoc('theme', action.payload, state),
    setTextAlignment: (state, action) =>
      assoc('textAlignment', action.payload, state),
    setBackgroundColor: (state, action) =>
      assoc('backgroundColor', action.payload, state),
  },
});

export const {
  setFontSize,
  setFontColor,
  setTheme,
  setTextAlignment,
  setBackgroundColor,
} = themeSlice.actions;

export default themeSlice.reducer;
