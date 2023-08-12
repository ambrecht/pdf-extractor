import React, { useEffect, useState } from 'react';
import axios from 'axios';
const VoiceList = () => {
  const [voices, setVoices] = useState([]);
  useEffect(() => {
    // Stelle sicher, dass der API-Key korrekt gesetzt ist
    const apiKey = process.env.ELEVENLAPS_API_KEY;
    axios
      .get('https://api.elevenlabs.io/v1/voices', {
        headers: {
          'xi-api-key': apiKey,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setVoices(response.data.voices);
        } else {
          console.error('Fehler bei der Kommunikation mit der Eleven Labs API');
        }
      })
      .catch((error) => {
        console.error('Ein interner Fehler ist aufgetreten', error);
      });
  }, []); // Leeres Abhängigkeitsarray, damit der Effekt nur einmal ausgeführt wird
  return (
    <div>
      <h3>Verfügbare Stimmen:</h3>
      <ul>
        {voices.map((voice) => (
          <li key={voice.voice_id}>
            {voice.name} (ID: {voice.voice_id})
          </li>
        ))}
      </ul>
    </div>
  );
};
export default VoiceList;
