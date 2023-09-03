import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../Modal';
import {
  setBookId,
  updateIndex,
  updateParagraphCount,
  resetHistory,
} from '../../store/teleprompterSlice';
import SelectOption from './selectOptions';
import UploadForm from './uploadForm';

/**
 * BookSelectionModal Component
 * @param {Object} props - Component properties
 * @param {Function} props.onClose - Function to close the modal
 */
const BookSelectionModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [showUploadForm, setShowUploadForm] = useState(false);

  const toggleUploadForm = () => {
    setShowUploadForm(!showUploadForm);
  };

  // Fetch books and bookID from Redux store
  const books = useSelector((state) => state.documents.data);
  const bookID = useSelector((state) => state.teleprompter.bookID);

  // Convert books to options format
  const bookOptions = books.map((book) => ({
    label: `${book.book_title} von ${book.author}`,
    value: book.book_id,
  }));

  /**
   * Update paragraph count when bookID changes
   */
  useEffect(() => {
    if (bookID > 0) {
      dispatch(updateParagraphCount());
    }
  }, [bookID, dispatch]);

  /**
   * Handle book selection change
   * @param {Event} e - Change event
   */
  const handleBookChange = useCallback(
    (e) => {
      const selectedBookId = e.target.value;
      dispatch(setBookId(selectedBookId));
      dispatch(updateIndex(0));
      dispatch(resetHistory());
    },
    [dispatch],
  );

  return (
    <Modal onClose={onClose}>
      <div className="p-4 bg-white rounded shadow-lg overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-black">Buchauswahl</h2>

        {!showUploadForm ? (
          <>
            <SelectOption
              label="Wählen Sie ein Buch aus"
              value={bookID}
              options={bookOptions}
              onChange={handleBookChange}
            />
            <button
              type="button"
              onClick={toggleUploadForm}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-400"
            >
              + Neues Buch hochladen
            </button>
          </>
        ) : (
          <UploadForm />
        )}
        <button
          type="button"
          onClick={onClose}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
        >
          Schließen
        </button>
      </div>
    </Modal>
  );
};

export default BookSelectionModal;
