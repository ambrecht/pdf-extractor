import { useState, useEffect } from 'react';
const Teleprompter = ({ text }) => {
  const [isListening, setIsListening] = useState(false);
  useEffect(() => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.onstart = () => {
      setIsListening(true);
    };
    recognition.onend = () => {
      setIsListening(false);
    };
    recognition.onresult = (event) => {
      let interimText = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          setText((text) => text + event.results[i][0].transcript);
        } else {
          interimText += event.results[i][0].transcript;
        }
      }
    };
    return () => {
      recognition.abort();
    };
  }, []);
  const startListening = () => {
    setIsListening(true);
    window.webkitSpeechRecognition.start();
  };
  const stopListening = () => {
    setIsListening(false);
    window.webkitSpeechRecognition.stop();
  };
  return (
    <div>
      <button onClick={startListening} disabled={isListening}>
        Start Listening
      </button>
      <button onClick={stopListening} disabled={!isListening}>
        Stop Listening
      </button>
      <p>{text}</p>
    </div>
  );
};
export default Teleprompter;

