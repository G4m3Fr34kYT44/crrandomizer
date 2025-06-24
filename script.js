let cardsByRarity = {};

function enableButtons() {
  document.querySelectorAll('button').forEach(btn => btn.disabled = false);
  document.getElementById('loading').style.display = 'none';
}

fetch('/netlify/functions/proxy-cards')
  .then(res => res.json())
  .then(data => {
    const cards = data.items;
    cardsByRarity = cards.reduce((acc, card) => {
      const rarity = card.maxLevel === 14 ? 'Common' :
                     card.maxLevel === 12 ? 'Rare' :
                     card.maxLevel === 9  ? 'Epic' :
                     card.maxLevel === 6  ? 'Legendary' :
                     card.maxLevel === 3  ? 'Champion' :
                     'Unknown';
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

  if (!pool.length) return alert('No cards available for this rarity.');

  const deck = [];
  const used = new Set();
  let hasChampion = false;

  while (deck.length < 8 && used.size < pool.length) {
    const card = pool[Math.floor(Math.random() * pool.length)];
    if (!card || used.has(card.id)) continue;
    if (card.maxLevel === 3 && hasChampion) continue;

    deck.push(card);
    used.add(card.id);
    if (card.maxLevel === 3) hasChampion = true;
  }

  const deckDiv = document.getElementById('deck');
  deckDiv.innerHTML = '';
  deck.forEach(card => {
    const imageKey = card.name.toLowerCase().replace(/[\s.'"]/g, '-').replace(/-+/g, '-');
    const imageUrl = `https://royaleapi.github.io/cr-api-data/assets/cards/name/${imageKey}.png`;

    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${imageUrl}" alt="${card.name}" onerror="this.style.display='none'" />
      <div class="card-name">${card.name}</div>
    `;
    deckDiv.appendChild(div);
  });
}
