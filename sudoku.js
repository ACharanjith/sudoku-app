// sudoku.js — core logic module

function isValidMove(board, row, col, value) {
  return board[row][col] === null || board[row][col] === '';
}

function insertNumber(board, row, col, value) {
  board[row][col] = value;
  return board;
}

function isBoardComplete(board) {
  return board.every(row => row.every(cell => cell !== null && cell !== ''));
}

module.exports = { isValidMove, insertNumber, isBoardComplete };
