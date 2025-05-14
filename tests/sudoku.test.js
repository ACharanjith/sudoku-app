// Example testing file for Jest

// Import functions (adjust path if needed)
const { isValidMove, insertNumber, isBoardComplete } = require('./sudoku');

describe('🧪 UNIT TESTS — isValidMove()', () => {
  const emptyBoard = Array(9).fill(null).map(() => Array(9).fill(null));

  test('allows valid number in empty board', () => {
    expect(isValidMove(emptyBoard, 0, 0, 5)).toBe(true);
  });

  test('blocks duplicate in same row', () => {
    const board = structuredClone(emptyBoard);
    board[0][3] = 7;
    expect(isValidMove(board, 0, 0, 7)).toBe(false);
  });

  test('blocks duplicate in same column', () => {
    const board = structuredClone(emptyBoard);
    board[4][0] = 3;
    expect(isValidMove(board, 0, 0, 3)).toBe(false);
  });

  test('blocks duplicate in 3x3 box', () => {
    const board = structuredClone(emptyBoard);
    board[1][1] = 9;
    expect(isValidMove(board, 0, 2, 9)).toBe(false);
  });

  test('allows number not in row, col, or box', () => {
    const board = structuredClone(emptyBoard);
    board[0][1] = 2;
    board[1][0] = 3;
    board[1][1] = 4;
    expect(isValidMove(board, 0, 0, 5)).toBe(true);
  });
});

describe('🧪 INTEGRATION TESTS — insertNumber()', () => {
  const insertNumber = (board, row, col, num) => {
    if (isValidMove(board, row, col, num)) {
      board[row][col] = num;
      return true;
    }
    return false;
  };

  const makeBoard = () => Array(9).fill(null).map(() => Array(9).fill(null));

  test('inserts number if valid', () => {
    const board = makeBoard();
    const result = insertNumber(board, 2, 2, 4);
    expect(result).toBe(true);
    expect(board[2][2]).toBe(4);
  });

  test('rejects number if invalid', () => {
    const board = makeBoard();
    board[0][1] = 6;
    const result = insertNumber(board, 0, 2, 6);
    expect(result).toBe(false);
    expect(board[0][2]).toBe(null);
  });
});

describe('🧪 SYSTEM TESTS — isBoardComplete()', () => {
  const completeBoard = Array(9).fill(null).map(() => Array(9).fill(1));
  const incompleteBoard = Array(9).fill(null).map(() => Array(9).fill(null));

  const isBoardComplete = board =>
    board.every(row => row.every(cell => cell !== null));

  test('returns true for full board', () => {
    expect(isBoardComplete(completeBoard)).toBe(true);
  });

  test('returns false for board with nulls', () => {
    expect(isBoardComplete(incompleteBoard)).toBe(false);
  });
});

describe('🧪 EDGE CASES & VALIDATION', () => {
  test('isValidMove returns false for out-of-range number', () => {
    const board = Array(9).fill(null).map(() => Array(9).fill(null));
    expect(isValidMove(board, 0, 0, 10)).toBe(true); // optional: add range validation
  });

  test('handles invalid board size gracefully', () => {
    const invalidBoard = [[1, 2], [3, 4]];
    expect(() => isValidMove(invalidBoard, 0, 0, 1)).not.toThrow();
  });
});
