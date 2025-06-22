const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const response = await fetch("https://api.clashroyale.com/v1/cards", {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  });

  const data = await response.json();

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
  };
};

console.log("API_KEY:", process.env.API_KEY);