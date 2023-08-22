import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../supabase/index';

const fetchParagraphs = createAsyncThunk(
  'teleprompter/fetchParagraphs',
  async ({ index, bookId }) => {
    const { data, error } = await supabase
      .from('paragraphs')
      .select('paragraph_string')
      .in('paragraph_index', [index - 1, index, index + 1])
      .eq('book_id', bookId);
    if (error) throw error;
    console.log('tunk', data);
    return data;
  },
);

export default fetchParagraphs;
