import { supabase } from '../supabase/index';
import { useEffect, useCallback, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setParagraphs as setParagraphsAction,
  setTime,
  setWordCount,
  setProgress,
} from '../store/teleprompterSlice';
import estimateReadingTime from '../utils/readingTime';
import countWords from '../utils/wordCount';

const useParagraphUpdate = () => {
  const dispatch = useDispatch();
  const { wpm, index } = useSelector((state) => state.teleprompter);
  const [paragraphs, setParagraphs] = useState([]);

  console.log('index', index);

  const memoizedEstimateReadingTime = useMemo(() => estimateReadingTime, []);
  const memoizedCountWords = useMemo(() => countWords, []);
  const memoizedSetTime = useCallback(
    (time) => dispatch(setTime(time)),
    [dispatch],
  );
  const memoizedSetWordCount = useCallback(
    (wordCount) => dispatch(setWordCount(wordCount)),
    [dispatch],
  );
  const memoizedSetProgress = useCallback(
    (progress) => dispatch(setProgress(progress)),
    [dispatch],
  );

  const updateSelectedParagraphs = useCallback(async () => {
    const { data, error } = await supabase
      .from('paragraphs')
      .select('paragraph_string')
      .in('paragraph_id', [index - 1, index, index + 1]);
    if (error) console.log('error', error);
    else {
      const selectedParagraphs = data.map((item) => item.paragraph_string);
      console.log('para', selectedParagraphs);
      setParagraphs(selectedParagraphs);
      dispatch(setParagraphsAction(selectedParagraphs)); // Using setParagraphsAction here
      const time = memoizedEstimateReadingTime(selectedParagraphs[1], wpm);
      const wordCount = memoizedCountWords(selectedParagraphs[1]);
      memoizedSetTime(time);
      memoizedSetWordCount(wordCount);
      memoizedSetProgress(0);
    }
  }, [
    index,
    wpm,
    dispatch,
    memoizedEstimateReadingTime,
    memoizedCountWords,
    memoizedSetTime,
    memoizedSetWordCount,
    memoizedSetProgress,
  ]);

  useEffect(() => {
    updateSelectedParagraphs();
  }, [index, updateSelectedParagraphs]); // Hier wurde der useEffect Hook angepasst, um nur bei Änderungen des index auszulösen.

  return paragraphs;
};

export default useParagraphUpdate;
