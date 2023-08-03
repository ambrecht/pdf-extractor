import React, { useState } from 'react';
import axios from 'axios';
import RandomParagraph from './RandomParagraph/index';
import KeyDown from './keydowntest.js';

const UploadPDF = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [showUpload, setShowUpload] = useState(true); // Zustand für das Anzeigen des Upload-Formulars

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/api/test', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResponse(res.data);
      setShowUpload(false); // Blende das Upload-Formular aus, sobald die PDF-Datei hochgeladen wurde
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {showUpload ? (
        <form onSubmit={handleSubmit} className="p-4 border rounded">
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
          >
            x
          </button>
          <label className="block mb-2">Select PDF:</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="p-2 border rounded mb-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
          >
            Upload PDF
          </button>
        </form>
      ) : (
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
        >
          {showUpload ? 'Hide Upload' : 'Show Upload'}
        </button>
      )}
      {loading && <p>Uploading...</p>}
      {error && <p>Error: {error}</p>}
      {response && <RandomParagraph data={response} />}

      <KeyDown />
    </div>
  );
};

export default UploadPDF;
