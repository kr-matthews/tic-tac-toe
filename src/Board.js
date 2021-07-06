import { useState } from 'react';
// import xIcon from './images/tic-tac-toe-x.svg'
// import oIcon from './images/tic-tac-toe-o.svg'

function Board({ board, setBoard, players, toPlay, setToPlay }) {

  /* constants */
  const [outcome, setOutcome] = useState(-1);
  /* 0, 1 for player win, -1 for not yet, 2 for draw */

  /* functions */
  function placePiece(r_ind, c_ind) {
    let copyBoard = [...board];
    copyBoard[r_ind][c_ind] = toPlay;
    setBoard(copyBoard);
    // TODO: check win conditions here
    if (won(r_ind, c_ind)) {
      // TODO: reset board, toPlay, player win counts
      setOutcome(toPlay);
    } else {
      // TODO: refactor the winning/drawing logic
      setToPlay(1 - toPlay);
      if (full()) { setOutcome(2) }
    }
  }

  function full() {
    return !([...board[0], ...board[1], ...board[2]]).includes(-1)
  }

  function won(r, c) {
    return (
      all_eq([toPlay, board[0][c], board[1][c], board[2][c]]) ||
      all_eq([toPlay, board[r][0], board[r][1], board[r][2]]) ||
      all_eq([toPlay, board[0][0], board[1][1], board[2][2]]) ||
      all_eq([toPlay, board[0][2], board[1][1], board[2][0]])
    )
  }
  function all_eq(arr) {
    return (new Set(arr)).size === 1
  }

  return (
    <>
      { /* the board */
        board.map((row, r_ind) => {
          return (
            <div key={r_ind}>
              {
                row.map((square, c_ind) => {
                  return (
                    square !== -1 ?
                      <span key={c_ind}> '{players[square].piece}' </span> :
                      <button
                        key={c_ind}
                        type="button"
                        onClick={() => placePiece(r_ind, c_ind)}
                      >
                      "
                      </button>
                  )
                })
              }
            </div>
          )
        })
      }
      { /* who goes next */
        <div>Next to play: {players[toPlay].name}</div>
      }
      { /* display winner */
        (outcome === 0 || outcome === 1) && (
          <h2>{players[outcome].name} wins!</h2>
        )
      }
      { /* display draw */
        outcome === 2 && <h2>It's a draw.</h2>
      }
      { /* show restart options */

      }
    </>
  )
}

export default Board;
