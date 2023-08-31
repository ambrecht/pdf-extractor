import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { uploadFile } from './thunks/uploadFile'; // Importieren Sie die Thunk-Action

const isClient = typeof window !== 'undefined';
const initialResponse = isClient
  ? JSON.parse(localStorage.getItem('uploadedData')) || []
  : [];

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
export const selectLoading = (state) => state.upload.loading;
export const { setFile, setTitle, setAuthor } = uploadSlice.actions; // Exportieren Sie die neuen Aktionen
export default uploadSlice.reducer;
