// =================== tic-tac-toe minimax =================== 
// console.log('loaded tic-tac-toe');
const piece = [' ', 'X', 'O'];
const EMPTY = 0;

let boardSideLength = 3;

let board = new Uint8Array(boardSideLength * boardSideLength);
board.fill(0);

const empty = 0;
const noWinner = 0;
const player1 = 1;
const player2 = 2;

let currentPlayer = player1;
let winner = 0;
let minimaxCalls = 0;
let moveCount = 0;

let depthLevel = 8;

function makeMove(i, j, moveComputer = true) {
  // console.log('a move');
  if (board[i * boardSideLength + j] === empty && winner === noWinner) {
    document.getElementById('board').children[i * boardSideLength + j].innerText = piece[currentPlayer];
    board[i * boardSideLength + j] = currentPlayer;

    winner = checkWinner(board);
    // console.log('winner = ', winner);
    if (winner !== noWinner) {
      // console.log(`Player ${winner} already wins!`);
      return;
    }

    currentPlayer = (currentPlayer === player1) ? player2 : player1;

    if (currentPlayer === player2 && moveComputer) {
      const move = minimax(board, player2, depthLevel);
      // console.log('turn minmax move : ', move);
      // console.log('minimax calls = ', minimaxCalls);
      minimaxCalls = 0;
      makeMove(move.i, move.j);
    }
  } else {
    // console.log('invalid move');
  }
}

// console.log(makeMove);

function generateMoves(currentBoard) {
  const possibleMoves = [];
  for (let i = 0; i < boardSideLength; ++i) {
    for (let j = 0; j < boardSideLength; ++j) {
      if (currentBoard[i * boardSideLength + j] === empty) {
        possibleMoves.push({ i: i, j: j });
      }
    }
  }

  return possibleMoves;
}

function minimax(nodeBoard, maximizingPlayer, depth) {
  minimaxCalls++;
  // console.log('minimax calls | current depth : ', minimaxCalls, ' | ', depth);
  const availableMoves = generateMoves(nodeBoard);
  const nodeBestMove = { score: null, i: null, j: null };

  const nodeWinner = checkWinner(nodeBoard);
  if (nodeWinner === player1) {
    nodeBestMove.score = 1;
    return nodeBestMove;
  } else if (nodeWinner === player2) {
    nodeBestMove.score = -1;
    return nodeBestMove;
  } else if (availableMoves.length === 0) {
    nodeBestMove.score = 0;
    return nodeBestMove;
  }

  if (depth === 0) {
    // console.log('depth reach');
    return nodeBestMove;
  }

  if (maximizingPlayer === player1) {
    nodeBestMove.score = -Infinity;
    for (let i = 0; i < availableMoves.length; ++i) {
      nodeBoard[availableMoves[i].i * boardSideLength + availableMoves[i].j] = player1;
      const value = minimax(nodeBoard, player2, depth - 1).score;
      if (value > nodeBestMove.score) {
        nodeBestMove.score = value;
        nodeBestMove.i = availableMoves[i].i;
        nodeBestMove.j = availableMoves[i].j;
      }
      nodeBoard[availableMoves[i].i * boardSideLength + availableMoves[i].j] = empty;
    }
  } else {
    nodeBestMove.score = Infinity;
    for (let i = 0; i < availableMoves.length; ++i) {
      nodeBoard[availableMoves[i].i * boardSideLength + availableMoves[i].j] = player2;
      const value = minimax(nodeBoard, player1, depth - 1).score;
      if (value < nodeBestMove.score) {
        nodeBestMove.score = value;
        nodeBestMove.i = availableMoves[i].i;
        nodeBestMove.j = availableMoves[i].j;
      }
      nodeBoard[availableMoves[i].i * boardSideLength + availableMoves[i].j] = empty;
    }
  }

  return nodeBestMove;
}

function display(board) {
  // console.log('=======================');
  // console.log('Current board state');
  for (let i = 0; i < boardSideLength; ++i) {
    const row = [];
    for (let j = 0; j < boardSideLength; ++j) {
      row.push(board[i * boardSideLength + j]);
    }
    // console.log(row);
  }
}

function checkWinner(board) {
  // check row -
  for (let i = 0; i < boardSideLength; ++i) {
    for (let j = 1; j < boardSideLength; ++j) {
      if (
        board[i * boardSideLength + (j - 1)] === board[i * boardSideLength + j] &&
        board[i * boardSideLength + j] !== empty
      ) {
        if (j === boardSideLength - 1) {
          return board[i * boardSideLength + j];
        }
      } else {
        break;
      }
    }
  }

  // check columns |
  for (let j = 0; j < boardSideLength; ++j) {
    for (let i = 1; i < boardSideLength; ++i) {
      if (
        board[(i - 1) * boardSideLength + j] === board[i * boardSideLength + j] &&
        board[i * boardSideLength + j] !== empty
      ) {
        if (i === boardSideLength - 1) {
          return board[i * boardSideLength + j];
        }
      } else {
        break;
      }
    }
  }

  // check diag \
  for (let i = 1; i < boardSideLength; ++i) {
    if (
      board[(i - 1) * boardSideLength + (i - 1)] === board[i * boardSideLength + i] &&
      board[i * boardSideLength + i] !== empty
    ) {
      if (i === boardSideLength - 1) {
        return board[i * boardSideLength + i];
      }
    } else {
      break;
    }
  }

  // check diag /
  const diagStep = boardSideLength - 1;
  for (let i = 1; i < boardSideLength; ++i) {
    if (board[(i + 1) * diagStep] === board[i * diagStep] && board[i * diagStep] !== empty) {
      if (i === boardSideLength - 1) {
        return board[i * diagStep];
      }
    } else {
      break;
    }
  }

  return empty;
}

// =================== html initialization ===================
const htmlBoard = document.querySelector('.board');
const htmlSelect = document.querySelector('.side-length');

// grid size selector
htmlSelect.addEventListener('change', () => {
  boardSideLength = Number(htmlSelect.value);
  setNewGame();
});

// generate squares in the board
function generateCells () {
  htmlBoard.innerHTML = '';
  for (let i = 0; i < boardSideLength; ++i) {
    for (let j = 0; j < boardSideLength; ++j) {
      const htmlDiv = document.createElement("div");
      htmlDiv.addEventListener('click', () => makeMove(i, j));
      htmlDiv.className = 'cell';
      htmlBoard.appendChild(htmlDiv);
    }
  }

  htmlBoard.style.gridTemplateColumns = `repeat(${boardSideLength}, 1fr)`;
}

generateCells();

// new game button
const htmlNewGameBtn = document.querySelector('.new-game');
htmlNewGameBtn.addEventListener('click', () => {
  // console.log('new game');
  setNewGame();
});

function setNewGame() {
  board = new Uint8Array(boardSideLength * boardSideLength);
  board.fill(empty);
  winner = noWinner;
  currentPlayer = player1;

  generateCells();
  // console.log(boardSideLength);
}

export { checkWinner, generateMoves, makeMove };