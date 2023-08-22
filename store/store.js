import { configureStore } from '@reduxjs/toolkit';
import teleprompterReducer from './teleprompterSlice';
import themeReducer from './themeSlice';
import uploadReducer from './uploadSlice';
import navigationReducer from './navigationSlice';
import documentsSlice, { fetchBooks } from './documentsSlice';
import { teleprompterMiddleware } from './teleprompterMiddleware'; // Importieren Sie fetchBooks

const store = configureStore({
  reducer: {
    teleprompter: teleprompterReducer,
    theme: themeReducer,
    upload: uploadReducer,
    navigation: navigationReducer,
    documents: documentsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(teleprompterMiddleware),
});

// Rufen Sie die fetchBooks-Aktion direkt nach der Erstellung des Stores auf
store.dispatch(fetchBooks());

export default store;
