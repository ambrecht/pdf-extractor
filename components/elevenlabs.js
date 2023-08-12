import React, { useState } from 'react';
import axios from 'axios';
const TextToSpeech = ({ text, voice_id }) => {
  const [audioURL, setAudioURL] = useState(null);
  const handleTextToSpeech = () => {
    const singleLineText = text.replace(/\s*\n\s*/g, ' ').trim();
    axios
      .post('/api/text2speech', { text: singleLineText, voice_id })
      .then((response) => {
        if (response.status === 200) {
          // Construct the URL to the audio file
          const url = `/audio/${response.data.file}`;
          setAudioURL(url);
          // Create an audio element to play the file automatically
          const audioElement = new Audio(url);
          audioElement.play();
        } else {
          console.error('Fehler bei der Kommunikation mit der Eleven Labs API');
        }
      })
      .catch((error) => {
        console.error('Ein interner Fehler ist aufgetreten', error);
      });
  };
  return (
    <div>
      <button onClick={handleTextToSpeech}>Text to Speech</button>
      {audioURL && <audio autoPlay controls src={audioURL} type="audio/mpeg" />}
    </div>
  );
};
export default TextToSpeech;
