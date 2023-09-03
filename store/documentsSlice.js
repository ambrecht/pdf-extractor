// E:\pdf-extractor\store\documentsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../supabase/index';

export const fetchBooks = createAsyncThunk('books/fetch', async () => {
  const { data, error } = await supabase.from('book').select('*');
  if (error) throw error;
  return data;
});

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    data: [
      {
        book_id: 0,
        book_title: 'Wähle ein Buch aus...',
      },
    ],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [
          {
            book_id: 0,
            book_title: 'Wähle ein Buch',
            author: ' dieser Liste',
          },
          ...action.payload,
        ];
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default booksSlice.reducer;
