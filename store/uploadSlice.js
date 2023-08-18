import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';

const isClient = typeof window !== 'undefined';
const initialResponse = isClient
  ? JSON.parse(localStorage.getItem('uploadedData')) || []
  : [];

export const uploadFile = createAsyncThunk(
  'upload/file',
  async (file, { getState, rejectWithValue }) => {
    try {
      const state = getState(); // Abrufen des aktuellen Zustands
      const { title, author } = state.upload; // Extrahieren von Titel und Autor aus dem Zustand
      console.log(title, author);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title); // Hinzufügen des Titels zum FormData
      formData.append('author', author); // Hinzufügen des Autors zum FormData

      const res = await axios.post('/api/xxx', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const uploadSlice = createSlice({
  name: 'upload',
  initialState: {
    author: '',
    title: '',
    file: null,
    loading: false,
    error: null,
    response: initialResponse,
  },
  reducers: {
    setFile: (state, action) => {
      state.file = action.payload;
    },
    setTitle: (state, action) => {
      // Aktion zum Setzen des Buchtitels
      state.title = action.payload;
    },
    setAuthor: (state, action) => {
      // Aktion zum Setzen des Autors
      state.author = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.response = action.payload;
        // Speichern Sie die Antwort im localStorage
        if (isClient) {
          localStorage.setItem('uploadedData', JSON.stringify(action.payload));
        }
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectFile = (state) => state.upload.file;
export const selectResponse = (state) => state.upload.response;
export const { setFile, setTitle, setAuthor } = uploadSlice.actions; // Exportieren Sie die neuen Aktionen
export default uploadSlice.reducer;
