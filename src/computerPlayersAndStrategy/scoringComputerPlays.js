import _ from "lodash";

import { lines } from "./boardLists.js";
import {
  doSquaresRotate,
  doBoardsRotate,
  doSquaresReflect,
  doBoardsReflect,
} from "./boardSymmetries.js";
import {
  specialBoard1,
  specialBoard2,
  specialSquare1,
  specialSquare2a,
  specialSquare2b,
} from "./scoringSpecialCaseConstants.js";

// check if an element of arr "is" subArr
function arrIncludes(arr, subArr) {
  return arr.some((item, i) => _.isEqual(subArr, item));
}

function isSpecialCase(board, toPlay, square, specialBoard, specialSquare) {
  return (
    [1, 2, 3].some((rotation) => {
      return (
        doSquaresRotate(square, specialSquare, rotation) &&
        doBoardsRotate(board, specialBoard, rotation)
      );
    }) ||
    [1, 2, 3, 4].some((reflection) => {
      return (
        doSquaresReflect(square, specialSquare, reflection) &&
        doBoardsReflect(board, specialBoard, reflection)
      );
    })
  );
}

function scorePlay(square, board, toPlay) {
  if (
    isSpecialCase(board, toPlay, square, specialBoard1(toPlay), specialSquare1)
  ) {
    return 500;
  }
  if (
    isSpecialCase(board, toPlay, square, specialBoard2(toPlay), specialSquare2a)
  ) {
    return -500;
  }
  if (
    isSpecialCase(board, toPlay, square, specialBoard2(toPlay), specialSquare2b)
  ) {
    return -500;
  }
  var score = 0;
  lines
    .slice()
    .filter((line) => {
      return arrIncludes(line, square);
    })
    .forEach((line) => {
      score += scorePlayRelativeToLine(square, board, line, toPlay);
    });
  return score;
}
function scorePlayRelativeToLine(square, board, line, toPlay) {
  let sortedPieces = line.map(([row, col]) => board[row][col]).sort();
  if (_.isEqual(sortedPieces, [-1, toPlay, toPlay])) {
    // can win right now
    return 1000;
  } else if (_.isEqual(sortedPieces, [-1, 1 - toPlay, 1 - toPlay])) {
    // opponent can win next turn
    return 100;
  } else if (_.isEqual(sortedPieces, [-1, -1, toPlay])) {
    // set self up to win next turn
    return 10;
  } else if (_.isEqual(sortedPieces, [-1, -1, 1 - toPlay])) {
    // prevent opponent setting self up to win next turn
    return 9;
  } else if (_.isEqual(sortedPieces, [-1, -1, -1])) {
    // empty line
    return 2;
  } else if (_.isEqual(sortedPieces, [-1, 0, 1])) {
    // this line is useless as nobody can win in it
    return -2;
  }
  return "Error";
}
function sortScoredSquares(a, b) {
  if (b.score !== a.score) {
    return b.score - a.score;
  }
}

export { sortScoredSquares, scorePlay };
