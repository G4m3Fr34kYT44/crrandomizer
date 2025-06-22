const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const response = await fetch("https://api.clashroyale.com/v1/cards", {
    headers: {
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImJjZjkyOGU2LTkzZmEtNDRiMS1iMTFhLTIxMjlmZDViZDNjNCIsImlhdCI6MTc1MDU5NzEwMCwic3ViIjoiZGV2ZWxvcGVyLzYxNzJhZWZhLTczMTctM2E0Ny1hMTg5LTA1MGM4OGI1OWQ4MyIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI0NS43OS4yMTguNzkiXSwidHlwZSI6ImNsaWVudCJ9XX0.uC8PdEMJRb412_3WedXwD_AyEg_q4gr_L3FssonrZ4ZEmbG3HfL-2YvReOWrWsSxqXZy8auoKfNh6rAyLXu_Xg`,
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
