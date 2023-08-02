import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable'; // Import formidable
import PDFParser from 'pdf2json'; // Import pdf2json
import extractParas from '../../utils/para';
import fs from 'fs';

export const config = {
  // Disable body parsing
  api: {
    bodyParser: false,
  },
};

type ProcessedFiles = Array<[string, File]>; // Define type for files

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let status = 200;
  let final = [];

  /* Get files using formidable */
  const files = await new Promise<ProcessedFiles | undefined>( // Create a promise to get files
    (resolve, reject) => {
      const form = new formidable.IncomingForm(); // Create an instance of formidable
      const files: ProcessedFiles = []; // Initialize array for files
      form.on('file', function (field, file) {
        // Add a listener for each file
        files.push([field, file]); // Add file to array
      });
      form.on('end', () => resolve(files)); // Finish promise on end event
      form.on('error', (err) => reject(err)); // Finish promise on error event
      form.parse(req);
    },
  ).catch((e) => {
    console.log(e);
    status = 500;
  });

  if (files?.length) {
    // Check if files were uploaded

    for (const file of files) {
      // Get text from the PDF file
      const pdfParser = new PDFParser();
      const filePath = file[1].filepath;

      pdfParser.on('pdfParser_dataError', (err) => console.error(err));
      pdfParser.on('pdfParser_dataReady', (pdfData) => {
        const text = pdfData.formImage.Pages.map((page) =>
          page.Texts.map((textItem) =>
            decodeURIComponent(textItem.R[0].T),
          ).join(' '),
        ).join('\n');
        final = extractParas(text); // Extract paragraphs from the text
        console.log(extractParas(text)); // Log text to the console
      });

      pdfParser.loadPDF(filePath);
    }
  }

  res.status(status).json(final); // Send a response
};

export default handler;
