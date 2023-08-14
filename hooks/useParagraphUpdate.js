import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setParagraphs,
  setTime,
  setWordCount,
  setProgress,
} from '../store/teleprompterSlice';
import estimateReadingTime from '../utils/readingTime';
import countWords from '../utils/wordCount';

const useParagraphUpdate = () => {
  const dispatch = useDispatch();
  const { wpm, index, paragraphs } = useSelector((state) => state.teleprompter);
  const uploadedParagraphs = useSelector((state) => state.upload.response);

  const updateSelectedParagraphs = useCallback(() => {
    const selectedParagraphs = [
      uploadedParagraphs[index - 1]?.paragraph || '',
      uploadedParagraphs[index]?.paragraph || '',
      uploadedParagraphs[index + 1]?.paragraph || '',
    ];
    dispatch(setParagraphs(selectedParagraphs));
    dispatch(setTime(estimateReadingTime(selectedParagraphs[1], wpm)));
    dispatch(setWordCount(countWords(selectedParagraphs[1])));
    dispatch(setProgress(0));
  }, [uploadedParagraphs, index, wpm, dispatch]);

  useEffect(() => {
    if (uploadedParagraphs.length > 0) {
      updateSelectedParagraphs();
    }
  }, [uploadedParagraphs, index, wpm, updateSelectedParagraphs]);
};

export default useParagraphUpdate;
