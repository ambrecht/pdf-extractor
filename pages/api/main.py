import json
import nltk
from nltk import pos_tag

def analyze_pdf_text(event, context):
    # Download NLTK data
    nltk.download('averaged_perceptron_tagger')
    nltk.download('punkt')
    # parse input data
    try:
        pdf_text = json.loads(event["body"])["pdfText"]
    except:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Incorrect input"})
        }

    # use NLTK to tag each word with its POS
    tagged_words = pos_tag(nltk.word_tokenize(pdf_text))

    # initialize empty dictionaries for each POS
    types = {
        "Adjektive": [],
        "Adverben": [],
        "Nomen": [],
        "Pronomen": [],
        "Verben": [],
        "Substantive":[]
    }

    # iterate through tagged words and add to appropriate POS list
    for word, tag in tagged_words:
        if tag.startswith("JJ"):
            types["Adjektive"].append(word)
        elif tag.startswith("RB"):
            types["Adverben"].append(word)
        elif tag.startswith("NN"):
            types["Nomen"].append(word)
        elif tag.startswith("PR"):
            types["Pronomen"].append(word)
        elif tag.startswith("VB"):
            types["Verben"].append(word)
        elif tag.startswith("NN"):
            types["Substantive"].append(word)

    # return result as JSON
    return {
        "statusCode": 200,
        "headers": {"Content-Type": "application/json"},
        "body": json.dumps(types)
    }
