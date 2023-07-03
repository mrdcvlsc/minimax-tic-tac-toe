// this file is only added to show how to use the TicTacToe.js

// =================== html initialization ===================

const PIECE = [' ', '&#10005;', '&#9711;'];
const INVALID = 0,
  DRAW = 0,
  COMPUTERS = '0';

const BOARD = document.querySelector('.board');
const SELECT_GRID = document.querySelector('.grid-size');
const SELECT_WIN_COUNT = document.querySelector('.win-piece-count');
const SELECT_PLAYER = document.querySelector('.player-select');
const BUTTON_NEW_GAME = document.querySelector('.new-game');
const DISPLAY_MSG = document.querySelector('.message');
const INPUT_DEPTH = document.querySelector('.depth-value');

let squares;

// =================== minimax tic-tac-toe ===================

import { TicTacToe } from './TicTacToe.js';
let Game = null;

// =================== game initialization ===================

setNewGame('Click a square');
generateCells();

// =================== events ===================

SELECT_PLAYER.addEventListener('change', () => {
  const selectedPlayer = Number(SELECT_PLAYER.value);

  if (selectedPlayer === 1) {
    setNewGame('New game, both computer playing');
  } else if (selectedPlayer === 2) {
    setNewGame("New game, you're playing as X");
  } else {
    setNewGame("New game, you're playing as O");

    const moves = Game.computerAutoPlay(INPUT_DEPTH.value ? Number(INPUT_DEPTH.value) : 0);

    for (let move of moves) {
      // works but instantanously, not as intended,
      // fix this later and make it look real time updates.
      squares[move.idx_i * Game.grid + move.idx_j].innerHTML = PIECE[move.computerPiece];
    }

    announceResult();
  }
});

SELECT_WIN_COUNT.addEventListener('change', () => {
  setNewGame('New game, with new piece win count');
});

// grid size selector
SELECT_GRID.addEventListener('change', () => {
  const newGridSize = Number(SELECT_GRID.value);

  if (newGridSize === 3) {
    INPUT_DEPTH.value = 10;
  } else if (newGridSize === 4) {
    INPUT_DEPTH.value = 5;
  } else if (newGridSize === 5) {
    INPUT_DEPTH.value = 4;
  } else if (newGridSize >= 6) {
    INPUT_DEPTH.value = 3;
  }

  SELECT_WIN_COUNT.innerHTML = '';
  for (let i = newGridSize; i > 1; --i) {
    const newOptions = document.createElement('option');
    newOptions.label = i;
    newOptions.value = i;
    SELECT_WIN_COUNT.appendChild(newOptions);
  }

  setNewGame(
    'The depth has been optimized in relation to the grid value to ' +
      'improve the calculation speed. You can adjust the depth value, ' +
      'but keep in mind that higher values for "depth and grid" will ' +
      'will take more time to calculate or might even crash the page.'
  );
});

BUTTON_NEW_GAME.addEventListener('click', () => {
  setNewGame();
});

// =================== functions ===================

function setNewGame(msg = '') {
  Game = new TicTacToe({
    gridLength: Number(SELECT_GRID.value),
    winCount: Number(SELECT_WIN_COUNT.value),
    player: Number(SELECT_PLAYER.value),
  });

  generateCells();

  DISPLAY_MSG.innerText = msg;
  DISPLAY_MSG.style.fontSize = '0.9em';
  DISPLAY_MSG.style.color = 'white';

  if (SELECT_PLAYER.value === COMPUTERS) {
    const computerMoves = Game.computerAutoPlay(INPUT_DEPTH.value ? Number(INPUT_DEPTH.value) : 0);

    for (let move of computerMoves) {
      // works but instantanously, not as intended,
      // fix this later and make it look real time updates.
      squares[move.idx_i * Game.grid + move.idx_j].innerHTML = PIECE[move.computerPiece];
    }

    announceResult();
  }
}

// generate squares in the board
function generateCells() {
  BOARD.innerHTML = '';
  BOARD.style.gridTemplateColumns = `repeat(${Game.grid}, 1fr)`;
  BOARD.style.gridTemplateRows = `repeat(${Game.grid}, 1fr)`;

  for (let i = 0; i < Game.grid; ++i) {
    for (let j = 0; j < Game.grid; ++j) {
      const square = document.createElement('span');
      square.className = 'cell';
      square.style.animationDelay = `${i * 0.1 + j * 0.1 + 0.1}s`;

      square.addEventListener('click', () => makeMove(i, j));

      if (Game.board[i * Game.grid + j] !== '') {
        square.innerHTML = PIECE[Game.board[i * Game.grid + j]];
      } else {
        square.innerHTML = '&#8203;';
      }

      BOARD.appendChild(square);
    }
  }

  squares = [...document.querySelectorAll('#board > .cell')];
}

function makeMove(i, j, moveComputer = true) {
  if (!Game.isFinish()) {
    DISPLAY_MSG.innerText = '';
    const currentPlayer = Game.currentPlayer;
    const move = Game.makeMove(i, j);

    if (move === INVALID) {
      DISPLAY_MSG.innerText = 'INVALID MOVE!';
      DISPLAY_MSG.style.color = 'red';
      DISPLAY_MSG.style.fontSize = '1.5em';
      DISPLAY_MSG.style.fontWeight = 'bolder';
      return;
    }

    squares[i * Game.grid + j].innerHTML = PIECE[currentPlayer];

    if (moveComputer) {
      if (!Game.isFinish()) {
        const computer = Game.currentPlayer;
        const optimalMove = Game.minimax(computer, INPUT_DEPTH.value);

        squares[optimalMove.idx_i * Game.grid + optimalMove.idx_j].innerHTML = PIECE[computer];
        Game.makeMove(optimalMove.idx_i, optimalMove.idx_j);

        if (Game.isFinish()) {
          announceResult();
        }
      } else {
        announceResult();
      }
    }
  } else {
    announceResult();
  }
}

function announceResult(debugMessages) {
  console.debug(debugMessages);
  if (Game.winner === DRAW) {
    DISPLAY_MSG.innerText = 'Game ended in a draw.';
    DISPLAY_MSG.style.color = 'yellow';
    DISPLAY_MSG.style.fontSize = '1.15em';
    DISPLAY_MSG.style.fontWeight = 'bolder';
  } else {
    DISPLAY_MSG.innerHTML = `Player ${PIECE[Game.winner]} won.`;
    DISPLAY_MSG.style.color = 'lightgreen';
    DISPLAY_MSG.style.fontSize = '1.15em';
    DISPLAY_MSG.style.fontWeight = 'bolder';
  }
}
