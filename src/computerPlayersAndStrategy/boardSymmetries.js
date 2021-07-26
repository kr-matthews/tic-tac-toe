import _ from "lodash";

import { allSquares } from "./boardLists.js";

// passed to filter, return false iff there is an earlier square in squares
//  which is equivalent
function isNotDuplicate(board, square1, ind1, squares) {
  // check whether any square is before it and is isomorphic
  return squares.every((square2, ind2) => {
    if (ind2 >= ind1) {
      // square2 is (equal to or) after square
      return true;
    } else {
      // check for rotational symmetry, and then for reflective symmetry
      return (
        [1, 2, 3].every((rotation) => {
          return !(
            doSquaresRotate(square1, square2, rotation) &&
            doBoardsRotate(board, board, rotation)
          );
        }) &&
        [1, 2, 3, 4].every((reflection) => {
          return !(
            doSquaresReflect(square1, square2, reflection) &&
            doBoardsReflect(board, board, reflection)
          );
        })
      );
    }
  });
}

// ROTATIONS

// rotate square position clockwise, 1 rotation being 90 degrees
function rotateSquare(square, rotation) {
  if (rotation % 4 === 0) {
    return square;
  } else {
    return rotateSquare([square[1], 2 - square[0]], rotation - 1);
  }
}

// does sq1 rotate to sq2 in rotation rotations
function doSquaresRotate(sq1, sq2, rotation) {
  return _.isEqual(rotateSquare(sq1, rotation), sq2);
}

// does board1 look like board2 after rotation rotations
function doBoardsRotate(board1, board2, rotation) {
  return allSquares.every((square) => {
    let [row1, col1] = square;
    let [row2, col2] = rotateSquare(square, rotation);
    return board1[row1][col1] === board2[row2][col2];
  });
}

// REFLECTIONS

// reflect square using ARBITRARY indexing of reflections
function reflectSquare(square, reflection) {
  let [row, col] = square;
  switch (reflection) {
    case 1: // diag1: \
      return [col, row];
    case 2: // diag2: /
      return [2 - col, 2 - row];
    case 3: // hori: --
      return [2 - row, col];
    case 4: // vert: |
      return [row, 2 - col];
    default:
      return "Error";
  }
}

// does sq1 reflect to sq2 via reflection given
function doSquaresReflect(sq1, sq2, reflection) {
  return _.isEqual(reflectSquare(sq1, reflection), sq2);
}

// does board1 look like board2 after given reflection
function doBoardsReflect(board1, board2, reflection) {
  return allSquares.every((square) => {
    let [row1, col1] = square;
    let [row2, col2] = reflectSquare(square, reflection);
    return board1[row1][col1] === board2[row2][col2];
  });
}

export { isNotDuplicate };
export { doSquaresRotate, doBoardsRotate, doSquaresReflect, doBoardsReflect };
