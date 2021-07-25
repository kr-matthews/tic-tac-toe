import _ from "lodash";

import { isNotDuplicate } from "./boardSymmetries.js";
import { allSquares } from "./boardLists.js";
import { scorePlay, sortScoredSquares } from "./scoringComputerPlays.js";
import { probabilityOfOptimalPlay } from "./computerPlayerValues";

// helper functions ---------------------------------------

// randomly sample until an open spot is found, with given starting point
function randomPlayWithPreference(board, row, col) {
  while (board[row][col] !== -1) {
    row = Math.floor(Math.random() * 3);
    col = Math.floor(Math.random() * 3);
  }
  return { row, col };
}
// randomly sample until an open spot is found
function randomPlay(board) {
  return randomPlayWithPreference(
    board,
    Math.floor(Math.random() * 3),
    Math.floor(Math.random() * 3)
  );
}
// check whether the spot on the board is open
function isValidPlay(square, board) {
  let [row, col] = square;
  return board[row][col] === -1;
}

// primary function ----------------------------------------

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

export { findNextPlay };
