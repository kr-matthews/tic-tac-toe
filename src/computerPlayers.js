import _ from "lodash";

// player-specific values

// names of computer players
function computerName(diff) {
  switch (diff) {
    case 0:
      return "Rookie Ron";
    case 1:
      return "Seasoned Sam";
    case 2:
      return "Expert Ellie";
    default:
      return "Error Erik";
  }
}
// colours of computer players, and default backup for conflicts
function computerColour(diff) {
  switch (diff) {
    case 0:
      return "green";
    case 1:
      return "yellow";
    case 2:
      return "red";
    default:
      return "purple";
  }
}
// given a move to play, the chances the computer player will take it
function probabilityOfOptimalPlay(diff) {
  switch (diff) {
    case 0:
      return 0.55;
    case 1:
      return 0.8;
    case 2:
      return 0.97;
    default:
      return 1;
  }
}

// constants

// all possible lines along which one can win (or lose)
const lines = [
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ],
];
// original code:
// unfortunately, computes it every time(?)
// var lines = [];
// var diag1 = [];
// var diag2 = [];
// [0, 1, 2].forEach((i) => {
//   diag1.push([i, i]);
//   diag2.push([i, 2 - i]);
//   var vert = [];
//   var hori = [];
//   [0, 1, 2].forEach((j) => {
//     hori.push([i, j]);
//     vert.push([j, i]);
//   });
//   lines.push(hori);
//   lines.push(vert);
// });
// lines.push(diag1);
// lines.push(diag2);

// all possible places to play, list by rows
const allSquares = [
  [0, 0],
  [0, 1],
  [0, 2],
  [1, 0],
  [1, 1],
  [1, 2],
  [2, 0],
  [2, 1],
  [2, 2],
];

// special cases for computer strategy
function specialBoard1(toPlay) {
  return [
    [toPlay, -1, -1],
    [-1, 1 - toPlay, -1],
    [-1, -1, -1],
  ];
}
const specialSquare1 = [2, 2];
function specialBoard2(toPlay) {
  return [
    [1 - toPlay, -1, -1],
    [-1, toPlay, -1],
    [-1, -1, 1 - toPlay],
  ];
}
const specialSquare2a = [0, 2];
const specialSquare2b = [2, 0];

// no-longer-needed helper functions

function arrEq(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  } else {
    return arr1.every((item, i) => item === arr2[i]);
  }
}
function arrIncludes(arr, subArr) {
  return arr.some((item, i) => arrEq(subArr, item));
}
// function emptyInLine(board, line) {
//   var ans = { row: -1, col: -1 };
//   line.forEach(([row, col]) => {
//     if (board[row][col] === -1) {
//       ans = { row, col };
//     }
//   });
//   return ans;
// }
// function canWin(board, toPlay) {
//   var ans = false;
//   // reverse because we want the first one (doesn't really matter though)
//   // probably best to do a loop over indices and break when found
//   lines
//     .slice()
//     .reverse()
//     .forEach((line) => {
//       if (
//         arrEq(line.map(([row, col]) => board[row][col]).sort(), [
//           -1,
//           toPlay,
//           toPlay,
//         ])
//       ) {
//         ans = line;
//       }
//     });
//   return ans;
// }
// function canLose(board, toPlay) {
//   return canWin(board, 1 - toPlay);
// }

// helper functions

function randomPlayWithPreference(board, row, col) {
  while (board[row][col] !== -1) {
    row = Math.floor(Math.random() * 3);
    col = Math.floor(Math.random() * 3);
  }
  return { row, col };
}
function randomPlay(board) {
  return randomPlayWithPreference(
    board,
    Math.floor(Math.random() * 3),
    Math.floor(Math.random() * 3)
  );
}

function isValidPlay(square, board) {
  let [row, col] = square;
  return board[row][col] === -1;
}
// passed to filter, return false iff there is an earlier square in squares
//  which is equivalent
function isNotDuplicate(board, square1, ind1, squares) {
  // check whether any square is before it and is isomorphic
  return squares.every((square2, ind2) => {
    if (ind2 >= ind1) {
      // square2 is (equal to or) after square
      return true;
    } else {
      // currently only checks for rotational symmetry
      // TODO: check for reflective symmetry
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
  return arrEq(rotateSquare(sq1, rotation), sq2);
}
// does board1 look like board2 after rotation rotations
function doBoardsRotate(board1, board2, rotation) {
  return allSquares.every((square) => {
    let [row1, col1] = square;
    let [row2, col2] = rotateSquare(square, rotation);
    return board1[row1][col1] === board2[row2][col2];
  });
}

// reflect square using arbitrary indexing of reflections
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
  return arrEq(reflectSquare(sq1, reflection), sq2);
}
// does board1 look like board2 after given reflection
function doBoardsReflect(board1, board2, reflection) {
  return allSquares.every((square) => {
    let [row1, col1] = square;
    let [row2, col2] = reflectSquare(square, reflection);
    return board1[row1][col1] === board2[row2][col2];
  });
}

// special cases

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
  if (arrEq(sortedPieces, [-1, toPlay, toPlay])) {
    // can win right now
    return 1000;
  } else if (arrEq(sortedPieces, [-1, 1 - toPlay, 1 - toPlay])) {
    // opponent can win next turn
    return 100;
  } else if (arrEq(sortedPieces, [-1, -1, toPlay])) {
    // set self up to win next turn
    return 10;
  } else if (arrEq(sortedPieces, [-1, -1, 1 - toPlay])) {
    // prevent opponent setting self up to win next turn
    return 9;
  } else if (arrEq(sortedPieces, [-1, -1, -1])) {
    // empty line
    return 2;
  } else if (arrEq(sortedPieces, [-1, 0, 1])) {
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

// primary function

function findNextPlay(diff, board, toPlay) {
  // PROBLEM: on first move, first 4 options are corners, so they are virtually always selected, even for rookie ron

  // all computer players play the same strategy
  // playable positions are shuffled, assigned a score, and sorted
  //  (not quite that order) - and isomorphic options are removed
  //    (otherwise they get bunched and the chances of skipping are tiny)
  // computer 'attempts' to play each in order,
  //   with weighted success rate (based on difficulty of computer player)
  let orderedPlays = _.shuffle(allSquares.slice())
    .filter((square) => isValidPlay(square, board))
    .filter((square, index, squares) =>
      isNotDuplicate(board, square, index, squares)
    )
    .map((square) => {
      let [row, col] = square;
      return { row, col, score: scorePlay(square, board, toPlay) };
    })
    .sort(sortScoredSquares);

  console.log(orderedPlays);

  for (let square of orderedPlays) {
    if (probabilityOfOptimalPlay(diff) > Math.random()) {
      return square;
    }
  }
  // randomly sample squares until an open one is found
  return randomPlay(board);
}

export { computerName, computerColour, findNextPlay };
// export for testing
export {
  isValidPlay,
  scorePlay,
  allSquares,
  lines,
  scorePlayRelativeToLine,
  arrIncludes,
  rotateSquare,
  doSquaresRotate,
  doBoardsRotate,
  isNotDuplicate,
};
