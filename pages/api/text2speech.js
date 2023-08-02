import fs from 'fs';
import path from 'path';
import axios from 'axios';

export default async function text2speech(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Only allow POST requests
  }

  const { text, voice_id } = req.body;

  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`,
      {
        text,
        model_id: 'eleven_multilingual_v1',
        voice_settings: {
          stability: 0,
          similarity_boost: 0,
        },
      },
      {
        headers: {
          'accept': 'audio/mpeg',
          'xi-api-key': process.env.ELEVENLAPS_API_KEY,
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      },
    );

    if (response.status !== 200) {
      console.error('Error response from server:', response);
      throw new Error('Something went wrong');
    }

    const buffer = Buffer.from(response.data);
    const file = Math.random().toString(36).substring(7);
    const directoryPath = path.join('public', 'audio');

    // Ensure the directory exists
    fs.mkdirSync(directoryPath, { recursive: true });

    fs.writeFile(path.join(directoryPath, `${file}.mp3`), buffer, (err) => {
      if (err) {
        console.error('File writing error', err);
        return res.status(500).json({ error: 'File writing error' });
      }
      console.log('File written successfully');
      return res.status(200).json({ file: `${file}.mp3` });
    });
  } catch (error) {
    console.error('Request error:', error);
    return res
      .status(error.response?.status || 500)
      .json({ error: error.message });
  }
}
