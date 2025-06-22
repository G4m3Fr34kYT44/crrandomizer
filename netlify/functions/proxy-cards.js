const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const response = await fetch("https://api.clashroyale.com/v1/cards", {
    headers: {
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjA0MDhjNWI3LWY2M2QtNDhkNy1iZGFmLWVhMjFiN2NhZTQzMyIsImlhdCI6MTc1MDYwMDY1NSwic3ViIjoiZGV2ZWxvcGVyLzYxNzJhZWZhLTczMTctM2E0Ny1hMTg5LTA1MGM4OGI1OWQ4MyIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI0NS43OS4yMTguNzkiLCIxOC4yMjAuMjA4LjEiLCIzLjE0OC4yNTAuMjUyIl0sInR5cGUiOiJjbGllbnQifV19.YYTxR_vaWsCiiPw7QvZcQfHm3vsenFdXpaeI9KEMEpXL_ntmuWhlEuWMwIHdAgN7rdWVszqqqmAzCmYIo-CrrA`,
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