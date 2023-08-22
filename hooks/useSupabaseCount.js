import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { supabase } from '../supabase/index';
import { setParagraphCount } from '../store/teleprompterSlice';

const useSupabaseCount = (bookId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCount = async () => {
      const sql = 'SELECT COUNT(*) FROM public.paragraphs WHERE book_id = $1';
      const { data, error } = await supabase
        .from('paragraphs')
        .select(sql, bookId);

      if (error) {
        console.error(error);
      } else {
        const count = data[0]?.count ?? 0;
        dispatch(setParagraphCount(count));
      }
    };

    fetchCount();
  }, [bookId, dispatch]);
};

export default useSupabaseCount;
