// E:\pdf-extractor\store\themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    fontSize: '3rem',
    fontColor: '#FFFFFF',
    textAlignment: 'center',
    backgroundColor: '#000000', // Setzen Sie einen Standardwert oder lassen Sie ihn leer
    animation: 'off',
    np: 'none',
    progressBarColor: '#FFFFFF',
    progressDisplay: 'color',
  },
  reducers: {
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
    },
    setFontColor: (state, action) => {
      state.fontColor = action.payload;
      state.progressBarColor = action.payload;
    },
    setBackgroundColor: (state, action) => {
      state.backgroundColor = action.payload;
    },
    invertTheme: (state) => {
      const tempColor = state.fontColor;
      state.fontColor = state.backgroundColor;
      state.backgroundColor = tempColor;
    },
    setTextAlignment: (state, action) => {
      state.textAlignment = action.payload;
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
  setBackgroundColor, // Stellen Sie sicher, dass Sie diese Aktion exportieren
  invertTheme,
  setTextAlignment,
  setAnimation,
  setProgressDisplay,
} = themeSlice.actions;

export default themeSlice.reducer;
