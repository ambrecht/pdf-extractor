import React, { useState } from 'react';
import axios from 'axios';

const ChatGPT = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState(null);
  const openai_api_key = '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';

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci-codex/completions',
        {
          prompt: prompt,
          max_tokens: 2048,
          temperature: 0.5,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openai_api_key}`,
          },
        },
      );
      setResponse(response.data.choices[0].text);
    } catch (err) {
      console.error(err);
      alert('An error occurred, please try again');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your prompt"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {response !== null ? <div>{response}</div> : null}
    </div>
  );
};

export default ChatGPT;
