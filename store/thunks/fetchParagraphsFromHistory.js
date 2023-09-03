import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../supabase/index';

/**
 * Fetch paragraphs from the database based on the history of paragraph indexes.
 * @param {Array} payload - The array of paragraph indexes.
 * @param {Function} thunkAPI - The Redux toolkit API.
 * @returns {Array} - The paragraphs.
 */
export const fetchParagraphsFromHistory = createAsyncThunk(
  'history/fetchParagraphsFromHistory',
  async (_, { getState }) => {
    const { history, bookID } = getState().teleprompter;

    const { data, error } = await supabase
      .from('paragraphs')
      .select('paragraph_string, paragraph_index')
      .eq('book_id', bookID)
      .in('paragraph_index', history);

    if (error) {
      console.error('Error fetching paragraphs:', error);
      throw error;
    }

    return data;
  },
);
