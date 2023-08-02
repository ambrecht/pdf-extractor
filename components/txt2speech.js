import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const TextToSpeech = ({ text, voice_id, onEnd }) => {
  const [audioURL, setAudioURL] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const singleLineText = text.replace(/\s*\n\s*/g, ' ').trim();

    axios
      .post('/api/text2speech', { text: singleLineText, voice_id })
      .then((response) => {
        if (response.status === 200) {
          // Construct the URL to the audio file
          const url = `/audio/${response.data.file}`;
          setAudioURL(url);
        } else {
          console.error('Fehler bei der Kommunikation mit der Eleven Labs API');
        }
      })
      .catch((error) => {
        console.error('Ein interner Fehler ist aufgetreten', error);
      });
  }, [text, voice_id]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('ended', onEnd);
      return () => {
        if (audioRef.current) {
          // Überprüfen, ob audioRef.current nicht null ist
          audioRef.current.removeEventListener('ended', onEnd);
        }
      };
    }
  }, [audioURL, onEnd]);

  return (
    <div>
      {audioURL && (
        <audio ref={audioRef} autoPlay controls>
          <source src={audioURL} type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
};

export default TextToSpeech;
