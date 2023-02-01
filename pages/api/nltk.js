import natural from 'natural';

const handlePdfUpload = async (req, res) => {
  try {
    const pdfText = req.body.pdfText;

    const types = {
      Adjektive: [],
      Adverben: [],
      Nomen: [],
      Pronomen: [],
      Verben: [],
    };

    const language = 'EN';
    const defaultCategory = 'N';
    const defaultCategoryCapitalized = 'NNP';

    var lexicon = new natural.Lexicon(
      language,
      defaultCategory,
      defaultCategoryCapitalized,
    );
    var ruleSet = new natural.RuleSet('EN');
    var tagger = new natural.BrillPOSTagger(lexicon, ruleSet);

    const tokenizer = new natural.WordTokenizer();
    const tokenizedWords = tokenizer.tokenize(pdfText);

    const taggedWords = tagger.tag(tokenizedWords).taggedWords;

    taggedWords.map(({ token, tag }) => {
      if (token) {
        switch (tag) {
          case 'JJ':
            types.Adjektive.push(token);
            break;
          case 'RB':
            types.Adverben.push(token);
            break;
          case 'NN':
            types.Nomen.push(token);
            break;
          case 'PR':
            types.Pronomen.push(token);
            break;
          case 'VB':
            types.Verben.push(token);
            break;
          default:
            break;
        }
      }
    });

    res
      .status(200)
      .json({ message: 'Text processed successfully', data: types });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: 'Error processing text', error: err.message });
  }
};

export default handlePdfUpload;
