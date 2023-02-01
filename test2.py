import spacy
import PyPDF2
from google.colab import files

# Laden des SpaCy - Modells
nlp = spacy.load("de_core_news_sm")
nlp.max_length = 103000000000  # or even higher


def extract_pdf_text(pdf_file):

    pdf_text = ""

    for page in range(len(pdf_file.pages)):
        pdf_text += pdf_file.pages[page].extract_text()
    return pdf_text


def train_spacy_on_pdf(pdf_file):

    pdf_text = extract_pdf_text(pdf_file)

    doc = nlp(pdf_text)
    for token in doc:
        nlp.update([token.text], [token.pos_], [token.dep_], [token.head.text])


def style_transfer(text):

    doc = nlp(text)

    for token in doc:
        nlp.update([token.text], [token.pos_], [token.dep_], [token.head.text])
    return doc.text


def select_and_train_pdf():

    uploaded = files.upload()

    pdf_file = PyPDF2.PdfReader(list(uploaded.keys())[0], "rb")
    train_spacy_on_pdf(pdf_file)


def main():
    select_and_train_pdf()
    input_text = input("Please enter the text you want to style transfer: ")
    styled_text = style_transfer(input_text)
    print("Styled Text: " + styled_text)


main()
