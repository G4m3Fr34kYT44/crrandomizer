const fetch = require('node-fetch'); // Automatically available in Netlify Node env

exports.handler = async function () {
  const API_KEY = process.env.CLASH_API_KEY;
  try {
    const response = await fetch('https://api.clashroyale.com/v1/cards', {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: `Failed to fetch cards: ${response.statusText}` }),
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
