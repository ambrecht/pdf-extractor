import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFile, uploadFile } from '../../store/uploadSlice';
import { path } from 'ramda';
const UploadPDF = () => {
  const dispatch = useDispatch();
  const file = useSelector((state) => path(['upload', 'file'], state));
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
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {loading && <p>Uploading...</p>}
      {error && <p>Error: {error}</p>}
      {file && <p>Response: Das Ding ging durch!</p>}
    </div>
  );
};
export default UploadPDF;
