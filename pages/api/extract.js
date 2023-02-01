const path = require('path');
const fs = require('fs');
const pdf = require('pdf-parse');
const R = require('ramda');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export default async function extract(req, res) {
  try {
    const paragraphsObjects = await extractSentencesFromPDF(req.file.path);
    res.status(200).json(paragraphsObjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function extractSentencesFromPDF(pdfFilePath) {
  // Read the contents of the PDF file
  const dataBuffer = await fs.promises.readFile(pdfFilePath); // using fs.promise
  const pdfData = await pdf(dataBuffer);
  // Split the text into sentences
  const sentences = pdfData.text.match(/[^\.!\?]+[\.!\?]+/g);
  const paragraphs = splitText(pdfData.text);
  // Create an array of objects, each with a single sentence
  const sanitizeSentence = R.pipe(
    R.replace(/\r?\n|\r/g, ' '),
    R.replace(/\t/g, ' '),
  );
  const sentencesObjects = R.map(
    (sentence, index) => ({
      id: index,
      sentence: sanitizeSentence(sentence),
    }),
    sentences,
  );

  const paragraphsObjects = R.map(
    (paragraph, index) => ({
      id: index,
      paragraph: sanitizeSentence(paragraph),
    }),
    paragraphs,
  );
  console.log(paragraphsObjects);
  // Create the path for the output file
  const outputFileName = path.basename(pdfFilePath, '.pdf') + '.json';
  const outputFilePath = path.join(__dirname, OUTPUT_FOLDER, outputFileName);
  // Write the sentences objects to a JSON file
  await fs.promises.writeFile(
    outputFilePath,
    JSON.stringify(paragraphsObjects, null, 2),
  );
  return paragraphsObjects; // return the result
}
