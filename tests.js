const { TicTacToe, NA, P1, P2 } = require('./public/TicTacToe');

const t = new TicTacToe(3);
let failedTests = 0;

const winners = [NA, P1, P1, P1, P1, P1, P1, P2, P2, P2, P2, P2, P2, P1, P1, P2, P2];

const winBoardStates = [
  [NA, NA, NA, NA, NA, NA, NA, NA, NA],
  [P1, P1, P1, NA, NA, NA, NA, NA, NA],
  [NA, NA, NA, P1, P1, P1, NA, NA, NA],
  [NA, NA, NA, NA, NA, NA, P1, P1, P1],
  [P1, NA, NA, P1, NA, NA, P1, NA, NA],
  [NA, P1, NA, NA, P1, NA, NA, P1, NA],
  [NA, NA, P1, NA, NA, P1, NA, NA, P1],
  [P2, P2, P2, NA, NA, NA, NA, NA, NA],
  [NA, NA, NA, P2, P2, P2, NA, NA, NA],
  [NA, NA, NA, NA, NA, NA, P2, P2, P2],
  [P2, NA, NA, P2, NA, NA, P2, NA, NA],
  [NA, P2, NA, NA, P2, NA, NA, P2, NA],
  [NA, NA, P2, NA, NA, P2, NA, NA, P2],
  [P1, NA, NA, NA, P1, NA, NA, NA, P1],
  [NA, NA, P1, NA, P1, NA, P1, NA, NA],
  [P2, NA, NA, NA, P2, NA, NA, NA, P2],
  [NA, NA, P2, NA, P2, NA, P2, NA, NA],
];

failedTests += t.testCheckWinner(winBoardStates, winners);

const correctMoves = [
  [
    { idx_i: 0, idx_j: 0 },
    { idx_i: 0, idx_j: 1 },
    { idx_i: 0, idx_j: 2 },
    { idx_i: 1, idx_j: 0 },
    { idx_i: 1, idx_j: 1 },
    { idx_i: 1, idx_j: 2 },
    { idx_i: 2, idx_j: 0 },
    { idx_i: 2, idx_j: 1 },
    { idx_i: 2, idx_j: 2 },
  ],

  [
    { idx_i: 0, idx_j: 0 },
    { idx_i: 0, idx_j: 1 },
    { idx_i: 0, idx_j: 2 },
    { idx_i: 1, idx_j: 0 },
    { idx_i: 1, idx_j: 2 },
    { idx_i: 2, idx_j: 0 },
    { idx_i: 2, idx_j: 1 },
    { idx_i: 2, idx_j: 2 },
  ],

  [
    { idx_i: 0, idx_j: 1 },
    { idx_i: 0, idx_j: 2 },
    { idx_i: 1, idx_j: 0 },
    { idx_i: 1, idx_j: 1 },
    { idx_i: 1, idx_j: 2 },
    { idx_i: 2, idx_j: 0 },
    { idx_i: 2, idx_j: 1 },
    { idx_i: 2, idx_j: 2 },
  ],

  [
    { idx_i: 0, idx_j: 0 },
    { idx_i: 0, idx_j: 1 },
    { idx_i: 2, idx_j: 1 },
  ],

  [],

  [
    { idx_i: 0, idx_j: 1 },
    { idx_i: 1, idx_j: 1 },
  ],
];

const moveBoardStates = [
  [NA, NA, NA, NA, NA, NA, NA, NA, NA],
  [NA, NA, NA, NA, P1, NA, NA, NA, NA],
  [P2, NA, NA, NA, NA, NA, NA, NA, NA],
  [NA, NA, P1, P2, P1, P1, P2, NA, P2],
  [P2, P1, P1, P1, P2, P2, P2, P1, P1],
  [P1, NA, P1, P2, NA, P2, P1, P2, P1],
];

failedTests += t.testGenerateMoves(moveBoardStates, correctMoves);

process.exit(failedTests);
