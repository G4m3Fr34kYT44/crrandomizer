let cardsByRarity = {};

const cardImages = {
  "Knight": "knight.png",
  "Archers": "archers.png",
  "Goblins": "goblins.png",
  "Giant": "giant.png",
  "P.E.K.K.A": "pekka.png",
  "Minions": "minions.png",
  "Balloon": "balloon.png",
  "Witch": "witch.png",
  "Barbarians": "barbarians.png",
  "Skeleton Army": "skeleton-army.png",
  "Bomber": "bomber.png",
  "Musketeer": "musketeer.png",
  "Mini P.E.K.K.A": "mini-pekka.png",
  "Hog Rider": "hog-rider.png",
  "Valkyrie": "valkyrie.png",
  "Skeletons": "skeletons.png",
  "Cannon": "cannon.png",
  "Fireball": "fireball.png",
  "Arrows": "arrows.png",
  "Zap": "zap.png",
  "Freeze": "freeze.png",
  "Rocket": "rocket.png",
  "Lightning": "lightning.png",
  "Goblin Barrel": "goblin-barrel.png",
  "Mirror": "mirror.png",
  "Clone": "clone.png",
  "Rage": "rage.png",
  "Tornado": "tornado.png",
  "Graveyard": "graveyard.png",
  "Poison": "poison.png",
  "X-Bow": "x-bow.png",
  "Mortar": "mortar.png",
  "Tesla": "tesla.png",
  "Inferno Tower": "inferno-tower.png",
  "Bomb Tower": "bomb-tower.png",
  "Goblin Hut": "goblin-hut.png",
  "Barbarian Hut": "barbarian-hut.png",
  "Furnace": "furnace.png",
  "Elixir Collector": "elixir-collector.png",
  "Tombstone": "tombstone.png",
  "Battle Ram": "battle-ram.png",
  "Royal Giant": "royal-giant.png",
  "Elite Barbarians": "elite-barbarians.png",
  "Dark Prince": "dark-prince.png",
  "Prince": "prince.png",
  "Baby Dragon": "baby-dragon.png",
  "Inferno Dragon": "inferno-dragon.png",
  "Lumberjack": "lumberjack.png",
  "Mega Minion": "mega-minion.png",
  "Electro Wizard": "electro-wizard.png",
  "Bandit": "bandit.png",
  "Royal Ghost": "royal-ghost.png",
  "Magic Archer": "magic-archer.png",
  "Ram Rider": "ram-rider.png",
  "Fisherman": "fisherman.png",
  "Mother Witch": "mother-witch.png",
  "Skeleton King": "skeleton-king.png",
  "Golden Knight": "golden-knight.png",
  "Archer Queen": "archer-queen.png",
  "Monk": "monk.png",
  "Phoenix": "phoenix.png",
  "Goblin Giant": "goblin-giant.png",
  "Electro Giant": "electro-giant.png",
  "Sparky": "sparky.png",
  "Mega Knight": "mega-knight.png",
  "Royal Recruits": "royal-recruits.png",
  "Zappies": "zappies.png",
  "Flying Machine": "flying-machine.png",
  "Hunter": "hunter.png",
  "Cannon Cart": "cannon-cart.png",
  "Goblin Gang": "goblin-gang.png",
  "Dart Goblin": "dart-goblin.png",
  "Rascals": "rascals.png",
  "Firecracker": "firecracker.png",
  "Electro Spirit": "electro-spirit.png",
  "Ice Spirit": "ice-spirit.png",
  "Heal Spirit": "heal-spirit.png",
  "Ice Wizard": "ice-wizard.png",
  "Night Witch": "night-witch.png",
  "Bowler": "bowler.png",
  "Executioner": "executioner.png",
  "Goblin Drill": "goblin-drill.png",
  "Royal Delivery": "royal-delivery.png",
  "The Log": "the-log.png",
  "Barbarian Barrel": "barbarian-barrel.png"
};

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
    const imageFile = cardImages[card.name];
    const imageUrl = imageFile
      ? `https://royaleapi.github.io/cr-api-data/assets/cards/name/${imageFile}`
      : 'https://dummyimage.com/100x100/444/fff.png&text=?';

    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <img src="${imageUrl}" alt="${card.name}" />
      <div class="card-name">${card.name}</div>
    `;
    deckDiv.appendChild(div);
  });
}
