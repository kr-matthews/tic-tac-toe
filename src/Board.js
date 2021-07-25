function BoardSquare({
  square,
  r_ind,
  c_ind,
  players,
  outcome,
  toPlay,
  placePiece,
}) {
  if (square !== -1) {
    /* piece already placed here */
    return <span> .{players[square].piece}. </span>;
  } else if (
    outcome === -1 &&
    toPlay >= 0 &&
    players[toPlay].type === "human"
  ) {
    /* no piece here, first player has been selected, square is valid move */
    return (
      <button
        key={c_ind}
        type="button"
        onClick={() => placePiece(r_ind, c_ind)}
      >
        .
      </button>
    );
  } else {
    /* no piece here, game not started, or won, or computer to play */
    return <span key={c_ind}> .... </span>;
  }
}

function Board({ board, players, toPlay, outcome, placePiece }) {
  return board.map((row, r_ind) => {
    return (
      <div key={r_ind}>
        {row.map((square, c_ind) => {
          return (
            <BoardSquare
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
      </div>
    );
  });
}

export default Board;
