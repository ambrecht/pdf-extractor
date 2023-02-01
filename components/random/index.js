import React, { use, useState } from 'react';
import FileInput from './fileInput.js';
import RandomParagraph from './random.js';

function RandomPara() {
  const [data, setData] = useState([]);
  const onFileSelected = (jsonData) => {
    // Verwende die empfangenen Daten
    setData(jsonData);
  };

  return (
    <div>
      <FileInput onFileSelected={onFileSelected} />
      {data.length > 0 ? (
        <RandomParagraph data={data}></RandomParagraph>
      ) : (
        <div>No Datas</div>
      )}
    </div>
  );
}
export default RandomPara;

const data = [
  { paragraph: 'textiueh33' },
  { paragraph: 'textiueh33' },
  { paragraph: 'textiueh33' },
  { paragraph: 'textiueh33' },
];
