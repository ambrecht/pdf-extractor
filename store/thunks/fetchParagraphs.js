// E:\pdf-extractor\store\thunks\fetchParagraphs.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../supabase/index';
import { estimateReadingTime } from '../../utils/readingTime';
export const fetchParagraphs = createAsyncThunk(
  'teleprompter/fetchParagraphs',
  async ({ index, bookId }, { getState }) => {
    console.log(
      'fetchParagraphs Thunk called with index:',
      index,
      'and bookId:',
      bookId,
    );

    const { data, error } = await supabase
      .from('paragraphs')
      .select('paragraph_string, wordcount')
      .eq('book_id', bookId)
      .in(
        'paragraph_index',
        index <= 1 ? [1, 2, 3] : [index - 1, index, index + 1],
      );

    console.log('Data from database:', data);

    if (error) {
      console.error('Error fetching paragraphs:', error);
      throw error;
    }

    const paragraphStrings = data.map((item) => item.paragraph_string);
    const arrayIndex = index <= 1 ? index : 1;
    console.log('Array index used:', arrayIndex);

    const mainParagraphWordcount = data[arrayIndex]?.wordcount;
    console.log('Main paragraph word count:', mainParagraphWordcount);

    const state = getState().teleprompter;
    console.log('Current teleprompter state:', state);

    const selectedParagraph = paragraphStrings[arrayIndex];
    const newTime = estimateReadingTime(selectedParagraph, state.wpm);

    console.log(
      'Estimated reading time:',
      newTime,
      'for paragraph:',
      selectedParagraph,
    );
    console.log('Length of paragraphStrings array:', paragraphStrings.length);
    console.log('Current state index:', state.index);

    return {
      paragraphs: paragraphStrings,
      wordcount: mainParagraphWordcount,
      time: newTime,
    };
  },
);
