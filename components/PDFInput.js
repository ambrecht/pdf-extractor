import React, { useState } from 'react';
import axios from 'axios';
import RandomParagraph from './RandomParagraph/index';
import KeyDown from './keydowntest.js';
import Navigation from './RandomParagraph/Navigation';

const UploadPDF = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [showUpload, setShowUpload] = useState(true);
  const [showControlPanel, setShowControlPanel] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
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
      setShowUpload(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-black min-h-screen flex flex-col sm:justify-center sm:items-center"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="w-full max-w-md">
        {showUpload ? (
          <form onSubmit={handleSubmit} className="p-4 border rounded bg-white">
            <button
              onClick={() => setShowUpload(!showUpload)}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
            >
              x
            </button>
            <label className="block mb-2">Select PDF or Drop Here:</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="p-2 border rounded mb-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
            >
              Upload File
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
        {loading && <p className="text-white">Uploading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {response && <RandomParagraph data={response} />}

        <Navigation
          setShowUpload={setShowUpload}
          setShowControlPanel={setShowControlPanel}
        />
      </div>
    </div>
  );
};

export default UploadPDF;
