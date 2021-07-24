import { arrEq, emptyInLine, canWin, canLose } from "./computerPlayers.js";

it("checks arrays match", () => {
  expect(arrEq([-1, 0, 0], [-1, 0, 0])).toEqual(true);
  expect(arrEq([0, 0, 0], [0, 0, 0])).toEqual(true);
  expect(arrEq([-1], [-1])).toEqual(true);
  expect(arrEq([-1], [1])).toEqual(false);
  expect(arrEq([0, -1, 0], [-1, 0, 0])).toEqual(false);
});

const board = [
  [-1, 0, 1],
  [-1, -1, 1],
  [0, 0, -1],
];

it("find empty spot in line", () => {
  expect(
    emptyInLine(board, [
      [0, 0],
      [0, 1],
      [0, 2],
    ])
  ).toEqual({ row: 0, col: 0 });
  expect(
    emptyInLine(board, [
      [1, 0],
      [1, 1],
      [1, 2],
    ])
  ).toEqual({ row: 1, col: 1 });
  expect(
    emptyInLine(board, [
      [0, 2],
      [1, 1],
      [2, 0],
    ])
  ).toEqual({ row: 1, col: 1 });
});

it("checks whether winning move exists", () => {
  expect(canWin(board, 0)).toEqual([
    [2, 0],
    [2, 1],
    [2, 2],
  ]);
  expect(canWin(board, 1)).toEqual([
    [0, 2],
    [1, 2],
    [2, 2],
  ]);
  expect(canWin(board, 2)).toEqual(false);
});

it("checks whether other play has winning move", () => {
  expect(canLose(board, 1)).toEqual([
    [2, 0],
    [2, 1],
    [2, 2],
  ]);
  expect(canLose(board, 0)).toEqual([
    [0, 2],
    [1, 2],
    [2, 2],
  ]);
});

const board2 = [
  [1, 1, 0],
  [0, -1, -1],
  [1, 0, 0],
];
