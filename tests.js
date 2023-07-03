import { TicTacToe, NA, P1, P2 } from './lib/TicTacToe.js';

const t = new TicTacToe({ gridLength: 3 });
const fbf = new TicTacToe({ gridLength: 4, winCount: 3 });
let failedTests = 0;

const fbfWinners = [NA, P1, P2, P1, P2, P1, P2, P1, P2];
const fbfBoardStates = [
  [
    P2, NA, NA, P2,
    NA, P1, NA, NA,
    NA, NA, P2, NA,
    P1, NA, NA, P1
  ],
  [
    NA, NA, P1, NA,
    NA, P1, NA, NA,
    P1, NA, NA, NA,
    NA, NA, NA, NA
  ],[
    NA, NA, NA, NA,
    NA, NA, NA, P2,
    NA, NA, P2, NA,
    NA, P2, NA, NA
  ],[
    NA, P1, NA, NA,
    NA, NA, P1, NA,
    NA, NA, NA, P1,
    NA, NA, NA, NA
  ],[
    NA, NA, NA, NA,
    P2, NA, NA, NA,
    NA, P2, NA, NA,
    NA, NA, P2, NA
  ],[
    NA, NA, NA, NA,
    NA, NA, P1, NA,
    NA, P1, NA, NA,
    P1, NA, NA, NA
  ],[
    NA, NA, NA, NA,
    NA, P2, NA, NA,
    NA, NA, P2, NA,
    NA, NA, NA, P2
  ],[
    NA, NA, NA, P1,
    NA, NA, P1, NA,
    NA, P1, NA, NA,
    NA, NA, NA, NA
  ],[
    P2, NA, NA, NA,
    NA, P2, NA, NA,
    NA, NA, P2, NA,
    NA, NA, NA, NA
  ],
];

console.log('============ 4x4 - piece 3 win state tests ============ ');
failedTests += fbf.testEvaluation(fbfBoardStates, fbfWinners);

const winners = [NA, P1, P1, P1, P1, P1, P1, P2, P2, P2, P2, P2, P2, P1, P1, P2, P2, NA];

const winBoardStates = [
  [NA, NA, NA, NA, NA, NA, NA, NA, NA], // no winner
  [P1, P1, P1, NA, NA, NA, NA, NA, NA], // row 1
  [NA, NA, NA, P1, P1, P1, NA, NA, NA], // row 2
  [NA, NA, NA, NA, NA, NA, P1, P1, P1], // row 3
  [P1, NA, NA, P1, NA, NA, P1, NA, NA], // col 1
  [NA, P1, NA, NA, P1, NA, NA, P1, NA], // col 2
  [NA, NA, P1, NA, NA, P1, NA, NA, P1], // col 3
  [P2, P2, P2, NA, NA, NA, NA, NA, NA], // row 1 - player2
  [NA, NA, NA, P2, P2, P2, NA, NA, NA], // row 2 - player2
  [NA, NA, NA, NA, NA, NA, P2, P2, P2], // row 3 - player2
  [P2, NA, NA, P2, NA, NA, P2, NA, NA], // col 1 - player2
  [NA, P2, NA, NA, P2, NA, NA, P2, NA], // col 2 - player2
  [NA, NA, P2, NA, NA, P2, NA, NA, P2], // col 3 - player2
  [P1, NA, NA, NA, P1, NA, NA, NA, P1], // diag \
  [NA, NA, P1, NA, P1, NA, P1, NA, NA], // diag /
  [P2, NA, NA, NA, P2, NA, NA, NA, P2], // diag \ - player2
  [NA, NA, P2, NA, P2, NA, P2, NA, NA], // diag / - player2
  [P2, P1, P2, P1, P2, NA, NA, P1, NA], // no winner
];

console.log('============ 3x3 win state tests ============ ');
failedTests += t.testEvaluation(winBoardStates, winners);

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

console.log('============ 3x3 move generation test ============ ');
failedTests += t.testGenerateMoves(moveBoardStates, correctMoves);

if (failedTests > 0) {
  console.log(`\nFAILED : ${failedTests}`);
} else {
  console.log('\nPASSED : ALL');
}

process.exit(failedTests);
