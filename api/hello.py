from http.server import BaseHTTPRequestHandler
import spacy
import matplotlib.pyplot as plt
from spacy import displacy
from io import BytesIO
import base64

nlp = spacy.load("de_core_news_sm")


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        text = self.headers.get('text')
        doc = nlp(text)
        displacy.render(doc, style="dep", jupyter=False,
                        options={'distance': 90})
        plt.show()
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write(bytes("Hello World!", "utf8"))
        return
