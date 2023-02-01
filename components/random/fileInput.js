import React, { useState } from 'react';

const FileInput = ({ onFileSelected }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = async (event) => {
    setSelectedFile(event.target.files[0]);
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        onFileSelected(jsonData);
      } catch (err) {
        console.error(err);
      }
    };
    fileReader.readAsText(event.target.files[0]);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept=".json" />
    </div>
  );
};

export default FileInput;
