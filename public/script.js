// =================== tic-tac-toe minimax ===================
import { TicTacToe } from './TicTacToe.js';
let game = new TicTacToe(3);

const PIECE = [' ', '&#10005;', '&#9711;'];

const SUCCESS = 1;
const INVALID = 0;

function announceResult(flag) {
  console.log(flag);
  if (game.winner === 0) {
    htmlMessage.innerText = 'Game ended in a draw.';
    htmlMessage.style.color = 'yellow';
    htmlMessage.style.fontSize = '1.15em';
    htmlMessage.style.fontWeight = 'bolder';
  } else {
    htmlMessage.innerHTML = `Player ${PIECE[game.winner]} won.`;
    htmlMessage.style.color = 'lightgreen';
    htmlMessage.style.fontSize = '1.15em';
    htmlMessage.style.fontWeight = 'bolder';
  }
}

const htmlMessage = document.querySelector('.message');

function makeMove(i, j, moveComputer = true) {
  if (!game.isFinish()) {
    htmlMessage.innerText = '';
    const currentPlayer = game.currentPlayer;
    const moveResult = game.makeMove(i, j);

    if (moveResult === INVALID) {
      htmlMessage.innerText = 'INVALID MOVE!';
      htmlMessage.style.color = 'red';
      htmlMessage.style.fontSize = '1.5em';
      htmlMessage.style.fontWeight = 'bolder';
      return;
    }

    [...document.querySelectorAll('#board > .cell')][i * game.grid + j].innerHTML = PIECE[currentPlayer];

    if (moveComputer) {
      if (!game.isFinish()) {
        const computerPlayer = game.currentPlayer;
        const depthValue = Number(document.querySelector('.depth-value').value);
        const computerMove = game.minimax(computerPlayer, depthValue);
        [...document.querySelectorAll('#board > .cell')][
          computerMove.idx_i * game.grid + computerMove.idx_j
        ].innerHTML = PIECE[computerPlayer];

        game.makeMove(computerMove.idx_i, computerMove.idx_j);

        if (game.isFinish()) {
          announceResult('last else');
        }
      } else {
        announceResult('secondary else');
      }
    }
  } else {
    announceResult('main else');
  }

  game.display();
}

// =================== html initialization ===================
const htmlBoard = document.querySelector('.board');
const htmlGridSize = document.querySelector('.grid-size');

// grid size selector
htmlGridSize.addEventListener('change', () => {
  const newGridSize = Number(htmlGridSize.value);
  if (newGridSize === 3) {
    document.querySelector('.depth-value').value = 10;
  } else if (newGridSize === 4) {
    document.querySelector('.depth-value').value = 5;
  } else if (newGridSize === 5) {
    document.querySelector('.depth-value').value = 4;
  } else if (newGridSize >= 6) {
    document.querySelector('.depth-value').value = 3;
  }

  setNewGame(
    newGridSize,
    'The depth was changed for optimal calculation speed. ' +
      'You can change the depth on your own, but keep in mind ' +
      'a higher "depth and grid" values will cause the computer to take ' +
      'more time to move.'
  );
});

// generate squares in the board
function generateCells() {
  htmlBoard.innerHTML = '';
  for (let i = 0; i < game.grid; ++i) {
    for (let j = 0; j < game.grid; ++j) {
      const htmlSpan = document.createElement('span');
      htmlSpan.addEventListener('click', () => makeMove(i, j));
      htmlSpan.className = 'cell';
      htmlSpan.innerHTML = '&#8203;';
      htmlBoard.appendChild(htmlSpan);
    }
  }

  htmlBoard.style.gridTemplateColumns = `repeat(${game.grid}, 1fr)`;
}

generateCells();

// new game button
const htmlNewGameBtn = document.querySelector('.new-game');

htmlNewGameBtn.addEventListener('click', () => {
  setNewGame(game.grid);
});

function setNewGame(gridSize, msg = '') {
  htmlMessage.innerText = msg;
  htmlMessage.style.fontSize = '0.9em';
  htmlMessage.style.color = 'white';
  game = new TicTacToe(gridSize);
  generateCells();
}
