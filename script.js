const apiKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjA0MDhjNWI3LWY2M2QtNDhkNy1iZGFmLWVhMjFiN2NhZTQzMyIsImlhdCI6MTc1MDYwMDY1NSwic3ViIjoiZGV2ZWxvcGVyLzYxNzJhZWZhLTczMTctM2E0Ny1hMTg5LTA1MGM4OGI1OWQ4MyIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI0NS43OS4yMTguNzkiLCIxOC4yMjAuMjA4LjEiLCIzLjE0OC4yNTAuMjUyIl0sInR5cGUiOiJjbGllbnQifV19.YYTxR_vaWsCiiPw7QvZcQfHm3vsenFdXpaeI9KEMEpXL_ntmuWhlEuWMwIHdAgN7rdWVszqqqmAzCmYIo-CrrA';
let cardsByRarity = {};

function enableButtons() {
  document.querySelectorAll('button').forEach(btn => btn.disabled = false);
  document.getElementById('loading').style.display = 'none';
}

fetch('https://royaleapi.github.io/cr-api-data/json/cards.json')
  .then(res => res.json())
  .then(data => {
    cardsByRarity = data.reduce((acc, card) => {
      const rarity =
        card.maxLevel === 14 ? 'Common' :
        card.maxLevel === 12 ? 'Rare' :
        card.maxLevel === 9  ? 'Epic' :
        card.maxLevel === 6  ? 'Legendary' :
        card.maxLevel === 4  ? 'Champion' :
        'Other';
      if (!acc[rarity]) acc[rarity] = [];
      acc[rarity].push(card);
      return acc;
    }, {});
    enableButtons();
  })
  .catch(err => {
    console.error('Failed to load cards:', err);
    document.getElementById('loading').textContent = 'Failed to load cards.';
  });

function generateDeck(rarity) {
  const pool = rarity === 'Mixed'
    ? Object.values(cardsByRarity).flat()
    : cardsByRarity[rarity] || [];

  if (!pool.length) {
    alert('No cards available for this rarity.');
    return;
  }

  const deck = [];
  const used = new Set();
  let hasChampion = false;

  while (deck.length < 8 && used.size < pool.length) {
    const card = pool[Math.floor(Math.random() * pool.length)];
    const cardRarity =
      card.maxLevel === 14 ? 'Common' :
      card.maxLevel === 12 ? 'Rare' :
      card.maxLevel === 9  ? 'Epic' :
      card.maxLevel === 6  ? 'Legendary' :
      card.maxLevel === 4  ? 'Champion' :
      'Other';

    if (!used.has(card.id)) {
      if (cardRarity === 'Champion') {
        if (hasChampion) continue;
        hasChampion = true;
      }
      deck.push(card);
      used.add(card.id);
    }
  }

  const deckDiv = document.getElementById('deck');
  deckDiv.innerHTML = '';
  deck.forEach(card => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${card.iconUrls.medium}" alt="${card.name}" />
      <div class="card-name">${card.name}</div>
    `;
    deckDiv.appendChild(div);
  });
}
