import {
  isValidPlay,
  scorePlay,
  allSquares,
  lines,
  scorePlayRelativeToLine,
  arrIncludes,
  rotateSquare,
  doSquaresRotate,
  doesBoardRotate,
  isNotDuplicate,
} from "./computerPlayers.js";

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

it("filtering and scoring", () => {
  expect(allSquares.filter((square) => isValidPlay(square, board))).toEqual([
    [0, 0],
    [1, 0],
    [1, 1],
    [2, 2],
  ]);
  expect(scorePlayRelativeToLine([0, 0], board, lines[0], 0)).toEqual(
    expect.any(Number)
  );
  expect(arrIncludes([[0, 0]], [0, 0])).toEqual(true);
  expect(arrIncludes(lines[0], [0, 0])).toEqual(true);
  expect(
    lines.slice().filter((line) => {
      return arrIncludes(line, [0, 0]);
    })
  ).toEqual([
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
  ]);
  expect(scorePlay([0, 0], board, 0)).toEqual(expect.any(Number));
  expect(scorePlay([1, 1], board, 0)).toEqual(expect.any(Number));
  expect(
    allSquares
      .filter((square) => isValidPlay(square, board))
      .map((square) => scorePlay(square, board, 0))[0]
  ).toEqual(expect.any(Number));
  expect(
    allSquares
      .filter((square) => isValidPlay(square, board))
      .map((square) => scorePlay(square, board, 0))
      .sort((a, b) => b - a)[0]
  ).toEqual(expect.any(Number));
});

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

const board3 = [
  [-1, -1, 0],
  [-1, 1, -1],
  [0, -1, -1],
];

it("rotating board", () => {
  expect(doesBoardRotate(board, 0)).toEqual(true);
  expect(doesBoardRotate(board, 1)).toEqual(false);
  expect(doesBoardRotate(board, 4)).toEqual(true);
  expect(doesBoardRotate(board2, 0)).toEqual(true);
  expect(doesBoardRotate(board2, 1)).toEqual(false);
  expect(doesBoardRotate(board2, 4)).toEqual(true);
  expect(doesBoardRotate(board3, 0)).toEqual(true);
  expect(doesBoardRotate(board3, 1)).toEqual(false);
  expect(doesBoardRotate(board3, 2)).toEqual(true);
});

it("checking uniqueness filter", () => {
  expect(isNotDuplicate(board3, [0, 0], 0, allSquares)).toEqual(true);
  expect(isNotDuplicate(board3, [2, 2], 8, allSquares)).toEqual(false);
  expect(isNotDuplicate(board3, [1, 0], 4, allSquares)).toEqual(true);
  expect(isNotDuplicate(board3, [1, 2], 6, allSquares)).toEqual(false);
});
