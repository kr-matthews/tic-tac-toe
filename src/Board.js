import { lines } from "./computerPlayersAndStrategy/boardLists.js";

// given as className to table cells, dictating where to draw borders
function borders(r_ind, c_ind) {
  var ans = "";
  if (r_ind < 2) {
    ans += " bottom";
  }
  if (c_ind < 2) {
    ans += " right";
  }
  return ans;
}

/* check properties of the board */
function isFull(board) {
  return ![...board[0], ...board[1], ...board[2]].includes(-1);
}
function checkForWin(board) {
  return lines.filter((line) => {
    let pieces = line.map(([r, c]) => {
      return board[r][c];
    });
    return !pieces.includes(-1) && allEq(pieces);
  });
}
function allEq(arr) {
  return new Set(arr).size === 1;
}
function isIn(arrs, p, q) {
  return arrs.some((arr) => {
    return arr.some(([a, b]) => {
      return a === p && b === q;
    });
  });
}

function BoardSquare({
  winner,
  square,
  r_ind,
  c_ind,
  players,
  outcome,
  toPlay,
  placePiece,
}) {
  let tdClass = "square" + borders(r_ind, c_ind);

  if (square !== -1) {
    /* piece already placed here */
    return (
      <td className={tdClass + (winner ? " winner" : "")}>
        <font style={{ color: players[square].colour }}>
          {players[square].piece}
        </font>
      </td>
    );
  } else if (
    outcome === -1 &&
    toPlay >= 0 &&
    players[toPlay].type === "human"
  ) {
    /* no piece here, first player has been selected, square is valid move */
    return (
      <td className={tdClass}>
        <button
          key={c_ind}
          type="button"
          onClick={() => placePiece(r_ind, c_ind)}
        ></button>
      </td>
    );
  } else {
    /* no piece here, game not started, or won, or computer to play */
    return <td className={tdClass} key={c_ind}></td>;
  }
}

function Board({ board, players, toPlay, outcome, placePiece }) {
  let winLines = checkForWin(board);
  return (
    <table className="board">
      <tbody>
        {board.map((row, r_ind) => {
          return (
            <tr className="row" key={r_ind}>
              {row.map((square, c_ind) => {
                return (
                  <BoardSquare
                    winner={isIn(winLines, r_ind, c_ind)}
                    key={c_ind}
                    square={square}
                    r_ind={r_ind}
                    c_ind={c_ind}
                    players={players}
                    outcome={outcome}
                    toPlay={toPlay}
                    placePiece={placePiece}
                  />
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Board;

export { checkForWin, isFull };
