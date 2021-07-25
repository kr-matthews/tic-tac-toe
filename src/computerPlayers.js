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

// all possible places to play
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
// passed to filter, removes it if it's equivalent to another play
function removeIsomorphicSquares(board, square1, ind1, squares) {
  // check whether any square is before it and is isomorphic
  return squares.some((square2, ind2) => {
    if (ind2 >= ind1) {
      // square2 is (equal to or) after square
      return false;
    } else {
      return [1, 2, 3].some((rotation) => {
        return (
          doSquaresRotate(square1, square2, rotation) &&
          doesBoardRotate(board, rotation)
        );
      });
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
// does board look same after rotation rotations
function doesBoardRotate(board, rotation) {
  return false;
}
function scorePlay(square, board, toPlay) {
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
      removeIsomorphicSquares(board, square, index, squares)
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
};
