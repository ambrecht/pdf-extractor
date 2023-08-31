import { getDocument } from 'pdfjs-dist';

/**
 * Funktion zum Extrahieren von Titel und Autor aus einer PDF-Datei.
 * @param {File} file - Die PDF-Datei, aus der der Titel und der Autor extrahiert werden sollen.
 * @returns {Promise<Object>} Ein Promise, das ein Objekt mit dem extrahierten Titel und Autor zurückgibt.
 */
export const extractTitleAndAuthor = async (file) => {
  try {
    const fileBuffer = await file.arrayBuffer();
    const pdfDoc = await getDocument({ data: fileBuffer }).promise;
    const metadata = await pdfDoc.getMetadata();

    if (!metadata.info.title || !metadata.info.author) {
      throw new Error('Title or Author not found in the PDF metadata');
    }

    return {
      title: metadata.info.title,
      author: metadata.info.author,
    };
  } catch (error) {
    console.error('Error while extracting metadata:', error);
    throw new Error('Extraction failed');
  }
};
