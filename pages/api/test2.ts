import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import formidable, { File } from 'formidable';
import pdf from 'pdf-parse';
import extractParas from '../../utils/para';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  /* Get files using formidable */
  const form = new formidable.IncomingForm();
  const final = form.parse(req, async (_err, _fields, files) => {
    if (files?.pdf) {
      /* Get text from the PDF file */
      const srcToFile = async (src: string) => await fs.readFile(src);
      const fileToBuffer = () => srcToFile(files.pdf.path);
      const data = await pdf(await fileToBuffer());
      return await extractParas(data.text);
    }
  });
  console.log(final);

  res.status(200).send('Biberbier');
};

export default handler;
