import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import formidable, { File } from 'formidable'; // Import formidable
import pdf from 'pdf-parse'; // Import pdf-parse

export const config = {
  // Disable body parsing
  api: {
    bodyParser: false,
  },
};

type ProcessedFiles = Array<[string, File]>; // Define type for files

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let status = 200,
    resultBody = { status: 'ok', message: 'Files were uploaded successfully' }; // Set default response status and body

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
      form.parse(req, () => {
        // Start parsing of the request
        //
      });
    },
  ).catch((e) => {
    console.log(e);
    status = 500;
    resultBody = {
      status: 'fail',
      message: 'Upload error',
    };
  });
  let final = [];
  if (files?.length) {
    // Check if files were uploaded

    /* Move uploaded files to directory */
    for (const file of files) {
      // Get text from the PDF file
      const srcToFile = async (src: string) => await fs.readFile(src);
      const fileToBuffer = () => srcToFile(file[1].filepath);
      const data = await pdf(await fileToBuffer()); // Get text from the PDF file
      final = data.text;

      // Iterate over array with files
    }
  }

  res.status(status).json(final); // Send a response
};

export default handler;
