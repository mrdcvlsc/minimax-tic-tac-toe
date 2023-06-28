'use strict';
console.log('TicTacToe.js: loaded.');

/** Empty square value, Not Available ` `. */
const NA = 0;
const NOWINNER = 0;

/** Player 1 square value `X`. */
const P1 = 1;

/** Player 2 square value `O`. */
const P2 = 2;
const CELL_PIECE = ['', 'X', 'O'];
const MOVE_SUCCESS = 1;
const MOVE_INVALID = 0;

/** A single thread tic-tac-toe game representation that can uses
 * `minimax` algorithm to search for the best possible move.
 */
class TicTacToe {
  constructor(gridLength, player = P1) {
    this.grid = gridLength;
    this.winner = 0;
    this.board = new Uint8Array(gridLength * gridLength);
    this.currentPlayer = P1;
    this.turns = gridLength * gridLength;

    this.makeMove = this.makeMove.bind(this);
    this.makeComputerMove = this.makeComputerMove.bind(this);
    this.generateMoves = this.generateMoves.bind(this);
    this.minimax = this.minimax.bind(this);
    this.checkWinner = this.checkWinner.bind(this);
    this.isFinish = this.isFinish.bind(this);

    this.display = this.display.bind(this);
    this.getBoardCharacterArray = this.getBoardCharacterArray.bind(this);
  }

  /**
   * @description **WARNING**: This method will always **make a move** on an **NA square**
   * regardless **even** if the **game has already ended** with a winning player or a draw.
   *
   * It is advice to use `this.checkWinner()` and/or `this.isFinish()` first before calling this method.
   * @param {Number} i row index of the board.
   * @param {Number} j column index of the row.
   * @returns `MOVE_INVALID = 0`, `MOVE_SUCCESS = 1`. */
  makeMove(i, j) {
    if (this.board[i * this.grid + j] === NA) {
      this.board[i * this.grid + j] = this.currentPlayer;

      this.currentPlayer = this.currentPlayer === P1 ? P2 : P1;
      this.turns--;
      return MOVE_SUCCESS;
    }

    return MOVE_INVALID;
  }

  /**
   * @param {Number} depth maximum depth to calculate.
   * @returns `{ score: number, idx_i: null | number, idx_j: null | number }`
   */
  makeComputerMove(depth) {
    const bestMove = this.minimax(this.currentPlayer, depth);
    this.makeMove(bestMove.idx_i, bestMove.idx_j);
    return bestMove;
  }

  /**
   * @param {Number} maximizingPlayer the `player` to calculate the best possible move for the current board state.
   * @param {Number} depth maximum depth to calculate.
   * @returns `{ score: number, idx_i: null | number, idx_j: null | number }`
   */
  minimax(maximizingPlayer, depth) {
    const moves = this.generateMoves();
    const bestMove = { score: 0, idx_i: null, idx_j: null };

    const winning = this.checkWinner();
    if (winning === P1) {
      bestMove.score = 1 * this.turns;
      return bestMove;
    } else if (winning === P2) {
      bestMove.score = -1 * this.turns;
      return bestMove;
    } else if (moves.length === 0) {
      return bestMove;
    }

    if (depth === 0) {
      return bestMove;
    }

    if (maximizingPlayer === P1) {
      // maximizing player
      bestMove.score = -Infinity;
      for (let i = 0; i < moves.length; ++i) {
        this.turns--;
        this.board[moves[i].idx_i * this.grid + moves[i].idx_j] = P1;
        const evaluation = this.minimax(P2, depth - 1).score;
        if (evaluation > bestMove.score) {
          bestMove.score = evaluation;
          bestMove.idx_i = moves[i].idx_i;
          bestMove.idx_j = moves[i].idx_j;
        }
        this.turns++;
        this.board[moves[i].idx_i * this.grid + moves[i].idx_j] = NA;
      }
    } else {
      // minimizing player
      bestMove.score = Infinity;
      for (let i = 0; i < moves.length; ++i) {
        this.turns--;
        this.board[moves[i].idx_i * this.grid + moves[i].idx_j] = P2;
        const evaluation = this.minimax(P1, depth - 1).score;
        if (evaluation < bestMove.score) {
          bestMove.score = evaluation;
          bestMove.idx_i = moves[i].idx_i;
          bestMove.idx_j = moves[i].idx_j;
        }
        this.board[moves[i].idx_i * this.grid + moves[i].idx_j] = NA;
        this.turns++;
      }
    }

    return bestMove;
  }

