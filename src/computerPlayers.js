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

// all possible lines along which one can win (or lose)
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
function arrEq(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  } else {
    return arr1.every((item, i) => item === arr2[i]);
  }
}

function emptyInLine(board, line) {
  var ans = { row: -1, col: -1 };
  line.forEach(([row, col]) => {
    if (board[row][col] === -1) {
      ans = { row, col };
    }
  });
  return ans;
}

function canWin(board, toPlay) {
  var ans = false;
  // reverse because we want the first one (doesn't really matter though)
  // probably best to do a loop over indices and break when found
  lines
    .slice()
    .reverse()
    .forEach((line) => {
      if (
        arrEq(line.map(([row, col]) => board[row][col]).sort(), [
          -1,
          toPlay,
          toPlay,
        ])
      ) {
        ans = line;
      }
    });
  return ans;
}
function canLose(board, toPlay) {
  return canWin(board, 1 - toPlay);
}

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

const edges = [
  [0, 1],
  [1, 2],
  [2, 1],
  [1, 0],
];
const corners = [
  [0, 0],
  [0, 2],
  [2, 2],
  [2, 0],
];

function diagStart(board) {
  // TODO:
  return false;
}
function findBestCorner(board, toPlay) {
  var bestCorner = false;
  var bestScore = -999;
  corners.forEach((corner) => {
    var score = 0;
    lines.forEach((line) => (score += score(corner, line, toPlay)));
  });
  return bestCorner;
}
function findBestEdge(board, toPlay) {
  // TODO:
  return false;
}
function score(square, line, toPlay) {
  const [row, col] = square;
  // TODO:
  return 0;
}

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
function findNextPlay(diff, board, toPlay) {
  // all computer players play the same strategy; a list of conditionals
  // each conditional is weighted by a probability (and this is the
  //   only part which depends on the player)
  let winLine = canWin(board, toPlay);
  let loseLine = canLose(board, toPlay);
  let bestCorner = findBestCorner(board, toPlay);
  let bestEdge = findBestEdge(board, toPlay);

  if (winLine && probabilityOfOptimalPlay(diff) > Math.random()) {
    // if can win, do it
    return emptyInLine(board, winLine);
  } else if (loseLine && probabilityOfOptimalPlay(diff) > Math.random()) {
    // if about to lose, block it
    return emptyInLine(board, loseLine);
  } else if (
    board[1][1] === -1 &&
    probabilityOfOptimalPlay(diff) > Math.random()
  ) {
    // if the center is open, take it
    return { row: 1, col: 1 };
  } else if (
    diagStart(board) &&
    probabilityOfOptimalPlay(diff) > Math.random()
  ) {
    // special case where prioritizing corner over edges is bad
    return bestEdge;
  } else if (bestCorner && probabilityOfOptimalPlay(diff) > Math.random()) {
    // play in a corner which can setup a win
    return bestCorner;
  } else if (bestEdge && probabilityOfOptimalPlay(diff) > Math.random()) {
    // play in an edge which can setup a win
    return bestEdge;
  } else {
    // randomly sample squares until an open one is found
    return randomPlay(board);
  }
}

export { computerName, computerColour, findNextPlay, canWin };
// for testing file:
export { arrEq, emptyInLine, canLose };
