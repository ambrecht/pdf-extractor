import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFile,
  uploadFile,
  setTitle,
  setAuthor,
} from '../../store/uploadSlice';
import { path } from 'ramda';
import Modal from '../Modal';

const UploadModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const file = useSelector((state) => path(['upload', 'file'], state));
  const title = useSelector((state) => path(['upload', 'title'], state));
  const author = useSelector((state) => path(['upload', 'author'], state));
  const loading = useSelector((state) => path(['upload', 'loading'], state));
  const error = useSelector((state) => path(['upload', 'error'], state));

  const handleFileChange = useCallback(
    (e) => {
      if (e.target.files[0]) {
        dispatch(setFile(e.target.files[0]));
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
    <Modal onClose={onClose}>
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
      </form>
      {loading && <p className="mt-4">Uploading...</p>}
      {error && <p className="mt-4 text-red-500">Error: {error}</p>}
      {file && <p className="mt-4">Response: Das Ding ging durch!</p>}
    </Modal>
  );
};

export default UploadModal;
