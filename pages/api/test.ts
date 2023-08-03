import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import { fileTypeFromFile } from 'file-type';
import path from 'path';
import EPub from 'epub';
import extractParas from '../../utils/para';
import fs from 'fs';
import pdf from 'pdf-parse';
import { JSDOM } from 'jsdom';

export const config = {
  api: {
    bodyParser: false,
  },
};

type ProcessedFiles = Array<[string, File]>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  let status = 200;
  let final = [];

  const files = await new Promise<ProcessedFiles | undefined>(
    (resolve, reject) => {
      const form = new formidable.IncomingForm();
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
          return;
        }
        const processedFiles: ProcessedFiles = Object.entries(files).map(
          ([field, file]) => [field, file as File],
        );
        resolve(processedFiles);
      });
    },
  ).catch((e) => {
    console.error(e);
    status = 500;
    res.status(status).json({ status: 'fail', message: 'Upload error' });
    return;
  });

  if (files && files.length > 0) {
    for (const file of files) {
      const mimetype = file[1].mimetype;
      console.log('file88', mimetype);
      const type = await fileTypeFromFile(file[1].filepath);
      const extension = path.extname(file[1].filepath).substring(1);

      if (type?.mime === 'application/pdf' || extension === 'pdf') {
        // Handle PDF
        const dataBuffer = fs.readFileSync(file[1].filepath);
        const pdfData = await pdf(dataBuffer);
        final = await extractParas(pdfData.text);
      } else if (mimetype.startsWith('text/')) {
        // Handle TXT
        const text = fs.readFileSync(file[1].filepath, 'utf-8');
        final = await extractParas(text);
      } else if (type?.ext === 'epub' || extension === 'epub') {
        const book = new EPub(file[1].filepath);

        try {
          await new Promise<void>((resolve, reject) => {
            book.on('end', async function () {
              const chapters = book.flow;
              const promises = chapters.map(
                (chapter) =>
                  new Promise<string>((resolveChapter, rejectChapter) => {
                    book.getChapter(chapter.id, function (err, text) {
                      if (err) rejectChapter(err);
                      else resolveChapter(text);
                    });
                  }),
              );

              const texts = await Promise.all(promises);
              const combinedText = texts.join('\n');
              final = await extractParas(combinedText);
              resolve();
            });
            book.parse();
          });
        } catch (error) {
          console.error(error);
          // Error handling if needed
        }
      } else if (type?.mime.startsWith('text/html') || extension === 'html') {
        // Handle HTML
        const html = fs.readFileSync(file[1].filepath, 'utf-8');
        const dom = new JSDOM(html);
        const text = dom.window.document.body.textContent;
        final = await extractParas(text);
      } else {
        res
          .status(400)
          .json({ status: 'fail', message: 'Unsupported file type' });
        return;
      }
    }
  }

  res.status(status).json(final);
};

export default handler;
