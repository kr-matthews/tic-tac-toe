function Board({ board, players, toPlay, outcome, placePiece }) {
  return board.map((row, r_ind) => {
    return (
      <div key={r_ind}>
        {row.map((square, c_ind) => {
          return square !== -1 ? (
            /* piece already placed here */
            <span key={c_ind}> .{players[square].piece}. </span>
          ) : outcome === -1 && players[toPlay].type === "human" ? (
            /* no piece, is valid move */
            <button
              key={c_ind}
              type="button"
              onClick={() => placePiece(r_ind, c_ind)}
            >
              ..
            </button>
          ) : (
            /* no piece, somebody already won */
            <span key={c_ind}> .... </span>
          );
        })}
      </div>
    );
  });
}

export default Board;
