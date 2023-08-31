// E:\pdf-extractor\store\thunks\fetchParagraphCount.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../supabase/index';

const fetchParagraphCount = createAsyncThunk(
  'teleprompter/fetchParagraphCount',
  async (bookId) => {
    const { data, error, count } = await supabase
      .from('paragraphs')
      .select('*', { count: 'exact' })
      .eq('book_id', bookId);

    if (error) throw error;
    return count;
  },
);

export default fetchParagraphCount;
