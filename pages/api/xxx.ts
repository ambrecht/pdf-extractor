import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import path from 'path';
import EPub from 'epub';
import extractParas from '../../utils/para';
import fs from 'fs';
import pdf from 'pdf-parse';
import { createClient, SupabaseClientOptions } from '@supabase/supabase-js';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';

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

type SupabaseInsertResponse = {
  book_id: number;
  book_title: string;
  hinzufuegung_date: string;
  author: string;
}[];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const filesData = await new Promise<{
    fields: any;
    processedFiles: ProcessedFiles;
  } | null>((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }
      const processedFiles: ProcessedFiles = Object.entries(files).map(
        ([field, file]) => [field, file as File],
      );
      resolve({ fields, processedFiles });
    });
  }).catch((e) => {
    console.error(e);
    res.status(500).json({ status: 'fail', message: 'Upload error' });
    return null; // <-- Return null in case of an error
  });

  if (!filesData) return;

  const { title: requestBodyTitle, author: requestBodyAuthor } =
    filesData.fields;

  if (filesData.processedFiles && filesData.processedFiles.length > 0) {
    for (const file of filesData.processedFiles) {
      const mimetype = file[1].mimetype;
      const extension = path.extname(file[1].filepath).substring(1);

      if (mimetype.startsWith('application/pdf') || extension === 'pdf') {
        const dataBuffer = fs.readFileSync(file[1].filepath);
        const pdfData = await pdf(dataBuffer);
        const paragraphs = await extractParas(pdfData.text);

        // Insert book data into the 'book' table
        const { data: bookData, error: insertError } = await supabase
          .from('book')
          .insert({
            book_title: requestBodyTitle,
            hinzufuegung_date: new Date().toISOString().split('T')[0],
            author: requestBodyAuthor,
          });

        if (insertError) {
          console.error(insertError);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }

        const { data: retrievedBook, error: retrieveError } = await supabase
          .from('book')
          .select('book_id')
          .eq('book_title', requestBodyTitle)
          .order('hinzufuegung_date', { ascending: false })
          .limit(1)
          .single();

        if (retrieveError || !retrievedBook) {
          console.error(retrieveError);
          res.status(500).json({ error: 'Error retrieving book ID' });
          return;
        }

        const bookId = retrievedBook.book_id;

        // Insert paragraphs into the 'paragraphs' table
        for (const para of paragraphs) {
          const wordCount = para.paragraph.split(/\s+/).length;
          const { error: paragraphError } = await supabase
            .from('paragraphs')
            .insert({
              book_id: bookId,
              paragraph_string: para.paragraph,
              wordcount: wordCount,
            });

          if (paragraphError) {
            console.error(paragraphError);
            res.status(500).json({ error: 'Internal server error' });
            return;
          }
        }
      }
    }
  }

  res.status(200).json({ message: 'Data saved successfully' });
};

export default handler;
