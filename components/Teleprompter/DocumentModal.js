// E:\pdf-extractor\components\Teleprompter\DocumentModal.js

import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { path } from 'ramda';
import Modal from '../Modal';
import {
  setBookId,
  updateIndex,
  updateParagraphCount,
} from '../../store/teleprompterSlice';

const BookSelectionModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const books = useSelector((state) => path(['documents', 'data'], state));
  const bookID = useSelector((state) => state.teleprompter.bookID);

  useEffect(() => {
    if (bookID > 0) {
      dispatch(updateParagraphCount()); // Rufen Sie die updateParagraphCount-Funktion auf
    }
  }, [bookID, dispatch]);

  const handleBookChange = useCallback(
    (e) => {
      const selectedBookId = e.target.value;
      dispatch(setBookId(selectedBookId));
      dispatch(updateIndex(0));
    },
    [dispatch],
  );

  return (
    <Modal onClose={onClose}>
      <form className="flex flex-col space-y-4">
        <select
          value={bookID}
          onChange={handleBookChange}
          className="p-2 border rounded"
        >
          <option value="" disabled>
            Wählen Sie ein Buch aus
          </option>
          {books.map((book) => (
            <option key={book.book_id} value={book.book_id}>
              {book.book_title} von {book.author}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={onClose}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
        >
          Schließen
        </button>
      </form>
    </Modal>
  );
};

export default BookSelectionModal;
