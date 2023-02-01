const axios = require('axios');

const prompt = 'What is the capital of Germany?';
const openai_api_key = 'YOUR_API_KEY_HERE';

// Use axios to send a request to the OpenAI API
axios
  .post(
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
  )
  .then((response) => {
    const answer = response.data.choices[0].text;
    console.log(answer);
  })
  .catch((error) => {
    console.log(error);
  });
