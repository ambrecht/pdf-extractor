import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toggleUploadForm } from '../navigationSlice';
import { setBookId } from '../teleprompterSlice';

export const uploadFile = createAsyncThunk(
  'upload/file',
  async (file, { dispatch, getState, rejectWithValue }) => {
    try {
      const state = getState(); // Abrufen des aktuellen Zustands
      const { title, author } = state.upload; // Extrahieren von Titel und Autor aus dem Zustand
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title); // Hinzufügen des Titels zum FormData
      formData.append('author', author); // Hinzufügen des Autors zum FormData

      const res = await axios.post('/api/xxx', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dispatch(toggleUploadForm());
      dispatch(setBookId(res.data?.bookIDs[0]));
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
