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
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await axios.post('/api/test', formData, {
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
    file: null,
    loading: false,
    error: null,
    response: [],
  },
  reducers: {
    setFile: (state, action) => {
      state.file = action.payload;
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

export const { setFile } = uploadSlice.actions;
export default uploadSlice.reducer;
