const game = {
  cards: [
    { color: "spade", name: "A", value: 11 },
    { color: "spade", name: "2", value: 2 },
    { color: "spade", name: "3", value: 3 },
    { color: "spade", name: "4", value: 4 },
    { color: "spade", name: "5", value: 5 },
    { color: "spade", name: "6", value: 6 },
    { color: "spade", name: "7", value: 7 },
    { color: "spade", name: "8", value: 8 },
    { color: "spade", name: "9", value: 9 },
    { color: "spade", name: "10", value: 10 },
    { color: "spade", name: "J", value: 10 },
    { color: "spade", name: "Q", value: 10 },
    { color: "spade", name: "K", value: 10 },
    { color: "club", name: "A", value: 11 },
    { color: "club", name: "2", value: 2 },
    { color: "club", name: "3", value: 3 },
    { color: "club", name: "4", value: 4 },
    { color: "club", name: "5", value: 5 },
    { color: "club", name: "6", value: 6 },
    { color: "club", name: "7", value: 7 },
    { color: "club", name: "8", value: 8 },
    { color: "club", name: "9", value: 9 },
    { color: "club", name: "10", value: 10 },
    { color: "club", name: "J", value: 10 },
    { color: "club", name: "Q", value: 10 },
    { color: "club", name: "K", value: 10 },
    { color: "diamond", name: "A", value: 11 },
    { color: "diamond", name: "2", value: 2 },
    { color: "diamond", name: "3", value: 3 },
    { color: "diamond", name: "4", value: 4 },
    { color: "diamond", name: "5", value: 5 },
    { color: "diamond", name: "6", value: 6 },
    { color: "diamond", name: "7", value: 7 },
    { color: "diamond", name: "8", value: 8 },
    { color: "diamond", name: "9", value: 9 },
    { color: "diamond", name: "10", value: 10 },
    { color: "diamond", name: "J", value: 10 },
    { color: "diamond", name: "Q", value: 10 },
    { color: "diamond", name: "K", value: 10 },
    { color: "heart", name: "A", value: 11 },
    { color: "heart", name: "2", value: 2 },
    { color: "heart", name: "3", value: 3 },
    { color: "heart", name: "4", value: 4 },
    { color: "heart", name: "5", value: 5 },
    { color: "heart", name: "6", value: 6 },
    { color: "heart", name: "7", value: 7 },
    { color: "heart", name: "8", value: 8 },
    { color: "heart", name: "9", value: 9 },
    { color: "heart", name: "10", value: 10 },
    { color: "heart", name: "J", value: 10 },
    { color: "heart", name: "Q", value: 10 },
    { color: "heart", name: "K", value: 10 }
  ],
  player: {
    cards: [],
    score: 0,
    hasWon: false,
    hasStarted: false,
    donePlaying: false
  },
  bank: {
    cards: [],
    score: 0,
    hasWon: false,
    hasStarted: false
  },
  distribute: function(who, whoNot) {
    const randomCard = Math.floor(Math.random() * this.cards.length);
    who.cards.push(this.cards[randomCard]);
    who.score = 0;
    who.cards.forEach(card => (who.score += card.value));
    if (who.score > 21) {
      let A = who.cards.filter(card => card.name === "A");
      A.forEach(a => (a.value = 1));
    }
    who.score = 0;
    who.cards.forEach(card => (who.score += card.value));
    if (who.score === 21) {
      who.hasWon = true;
    } else if (who.score > 21) {
      whoNot.hasWon = true;
    }
    who.hasStarted = true;
    this.cards.splice(randomCard, 1);
  }
};

function start() {
  if (game.player.hasStarted === false) {
    game.distribute(game.player, game.bank);
    game.distribute(game.player, game.bank);
    draw();
  } else {
    game.distribute(game.player, game.bank);
    draw();
  }
}

function next() {
  game.player.donePlaying = true;
  if (game.bank.hasStarted === false) {
    game.distribute(game.bank, game.player);
    game.distribute(game.bank, game.player);
    if (game.bank.score >= game.player.score && game.bank.score < 22) {
      game.bank.hasWon = true;
    }
    draw();
  } else {
    game.distribute(game.bank, game.player);
    if (game.bank.score >= game.player.score && game.bank.score < 22) {
      game.bank.hasWon = true;
    }
    draw();
  }
}

function draw() {
  document.getElementById("app").innerHTML = ``;
  document.getElementById("app").innerHTML = `
    ${
      game.player.hasWon
        ? `
      <div class="end-modal">
        <h1 class="win">PLAYER HAS WON THE GAME</h1>
        <a class="restart" href="/"><button>RESTART</button></a>
      </div>
    `
        : ``
    }
    ${
      game.bank.hasWon
        ? `
        <div class="end-modal">
        <h1 class="win">BANK HAS WON THE GAME</h1>
        <a class="restart" href="/"><button>RESTART</button></a>
      </div>
    `
        : ``
    }
    <div class="commands">
      <h2 class="score">score: ${game.player.score}</h2>
      <div class="buttons">
        ${
          game.player.hasStarted
            ? `<button class="next ${
                game.player.donePlaying ? `proceed` : ``
              }" onclick="next()">${
                game.player.donePlaying ? `Proceed...` : `Next Player</button>`
              }`
            : ""
        }
        ${
          game.bank.hasStarted
            ? ``
            : `
          <button class="start" onclick="start()">${
            game.player.hasStarted ? `Draw Another Card` : `Start The Game`
          }</button>
        `
        }
      </div>
      <h2 class="score">score: ${game.bank.score}</h2>
    </div>
    <div class="container">
      <div class="player">
        <div class="headline">
          <h2>Player</h2>
        </div>
        <div class="cards">
          ${game.player.cards.map(
            card => `
              <div
                class="game-card ${card.color}"
              >
                ${card.name}</div>
            `
          )}
        </div>
      </div>
      <div class="player">
        <div class="headline">
          <h2>Bank</h2>
        </div>
        <div class="cards">
        ${game.bank.cards.map(
          card => `
            <div
              class="game-card game-card-bank ${card.color}"
            >
              ${card.name}</div>
          `
        )}
        </div>
      </div>
  `;
}

draw();
