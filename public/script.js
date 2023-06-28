// =================== tic-tac-toe minimax =================== 
import { TicTacToe } from "./TicTacToe.js";
let game = new TicTacToe(3);

const PIECE = [' ', 'X', 'O'];

const SUCCESS = 1;
const INVALID = 0;

function announceResult(flag) {
  console.log(flag)
  if (game.winner === 0) {
    console.log(`The game has already ended in draw.`);
  } else {
    console.log(`Player "${PIECE[game.winner]}" already won.`);
  }
}

function makeMove(i, j, moveComputer = true) {
  if (!game.isFinish()) {
    const currentPlayer = game.currentPlayer;
    const moveResult = game.makeMove(i, j);

    if (moveResult === INVALID) {
      console.log('That is an invalid move');
      return;
    }

    document.getElementById('board').children[i * game.grid + j].innerText = PIECE[currentPlayer];

    if (moveComputer) {
      if (!game.isFinish()) {
        const computerPlayer = game.currentPlayer;
        const depthValue = Number(document.querySelector('.depth-value').value);
        console.log('computerPlayer = ', computerPlayer);
        console.log('depthValue = ', depthValue);
        const computerMove = game.minimax(computerPlayer, depthValue);
        document.getElementById('board').children[computerMove.idx_i * game.grid + computerMove.idx_j].innerText = PIECE[computerPlayer];
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
function generateCells () {
  htmlBoard.innerHTML = '';
  for (let i = 0; i < game.grid; ++i) {
    for (let j = 0; j < game.grid; ++j) {
      const htmlDiv = document.createElement("div");
      htmlDiv.addEventListener('click', () => makeMove(i, j));
      htmlDiv.className = 'cell';
      htmlBoard.appendChild(htmlDiv);
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