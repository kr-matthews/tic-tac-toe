// import xIcon from './images/tic-tac-toe-x.svg'
// import oIcon from './images/tic-tac-toe-o.svg'

function Board({ board, setBoard, players, nextTurn, setNextTurn }) {

  /* functions */
  function placePiece(player, r_ind, c_ind) {
    board[r_ind][c_ind] = player;
    setBoard(board);
    // TODO: check win conditions here
    if (won(board, r_ind, c_ind, player)) {
      // TODO: reset board, nextTurn, player win counts
      console.log(players[board[r_ind][c_ind]].name, "wins");
    }
    setNextTurn(1 - player);
  }

  function won(board, r, c, p) {
    return (
      all_eq([p, board[0][c], board[1][c], board[2][c]]) ||
      all_eq([p, board[r][0], board[r][1], board[r][2]]) ||
      all_eq([p, board[0][0], board[1][1], board[2][2]]) ||
      all_eq([p, board[0][2], board[1][1], board[2][0]])
    )
  }
  function all_eq(arr) {
    return (new Set(arr)).size === 1
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
