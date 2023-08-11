# Erstellt den Ordner "x", wenn er noch nicht existiert
if (!(Test-Path -Path .\x)) {
    New-Item -ItemType Directory -Path .\x
}

# Erstellt die Dateien und schreibt den Code hinein
@"
import { createSlice } from '@reduxjs/toolkit';
import { assoc } from 'ramda';

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
    setWpm: (state, action) => assoc('wpm', action.payload, state),
    setParagraphs: (state, action) => assoc('paragraphs', action.payload, state),
    setIndex: (state, action) => assoc('index', action.payload, state),
    setTime: (state, action) => assoc('time', action.payload, state),
    toggleIntervalRunning: (state) => assoc('intervalIsRunning', !state.intervalIsRunning, state),
    toggleLinearMode: (state) => assoc('isLinear', !state.isLinear, state),
    setWordCount: (state, action) => assoc('wordCount', action.payload, state),
    setProgress: (state, action) => assoc('progress', action.payload, state),
  },
});

export const {
  setWpm,
  setParagraphs,
  setIndex,
  setTime,
  toggleIntervalRunning,
  toggleLinearMode,
  setWordCount,
  setProgress,
} = teleprompterSlice.actions;

export default teleprompterSlice.reducer;
"@ | Out-File -FilePath .\x\teleprompterSlice.js

@"
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
    setTextAlignment: (state, action) => assoc('textAlignment', action.payload, state),
    setBackgroundColor: (state, action) => assoc('backgroundColor', action.payload, state),
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
"@ | Out-File -FilePath .\x\themeSlice.js

@"
import { createSlice } from '@reduxjs/toolkit';
import { assoc } from 'ramda';

const uploadSlice = createSlice({
  name: 'upload',
  initialState: {
    file: null,
    loading: false,
    error: null,
    response: null,
  },
  reducers: {
    setFile: (state, action) => assoc('file', action.payload, state),
    setLoading: (state, action) => assoc('loading', action.payload, state),
    setError: (state, action) => assoc('error', action.payload, state),
    setResponse: (state, action) => assoc('response', action.payload, state),
  },
});

export const {
  setFile,
  setLoading,
  setError,
  setResponse,
} = uploadSlice.actions;

export default uploadSlice.reducer;
"@ | Out-File -FilePath .\x\uploadSlice.js

@"
import { configureStore } from '@reduxjs/toolkit';
import teleprompterReducer from './teleprompterSlice';
import themeReducer from './themeSlice';
import uploadReducer from './uploadSlice';

const store = configureStore({
  reducer: {
    teleprompter: teleprompterReducer,
    theme: themeReducer,
    upload: uploadReducer,
  },
});

export default store;
"@ | Out-File -FilePath .\x\store.js
