import { lines, allSquares } from "./boardLists";
import { isValidPlay } from "./computerStrategy.js";
import {
  scorePlay,
  scorePlayRelativeToLine,
  arrIncludes,
  rotateSquare,
  doSquaresRotate,
  doBoardsRotate,
  isNotDuplicate,
} from "./scoringComputerPlays.js";

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

// should test reflections
