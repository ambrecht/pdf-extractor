import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFile, setTitle, setAuthor } from '../../store/uploadSlice';
import { path } from 'ramda';
import { uploadFile } from '../../store/thunks/uploadFile';
import { extractTitleAndAuthor } from '../../utils/extractMetadata';

/**
 * UploadModal Component
 * @description This component handles the file upload functionality.
 * @param {Function} onClose - Function to close the modal
 */
const UploadModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const file = useSelector((state) => path(['upload', 'file'], state));
  const title = useSelector((state) => path(['upload', 'title'], state));
  const author = useSelector((state) => path(['upload', 'author'], state));
  const error = useSelector((state) => path(['upload', 'error'], state));
  const loading = useSelector((state) => path(['upload', 'loading'], state));

  const handleFileChange = useCallback(
    async (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        dispatch(setFile(selectedFile));
        try {
          const metadata = await extractTitleAndAuthor(selectedFile);
          dispatch(setTitle(metadata.title));
          dispatch(setAuthor(metadata.author));
        } catch (err) {
          console.error('Could not extract title and author:', err);
        }
      }
    },
    [dispatch],
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(uploadFile(file));
    },
    [file, dispatch],
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => dispatch(setTitle(e.target.value))}
        placeholder="Buchtitel"
        className="p-2 border rounded"
      />
      <input
        type="text"
        value={author}
        onChange={(e) => dispatch(setAuthor(e.target.value))}
        placeholder="Autor"
        className="p-2 border rounded"
      />
      <input
        type="file"
        onChange={handleFileChange}
        className="p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
      >
        Upload
      </button>

      {error && <p className="mt-4 text-red-500">Error: {error}</p>}
      {file && <p className="mt-4">Response: Das Ding ging durch!</p>}
    </form>
  );
};

export default UploadModal;
