// =================== html initialization ===================
const PIECE = [' ', '&#10005;', '&#9711;'];

const htmlBoard = document.querySelector('.board');
const htmlGridSelect = document.querySelector('.grid-size');
const htmlWinCountSelect = document.querySelector('.win-piece-count');
const htmlPlayerSelect = document.querySelector('.player-select');
const htmlNewGameBtn = document.querySelector('.new-game');
const htmlMessage = document.querySelector('.message');
const htmlDepthInput = document.querySelector('.depth-value');
let htmlBoardCells = [...document.querySelectorAll('#board > .cell')];

// =================== tic-tac-toe minimax integration ===================
import { TicTacToe } from './TicTacToe.js';

let game;
setNewGame('Click a square');

const INVALID = 0;

function announceResult(debugMessages) {
  console.debug(debugMessages);
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

    htmlBoardCells[i * game.grid + j].innerHTML = PIECE[currentPlayer];

    if (moveComputer) {
      if (!game.isFinish()) {
        const computerPlayer = game.currentPlayer;
        const computerMove = game.minimax(computerPlayer, htmlDepthInput.value);
        htmlBoardCells[computerMove.idx_i * game.grid + computerMove.idx_j].innerHTML = PIECE[computerPlayer];

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

htmlPlayerSelect.addEventListener('change', () => {
  const selectedPlayer = Number(htmlPlayerSelect.value);
  if (selectedPlayer === 1) {
    setNewGame('New game, both computer playing');
  } else if (selectedPlayer === 2) {
    setNewGame('New game, you are playing as X');
  } else {
    setNewGame('New game, you are playing as O');

    const moves = game.computerAutoPlay(Number(htmlDepthInput.value));
    for (let move of moves) {
      // works but instantanously, not as intended,
      // fix this later and make it look real time updates.
      htmlBoardCells[move.idx_i * game.grid + move.idx_j].innerHTML = PIECE[move.computerPiece];
    }

    announceResult();
  }
});

htmlWinCountSelect.addEventListener('change', () => {
  setNewGame('New game, with new piece win count');
});

htmlWinCountSelect.addEventListener('change', () => {
  setNewGame('New game, with new piece win count');
});

// grid size selector
htmlGridSelect.addEventListener('change', () => {
  const newGridSize = Number(htmlGridSelect.value);
  if (newGridSize === 3) {
    htmlDepthInput.value = 10;
  } else if (newGridSize === 4) {
    htmlDepthInput.value = 5;
  } else if (newGridSize === 5) {
    htmlDepthInput.value = 4;
  } else if (newGridSize >= 6) {
    htmlDepthInput.value = 3;
  }

  htmlWinCountSelect.innerHTML = '';
  for (let i = newGridSize; i > 1; --i) {
    const newOptions = document.createElement('option');
    newOptions.label = i;
    newOptions.value = i;
    htmlWinCountSelect.appendChild(newOptions);
  }

  setNewGame(
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

      if (game.board[i * game.grid + j] !== '') {
        htmlSpan.innerHTML = PIECE[game.board[i * game.grid + j]];
      } else {
        htmlSpan.innerHTML = '&#8203;';
      }
      htmlBoard.appendChild(htmlSpan);
    }
  }

  htmlBoard.style.gridTemplateColumns = `repeat(${game.grid}, 1fr)`;
  htmlBoard.style.gridTemplateRows = `repeat(${game.grid}, 1fr)`;

  htmlBoardCells = [...document.querySelectorAll('#board > .cell')];
}

generateCells();

htmlNewGameBtn.addEventListener('click', () => {
  setNewGame();
});

function setNewGame(msg = '') {
  htmlMessage.innerText = msg;
  htmlMessage.style.fontSize = '0.9em';
  htmlMessage.style.color = 'white';

  game = new TicTacToe({
    gridLength: Number(htmlGridSelect.value),
    winCount: Number(htmlWinCountSelect.value),
    player: Number(htmlPlayerSelect.value),
  });

  generateCells();

  if (htmlPlayerSelect.value === '0') {
    const moves = game.computerAutoPlay(Number(htmlDepthInput.value));
    for (let move of moves) {
      // works but instantanously, not as intended,
      // fix this later and make it look real time updates.
      htmlBoardCells[move.idx_i * game.grid + move.idx_j].innerHTML = PIECE[move.computerPiece];
    }

    announceResult();
  }
}
