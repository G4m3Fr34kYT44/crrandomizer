let cardsByRarity = {};

function enableButtons() {
  document.querySelectorAll('button').forEach(btn => btn.disabled = false);
  document.getElementById('loading').style.display = 'none';
}

fetch('https://royaleapi.github.io/cr-api-data/json/cards.json')
  .then(res => res.json())
  .then(data => {
    cardsByRarity = data.cards.reduce((acc, card) => {
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
    const cardRarity = card.rarity;

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
