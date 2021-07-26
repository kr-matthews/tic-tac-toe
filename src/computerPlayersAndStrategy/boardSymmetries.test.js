import { allSquares } from "./boardLists.js";
import {
  rotateSquare,
  doSquaresRotate,
  doBoardsRotate,
  isNotDuplicate,
} from "./boardSymmetries.js";

// not everything is tested properly

// CONSTANTS

const board = [
  [-1, 0, 1],
  [-1, -1, 1],
  [0, 0, -1],
];

const board2 = [
  [1, 1, 0],
  [0, -1, -1],
  [1, 0, 0],
];

const board3 = [
  [-1, -1, 0],
  [-1, 1, -1],
  [0, -1, -1],
];

// TESTS

it("rotate squares", () => {
  expect(rotateSquare([0, 0], 1)).toEqual([0, 2]);
  expect(rotateSquare([0, 0], 3)).toEqual([2, 0]);
  expect(rotateSquare([1, 1], 1)).toEqual([1, 1]);
  expect(rotateSquare([2, 1], 1)).toEqual([1, 0]);
});

it("checking if rotating square matches", () => {
  expect(doSquaresRotate([0, 0], [0, 0], 0)).toEqual(true);
  expect(doSquaresRotate([0, 0], [2, 0], 0)).toEqual(false);
  expect(doSquaresRotate([0, 0], [2, 0], 1)).toEqual(false);
  expect(doSquaresRotate([0, 0], [2, 0], 2)).toEqual(false);
  expect(doSquaresRotate([0, 0], [2, 0], 3)).toEqual(true);
  expect(doSquaresRotate([1, 1], [1, 1], 0)).toEqual(true);
  expect(doSquaresRotate([1, 1], [1, 1], 7)).toEqual(true);
  expect(doSquaresRotate([1, 2], [2, 1], 1)).toEqual(true);
  expect(doSquaresRotate([1, 2], [1, 0], 2)).toEqual(true);
});

it("rotating board", () => {
  expect(doBoardsRotate(board, board, 0)).toEqual(true);
  expect(doBoardsRotate(board, board, 1)).toEqual(false);
  expect(doBoardsRotate(board, board, 4)).toEqual(true);
  expect(doBoardsRotate(board2, board2, 0)).toEqual(true);
  expect(doBoardsRotate(board2, board2, 1)).toEqual(false);
  expect(doBoardsRotate(board2, board2, 4)).toEqual(true);
  expect(doBoardsRotate(board3, board3, 0)).toEqual(true);
  expect(doBoardsRotate(board3, board3, 1)).toEqual(false);
  expect(doBoardsRotate(board3, board3, 2)).toEqual(true);
});

it("checking uniqueness filter", () => {
  expect(isNotDuplicate(board3, [0, 0], 0, allSquares)).toEqual(true);
  expect(isNotDuplicate(board3, [2, 2], 8, allSquares)).toEqual(false);
  expect(isNotDuplicate(board3, [1, 0], 4, allSquares)).toEqual(false);
  expect(isNotDuplicate(board3, [1, 2], 6, allSquares)).toEqual(false);
});
