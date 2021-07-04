// import xIcon from './images/tic-tac-toe-x.svg'
// import oIcon from './images/tic-tac-toe-o.svg'

function Board({ board, setBoard, players, nextTurn, setNextTurn }) {

  /* functions */
  function placePiece(player, r_ind, c_ind) {
    board[r_ind][c_ind] = player;
    setBoard(board);
    // TODO: check win conditions here
    setNextTurn(1 - player);
  }

  return (
    <>
      {
        board.map((row, r_ind) => {
          return (
            <div key={r_ind}>
              {
                row.map((square, c_ind) => {
                  return (
                    square !== -1 ?
                      <span key={c_ind}> {players[square].piece} </span> :
                      <button
                        key={c_ind}
                        type="button"
                        onClick={() => placePiece(nextTurn, r_ind, c_ind)}
                      >
                        .
                      </button>
                  )
                })
              }
            </div>
          )
        })
      }
    </>
  )
}

export default Board;
