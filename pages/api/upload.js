const PdfJs = require('pdfjs-dist');
const natural = require('natural');
const multer = require('multer');

const crypto = require('crypto');
const mime = require('mime');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(
        null,
        raw.toString('hex') +
          Date.now() +
          '.' +
          mime.getExtension(file.mimetype),
      );
    });
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Please upload a PDF file.'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const handleUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Invalid PDF file' });
    }

    const pdfData = req.file.data;
    const pdf = await PdfJs.getDocument({ data: new Uint8Array(pdfData) })
      .promise;
    const page = await pdf.getPage(1);
    const textContent = await page.getTextContent();
    const text = textContent.items.map((item) => item.str).join(' ');

    const words = text.split(/[\s]+/);

    // Wörter nach Wortart sortieren
    const types = {
      Adjektiv: [],
      Adverb: [],
      Nomen: [],
      Pronomen: [],
      Verb: [],
    };
    const lexicon = new natural.Lexicon('de', natural.PorterStemmer, words);
    const tagger = new natural.BrillPOSTagger(lexicon);
    const taggedWords = tagger.tag(words);
    for (const [word, tag] of taggedWords) {
      types[tag].push(word);
    }

    res.status(200).json({ message: 'Upload Successful', data: types });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error processing file', error: err });
  }
};

exports.default = (req, res) => {
  switch (req.method) {
    case 'POST':
      upload.single('pdf')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          return res
            .status(500)
            .json({ message: 'Error uploading file', error: err });
        } else if (err) {
          return res
            .status(400)
            .json({ message: 'Invalid PDF file', error: err });
        }
        handleUpload(req, res);
      });
      break;
    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
};
