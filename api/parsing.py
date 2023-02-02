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
        img = BytesIO()
        displacy.render(doc, style="dep", jupyter=False,
                        options={'distance': 90}, out=img)
        img.seek(0)
        self.send_response(200)
        self.send_header('Content-type', 'image/png')
        self.end_headers()
        self.wfile.write(base64.b64encode(img.getvalue()))
        return
