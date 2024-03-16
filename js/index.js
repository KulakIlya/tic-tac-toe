const combinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [1, 5, 9],
  [3, 5, 7],
  [3, 6, 9],
];

const app = document.querySelector('#app');

setAppMarkup(9);

let isFirstPlayer = true;

let chosenCells = [];

const firstPlayer = { playerName: 'Player 1', selected: [], sign: 'X' };
const secondPlayer = { playerName: 'Player 2', selected: [], sign: 'O' };

let selectedFirstPlayer = [];
let selectedSecondPlayer = [];

app.addEventListener('click', onCellClick);

function onCellClick(e) {
  const chosenCellNumber = Number(e.target.dataset.number);
  if (
    !e.target.classList.contains('cell') ||
    chosenCells.includes(chosenCellNumber)
  )
    return;

  const currentPlayer = isFirstPlayer ? firstPlayer : secondPlayer;

  e.target.innerText = currentPlayer.sign;

  chosenCells.push(chosenCellNumber);
  if (chosenCells.length === 9) fireToastAndRestart(null, true);

  pushToPlayerSelection(currentPlayer, chosenCellNumber);

  isFirstPlayer = !isFirstPlayer;
}

function pushToPlayerSelection({ playerName, selected }, chosenCell) {
  selected.push(chosenCell);

  if (selected.length >= 3) isWinner(selected, playerName);
}

function isWinner(selected, playerName) {
  return combinations.some(
    combinationsItem =>
      combinationsItem.every(item => selected.includes(item)) &&
      fireToastAndRestart(playerName, false)
  );
}

function fireToastAndRestart(playerName, isDraw) {
  const DURATION = 2000;
  if (!isDraw)
    Toastify({
      text: `${playerName} won!`,
      duration: DURATION,
      destination: 'https://github.com/apvarun/toastify-js',
      newWindow: true,
      close: true,
      gravity: 'top',
      position: 'left',
      stopOnFocus: true,
      style: {
        background: 'linear-gradient(to right, #00b09b, #96c93d)',
      },
    }).showToast();
  else {
    Toastify({
      text: 'Draw!',
      duration: DURATION,
      destination: 'https://github.com/apvarun/toastify-js',
      newWindow: true,
      close: true,
      gravity: 'top',
      position: 'left',
      stopOnFocus: true,
      style: {
        background: 'linear-gradient(to right, #df1b1b, #ba3030)',
      },
    }).showToast();
  }
  setTimeout(restart, DURATION);
}

function setAppMarkup(numberOfCells) {
  let markup = '';
  for (let i = 1; i <= numberOfCells; i++) {
    markup += `<div class="cell" data-number=${i}></div>`;
  }
  app.innerHTML = markup;
}

function restart() {
  chosenCells = [];
  firstPlayer.selected = [];
  secondPlayer.selected = [];
  setAppMarkup(9);
}
