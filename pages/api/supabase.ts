import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import path from 'path';
import EPub from 'epub';
import extractParas from '../../utils/para';
import fs from 'fs';
import pdf from 'pdf-parse';
import { createClient, SupabaseClientOptions } from '@supabase/supabase-js';

type SupabaseBookResponse = {
  book_id: number;
  book_title: string;
  hinzufuegung_date: string;
  author: string;
}[];

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const options: SupabaseClientOptions<'public'> = {};
const supabase = createClient(supabaseUrl, supabaseAnonKey, options);

export const config = {
  api: {
    bodyParser: false,
  },
};

type ProcessedFiles = Array<[string, File]>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

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
      const extension = path.extname(file[1].filepath).substring(1);

      if (mimetype.startsWith('application/pdf') || extension === 'pdf') {
        const dataBuffer = fs.readFileSync(file[1].filepath);
        const pdfData = await pdf(dataBuffer);
        final = await extractParas(pdfData.text);

        // Extract title and word count from the PDF
        const title = pdfData.info.Title || 'Unknown Title';
        const wordCount = pdfData.text.split(/\s+/).length;

        // Insert book data into the 'book' table
        const { data: bookData, error: bookError } = (await supabase
          .from('book')
          .insert({
            book_title: title,
            hinzufuegung_date: new Date().toISOString().split('T')[0], // Current date
            author: pdfData.info.Author || 'Unknown Author',
          })) as { data: SupabaseBookResponse; error: any };

        if (bookError) {
          console.error(bookError);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }

        const bookId = bookData.length > 0 ? bookData[0].book_id : null;
        if (!bookId) {
          console.error('No book ID found');
          res.status(500).json({ error: 'Internal server error' });
          return;
        }

        // Insert paragraphs into the 'paragraphs' table
        for (const paragraphObj of final) {
          const paragraphWordCount = paragraphObj.paragraph.split(/\s+/).length;
          const { error: paragraphError } = await supabase
            .from('paragraphs')
            .insert({
              book_id: bookId,
              paragraph_string: paragraphObj.paragraph,
              wordcount: paragraphWordCount,
            });

          if (paragraphError) {
            console.error(paragraphError);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
        }
      } else if (mimetype.startsWith('text/')) {
        // Handle other file types as needed...
      } else if (mimetype === 'epub' || extension === 'epub') {
        // Handle EPUB files...
      }
    }
  }

  res.status(200).json({ message: 'Paragraphs saved successfully' });
};

export default handler;