  /** Generate all the possible moves in the current board state. */
  generateMoves() {
    const possibleMoves = [];
    for (let i = 0; i < this.grid; ++i) {
      for (let j = 0; j < this.grid; ++j) {
        if (this.board[i * this.grid + j] === NA) {
          possibleMoves.push({ idx_i: i, idx_j: j });
        }
      }
    }

    return possibleMoves;
  }

  /** Check if there is already a winner in the current board state.
   *
   * **This method will also update the `this.winner` member when called**.
   *
   * For tic-tac-toe this function will also serve as our evaluation function.
   * In other board game engines like; chess and GO the evaluation function might be separated.
   * @returns no winner `0` | player X `1` | player O `2`.
   */
  checkWinner() {
    // check row -
    for (let i = 0; i < this.grid; ++i) {
      for (let j = 1; j < this.grid; ++j) {
        if (
          this.board[i * this.grid + (j - 1)] === this.board[i * this.grid + j] &&
          this.board[i * this.grid + j] !== NA
        ) {
          if (j === this.grid - 1) {
            this.winner = this.board[i * this.grid + j];
            return this.board[i * this.grid + j];
          }
        } else {
          break;
        }
      }
    }

    // check columns |
    for (let j = 0; j < this.grid; ++j) {
      for (let i = 1; i < this.grid; ++i) {
        if (
          this.board[(i - 1) * this.grid + j] === this.board[i * this.grid + j] &&
          this.board[i * this.grid + j] !== NA
        ) {
          if (i === this.grid - 1) {
            this.winner = this.board[i * this.grid + j];
            return this.board[i * this.grid + j];
          }
        } else {
          break;
        }
      }
    }

    // check diag \
    for (let i = 1; i < this.grid; ++i) {
      if (
        this.board[(i - 1) * this.grid + (i - 1)] === this.board[i * this.grid + i] &&
        this.board[i * this.grid + i] !== NA
      ) {
        if (i === this.grid - 1) {
          this.winner = this.board[i * this.grid + i];
          return this.board[i * this.grid + i];
        }
      } else {
        break;
      }
    }

    // check diag /
    const diagStep = this.grid - 1;
    for (let i = 1; i < this.grid; ++i) {
      if (this.board[(i + 1) * diagStep] === this.board[i * diagStep] && this.board[i * diagStep] !== NA) {
        if (i === this.grid - 1) {
          this.winner = this.board[i * diagStep];
          return this.board[i * diagStep];
        }
      } else {
        break;
      }
    }

    this.winner = NA;
    return NA;
  }

  display() {
    for (let i = 0; i < this.grid; ++i) {
      const row = [];
      for (let j = 0; j < this.grid; ++j) {
        row.push(CELL_PIECE[this.board[i * this.grid + j]]);
      }
      console.log(row);
    }
  }

  /** @returns A char array representation of the current board. */
  getBoardCharacterArray() {
    const charArray = [];

    for (let i = 0; i < this.board.length; ++i) {
      charArray.push(CELL_PIECE[this.board[i]]);
    }
    return charArray;
  }

  /**
   * **This method will also update the `this.winner` member when called**.
   * @returns `true` if game ended, `false` if not. */
  isFinish() {
    const hasWinner = this.checkWinner();
    if (hasWinner === P1 || hasWinner === P2) {
      return true;
    }

    let availableSquares = 0;
    for (let i = 0; i < this.board.length; ++i) {
      if (this.board[i] === NA) {
        availableSquares++;
      }
    }

    return availableSquares === 0;
  }

  // ====================== TESTS ======================

  /** This test will only work for a 3x3 initialized board. */
  testGenerateMoves(boardStates, correctMoves) {
    let failedTests = 0;

    if (boardStates.length === correctMoves.length) {
      for (let i = 0; i < boardStates.length; ++i) {
        for (let j = 0; j < this.board.length; ++j) {
          this.board[j] = boardStates[i][j];
        }

        const generatedMoves = this.generateMoves();
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

    return failedTests;
  }

  /** This test will only work for a 3x3 initialized board. */
  testCheckWinner(boardStates, winners) {
    let failedTests = 0;

    for (let i = 0; i < boardStates.length; ++i) {
      for (let j = 0; j < this.board.length; ++j) {
        this.board[j] = boardStates[i][j];
      }

      if (this.checkWinner() === winners[i]) {
        console.log('test ', i + 1, ' : PASSED');
      } else {
        console.log('test ', i + 1, ' : FAILED');
        failedTests++;
      }
    }

    return failedTests;
  }
}

export { TicTacToe, NA, P1, P2 };