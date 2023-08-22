// E:\pdf-extractor\components\Teleprompter\DocumentModal.js

import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { path } from 'ramda';
import Modal from '../Modal';
import { setBookId } from '../../store/teleprompterSlice';

const BookSelectionModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const books = useSelector((state) => path(['documents', 'data'], state));
  const bookID = useSelector((state) => state.teleprompter.bookID); // Verwenden Sie bookID statt bookID

  const handleBookChange = useCallback(
    (e) => {
      console.log('Selected book ID:', e.target.value);
      dispatch(setBookId(88)); // Verwenden Sie setBookId
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
