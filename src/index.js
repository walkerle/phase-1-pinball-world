// Globals
const baseUrl = 'http://localhost:3000/games'
let currentGame = []; // game "state"

// DOM Selectors
const gameList = document.querySelector('.game-list');
const detailImage = document.querySelector('#detail-image');
const detailTitle = document.querySelector('#detail-title');
const detailHighScore = document.querySelector('#detail-high-score');
const highScoreForm = document.querySelector('#high-score-form');

// Fetch Functions
function getGames(url) {
  fetch(url)
  .then(res => res.json())
  .then(data => {
    // console.log(data);
    renderGames(data);
    renderOneGame(data[0]);
  })
}

// Render Functions
function renderGames(games) {
  // console.log(games);
  games.forEach(game => {
    const gameName = document.createElement('h5');
    gameName.textContent = `${game.name} (${game.manufacturer_name})`
    gameList.appendChild(gameName);

    gameName.style.cursor = 'pointer'; // makes hovering a pointer cursor

    // Event Listener: Click on game
    // console.log(game);
    gameName.addEventListener("click", () => renderOneGame(game));
  })
}

function renderOneGame(gameData) {
  // console.log(gameData);
  currentGame = gameData;
  // detailImage.src = gameData.image;
  // detailImage.alt = gameData.name;
  // detailTitle.textContent = gameData.name;
  // detailHighScore.textContent = gameData.high_score;

  // Alternate Solution
  detailImage.src = currentGame.image;
  detailImage.alt = currentGame.name;
  detailTitle.textContent = currentGame.name;
  detailHighScore.textContent = currentGame.high_score;
}

// Event Listeners/Handlers:

// Event Listener: Form submit
highScoreForm.addEventListener('submit', formSubmit);

// Event Handler: Form submit
function formSubmit(e) {
  e.preventDefault();

  // console.log(e.target['score-input'].value);
  detailHighScore.textContent = e.target['score-input'].value;
  
  // console.log(currentGame.high_score);
  currentGame.high_score = Number(e.target['score-input'].value);

  // Backend handler
  // console.log(currentGame.id);
  fetch(`http://localhost:3000/games/${currentGame.id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(currentGame)
  })
  .then(res => res.json())
  // .then(data => console.log(data))

  highScoreForm.reset()
}

// Initializers
getGames(baseUrl);

// COMPLETED WITHIN 60 MINS!