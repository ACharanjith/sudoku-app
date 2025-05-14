const { isValidMove } = require('./sudoku');

describe('isValidMove', () => {
  const emptyBoard = Array(9).fill(null).map(() => Array(9).fill(null));

  test('allows a valid move', () => {
    expect(isValidMove(emptyBoard, 0, 0, 5)).toBe(true);
  });

  test('blocks duplicate in row', () => {
    const board = structuredClone(emptyBoard);
    board[0][1] = 5;
    expect(isValidMove(board, 0, 0, 5)).toBe(false);
  });

  test('blocks duplicate in column', () => {
    const board = structuredClone(emptyBoard);
    board[1][0] = 5;
    expect(isValidMove(board, 0, 0, 5)).toBe(false);
  });

  test('blocks duplicate in box', () => {
    const board = structuredClone(emptyBoard);
    board[1][1] = 5;
    expect(isValidMove(board, 0, 0, 5)).toBe(false);
  });
});
