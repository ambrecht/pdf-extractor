// Verzeichnispfad von store.js ist E:\pdf-extractor\store\store.js:

import { configureStore } from '@reduxjs/toolkit';
import teleprompterReducer from './teleprompterSlice';
import themeReducer from './themeSlice';
import uploadReducer from './uploadSlice';
import navigationReducer from './navigationSlice';

const store = configureStore({
  reducer: {
    teleprompter: teleprompterReducer,
    theme: themeReducer,
    upload: uploadReducer,
    navigation: navigationReducer, // Neuer Slice hinzugefügt
  },
});

export default store;
