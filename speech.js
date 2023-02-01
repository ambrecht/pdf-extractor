// Erstellen der Funktion
function scrollDown() {
  // Abfragen der aktuellen Scrollposition
  var currentPos = document.documentElement.scrollTop;
  // Berechnen der neuen Scrollposition als 50% der aktuellen Scrollposition
  var newPos =
    currentPos + (document.documentElement.scrollHeight - currentPos) / 2;
  // Scrollen zur neuen Position
  window.scrollTo(0, newPos);
}

// Erstellen eines neuen SpeechRecognition-Objekts
const recognition = new SpeechRecognition();

// Einstellen der Sprache
recognition.lang = 'de-DE';

// Erstellen einer Funktion zum Starten der Spracherkennung
function startRecognition() {
  recognition.start();
}

// Zuweisung einer Funktion die aufgerufen wird wenn ein Ergebnis erkannt wurde
recognition.onresult = function (event) {
  var word = event.results[0][0].transcript;
  if (word.toLowerCase() === 'weiter') {
    scrollDown();
  }
};

// Erstellen eines neuen SpeechSynthesisUtterance-Objekts
var msg = new SpeechSynthesisUtterance();

// Einstellen der Sprache
msg.lang = 'de-DE';

// Einstellen des Texts
msg.text = 'Sagen Sie "weiter" um die Seite weiterzuleiten';

// Erstellen einer Funktion zum Starten der Sprachausgabe
function startSpeech() {
  console.log('startSpeech()');
  speechSynthesis.speak(msg);
}

// Starten der Sprachausgabe
startSpeech();

console.log(window.SpeechRecognition || window.webkitSpeechRecognition);
