import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    fontSize: '16px',
    fontColor: '#000000',
    theme: 'light',
    textAlignment: 'left',
    backgroundColor: '#FFFFFF',
    animation: 'off',
    progressDisplay: 'color',
  },
  reducers: {
    setFontSize: (state, action) => {
      state.fontSize = `${action.payload}px`;
    },
    setFontColor: (state, action) => {
      state.fontColor = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setTextAlignment: (state, action) => {
      state.textAlignment = action.payload;
    },
    setBackgroundColor: (state, action) => {
      state.backgroundColor = action.payload;
    },
    setAnimation: (state, action) => {
      state.animation = action.payload;
    },
    setProgressDisplay: (state, action) => {
      state.progressDisplay = action.payload;
    },
  },
});

export const {
  setFontSize,
  setFontColor,
  setTheme,
  setTextAlignment,
  setBackgroundColor,
  setAnimation,
  setProgressDisplay,
} = themeSlice.actions;

export default themeSlice.reducer;
