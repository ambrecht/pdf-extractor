// E:\pdf-extractor\store\store.js
import { configureStore } from '@reduxjs/toolkit';
import teleprompterReducer from './teleprompterSlice';
import themeReducer from './themeSlice';
import uploadReducer from './uploadSlice';
import navigationReducer from './navigationSlice';
import documentsSlice, { fetchBooks } from './documentsSlice';
import historyReducer from './historySlice';

const store = configureStore({
  reducer: {
    teleprompter: teleprompterReducer,
    theme: themeReducer,
    upload: uploadReducer,
    navigation: navigationReducer,
    documents: documentsSlice,
    history: historyReducer,
  },
});

// Rufen Sie die fetchBooks-Aktion direkt nach der Erstellung des Stores auf
store.dispatch(fetchBooks());

export default store;
