const tictactoe = require('./tictactoe');

function testMoveGenerationMethod() {
  const correctMoves = [
    [
      { i: 0, j: 0 },
      { i: 0, j: 1 },
      { i: 0, j: 2 },
      { i: 1, j: 0 },
      { i: 1, j: 1 },
      { i: 1, j: 2 },
      { i: 2, j: 0 },
      { i: 2, j: 1 },
      { i: 2, j: 2 },
    ],
  
    [
      { i: 0, j: 0 },
      { i: 0, j: 1 },
      { i: 0, j: 2 },
      { i: 1, j: 0 },
      { i: 1, j: 2 },
      { i: 2, j: 0 },
      { i: 2, j: 1 },
      { i: 2, j: 2 },
    ],
  
    [
      { i: 0, j: 1 },
      { i: 0, j: 2 },
      { i: 1, j: 0 },
      { i: 1, j: 1 },
      { i: 1, j: 2 },
      { i: 2, j: 0 },
      { i: 2, j: 1 },
      { i: 2, j: 2 },
    ],
  
    [
      { i: 0, j: 0 },
      { i: 0, j: 1 },
      { i: 2, j: 1 },
    ],
  
    [],
  
    [
      { i: 0, j: 1 },
      { i: 1, j: 1 },
    ],
  ];
  
  const boardStates = [
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', 'X', ' ', ' ', ' ', ' '],
    ['O', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', 'X', 'O', 'X', 'X', 'O', ' ', 'O'],
    ['O', 'X', 'X', 'X', 'O', 'O', 'O', 'X', 'X'],
    ['X', ' ', 'X', 'O', ' ', 'O', 'X', 'O', 'X'],
  ];

  let failedTests = 0;

  if (boardStates.length === correctMoves.length) {
    for (let i = 0; i < boardStates.length; ++i) {
      const generatedMoves = generateMoves(boardStates[i]);
      if (generatedMoves.length === correctMoves[i].length) {
        for (let j = 0; j < generatedMoves.length; ++j) {
          if (generatedMoves[j].i === correctMoves[i][j].i && generatedMoves[j].j === correctMoves[i][j].j) {
            console.log('Move generation test (', i, ',', j, ') : PASSED');
          } else {
            console.log('Move generation test (', i, ',', j, ') : FAILED');
            failedTests++;
          }
        }
      } else {
        failedTests++;
        console.log('Generated Moves Missmatch : FAILED | index : ', i);
      }
    }
  } else {
    console.log('Test Move Array Missmatch : FAILED');
    failedTests++;
  }

  let totalTests = 0;
  for (let i = 0; i < correctMoves.length; ++i) {
    totalTests += correctMoves[i].length;
  }

  return { failures: failedTests, tests: totalTests };
}




function testCheckWinnerMethod () {
  const winners = [' ', 'X', 'X', 'X', 'X', 'X', 'X', 'O', 'O', 'O', 'O', 'O', 'O', 'X', 'X', 'O', 'O'];
  const boardStates = [
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['X', 'X', 'X', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', 'X', 'X', 'X', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', 'X', 'X', 'X'],
    ['X', ' ', ' ', 'X', ' ', ' ', 'X', ' ', ' '],
    [' ', 'X', ' ', ' ', 'X', ' ', ' ', 'X', ' '],
    [' ', ' ', 'X', ' ', ' ', 'X', ' ', ' ', 'X'],
    ['O', 'O', 'O', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', 'O', 'O', 'O', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', 'O', 'O', 'O'],
    ['O', ' ', ' ', 'O', ' ', ' ', 'O', ' ', ' '],
    [' ', 'O', ' ', ' ', 'O', ' ', ' ', 'O', ' '],
    [' ', ' ', 'O', ' ', ' ', 'O', ' ', ' ', 'O'],
    ['X', ' ', ' ', ' ', 'X', ' ', ' ', ' ', 'X'],
    [' ', ' ', 'X', ' ', 'X', ' ', 'X', ' ', ' '],
    ['O', ' ', ' ', ' ', 'O', ' ', ' ', ' ', 'O'],
    [' ', ' ', 'O', ' ', 'O', ' ', 'O', ' ', ' '],
  ];

  let failedTests = 0;

  for (let i = 0; i < boardStates.length; ++i) {
    if (checkWin(boardStates[i]) === winners[i]) {
      console.log('test ', i + 1, ' : PASSED');
    } else {
      console.log('test ', i + 1, ' : FAILED');
      failedTests++;
    }
  }

  return { failures: failedTests, tests: boardStates.length };
}

const moveGenerationFailures = testMoveGenerationMethod();
const checkWinnerFailures = testCheckWinnerMethod();

console.log('Move Generation Tests : ', moveGenerationFailures);
console.log('Check Winner Tests    : ', checkWinnerFailures);