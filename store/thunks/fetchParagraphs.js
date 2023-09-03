import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../supabase/index';
import { estimateReadingTime } from '../../utils/readingTime';

/**
 * Fetch paragraphs from the database and calculate the estimated reading time.
 * @param {Object} payload - The payload object.
 * @param {number} payload.index - The index of the paragraph.
 * @param {string} payload.bookId - The ID of the book.
 * @param {Function} thunkAPI - The Redux toolkit API.
 * @returns {Object} - The paragraphs, word count, and estimated reading time.
 */
export const fetchParagraphs = createAsyncThunk(
  'teleprompter/fetchParagraphs',
  async ({ index, bookId }, { getState }) => {
    const fetchIndices = index <= 1 ? [1, 2, 3] : [index - 1, index, index + 1];

    const { data, error } = await supabase
      .from('paragraphs')
      .select('paragraph_string, wordcount, paragraph_index')
      .eq('book_id', bookId)
      .in('paragraph_index', fetchIndices);

    if (error) {
      console.error('Error fetching paragraphs:', error);
      throw error;
    }

    const sortedData = data.sort(
      (a, b) => a.paragraph_index - b.paragraph_index,
    );
    const paragraphStrings = data.map((item) => item.paragraph_string);

    const mainParagraph = sortedData.find(
      (item) => item.paragraph_index === (index > 1 ? index : 1),
    );
    const mainParagraphWordcount = data[1].wordcount;

    console.log('hier', index > 1 ? index : 1, mainParagraph);

    const state = getState().teleprompter;
    const newTime = estimateReadingTime(paragraphStrings[1], state.wpm);

    return {
      paragraphs: paragraphStrings,
      wordcount: mainParagraphWordcount,
      time: newTime,
    };
  },
);
