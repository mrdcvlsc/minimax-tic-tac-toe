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
  setNewGame(Number(htmlGridSize.value));
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

function setNewGame(gridSize) {
  game = new TicTacToe(gridSize);
  generateCells();
}
