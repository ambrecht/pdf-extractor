import React, { useState } from 'react';
const pdfjsLib = require('pdfjs-dist');
import WordFrequencyTable from './WordFrequencyTable';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

const ConvertPdf = () => {
  const [pdfText, setPdfText] = useState('');
  const [pdfFile, setPdfFile] = useState(null);

  const [types, setTypes] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setPdfFile(file);
  };

  const handleConvert = async () => {
    if (!pdfFile) {
      return alert('Please select a PDF file');
    }

    const pdfData = await pdfFile.arrayBuffer();
    pdfjsLib.getDocument({ data: pdfData }).promise.then(async (pdf) => {
      let textContent = '';
      const pages = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        pages.push(pdf.getPage(i));
      }
      for (const page of pages) {
        const tC = await page.then((page) => page.getTextContent());
        textContent += tC.items.map((item) => item.str).join(' ');
      }
      setPdfText(textContent);
    });
  };

  const handleSend = async () => {
    if (!pdfText) {
      return alert('Please convert the pdf first');
    }

    try {
      const response = await fetch(
        'https://faas-fra1-afec6ce7.doserverless.co/api/v1/web/fn-a94063be-9cef-4f07-bebd-65ad3e72da00/sample/hello',
        {
          method: 'POST',
          body: JSON.stringify({ pdfText }),
          headers: {
            'Authorization': 'Bearer ' + process.env.DIGITALOCEAN_TOKEN,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      );
      const json = await response.json();
      json ? setTypes(json.data) : null;
      alert(json.message);
    } catch (err) {
      console.error(err);
      alert('An error occurred, please try again');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileSelect} accept="application/pdf" />
      <button onClick={handleConvert}>Convert</button>
      <button onClick={handleSend}>Send to Serverless API</button>
      {types !== null ? <WordFrequencyTable types={types} /> : null}
    </div>
  );
};

export default ConvertPdf;
