let cardsByRarity = {};

function enableButtons() {
  document.querySelectorAll('button').forEach(btn => btn.disabled = false);
  document.getElementById('loading').style.display = 'none';
}

fetch('cards.json')
  .then(res => res.json())
  .then(data => {
    cardsByRarity = data.reduce((acc, card) => {
      const rarity = card.rarity;
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
    if (!card || !card.id || used.has(card.id)) continue;

    if (card.rarity === 'Champion' && hasChampion) continue;

    deck.push(card);
    used.add(card.id);
    if (card.rarity === 'Champion') hasChampion = true;
  }

  const deckDiv = document.getElementById('deck');
  deckDiv.innerHTML = '';
  deck.forEach(card => {
    const imageUrl = card.iconUrls?.medium || `images/${card.name.replace(/\s+/g, '_')}.png`;
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${imageUrl}" alt="${card.name}" />
      <div class="card-name">${card.name}</div>
    `;
    deckDiv.appendChild(div);
  });
}
