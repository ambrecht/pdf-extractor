import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs';
import formidable, { File } from 'formidable';
import pdf from 'pdf-parse';
import extractParas from '../../utils/para';

export const config = {
  api: {
    bodyParser: false,
  },
};

type ProcessedFiles = Array<[string, File]>;

const cleanText = (text: string) => {
  text = text.replace(/\s+/g, ' ').trim();
  text = text.replace(/<[^>]*>/g, '');
  text = text.replace(/\[\d+\]/g, '');

  const maxLineLength = 80;
  const lines = [];
  let line = '';
  text.split(' ').forEach((word) => {
    if (line.length + word.length > maxLineLength) {
      lines.push(line);
      line = '';
    }
    line += (line ? ' ' : '') + word;
  });
  if (line) lines.push(line);
  text = lines.join('\n');

  return text;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let status = 200,
    resultBody = { status: 'ok', message: 'Files were uploaded successfully' };

  const files = await new Promise<ProcessedFiles | undefined>(
    (resolve, reject) => {
      const form = new formidable.IncomingForm();
      const files: ProcessedFiles = [];
      form.on('file', function (field, file) {
        files.push([field, file]);
      });
      form.on('end', () => resolve(files));
      form.on('error', (err) => reject(err));
      form.parse(req);
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
    for (const file of files) {
      const srcToFile = async (src: string) => await fs.readFile(src);
      const fileToBuffer = () => srcToFile(file[1].filepath);
      const data = await pdf(await fileToBuffer());
      const paragraphs = await extractParas(data.text);
      final = paragraphs.map(cleanText);
    }
  }

  res.status(status).json(final);
};

export default handler;
