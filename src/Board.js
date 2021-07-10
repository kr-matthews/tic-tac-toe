import { useState } from 'react';
// import xIcon from './images/tic-tac-toe-x.svg'
// import oIcon from './images/tic-tac-toe-o.svg'

function Board({ board, setBoard, players}) {

  /* constants */
  const [toPlay, setToPlay] = useState(-1);
  /* 0, 1 for player win, -1 for not yet, 2 for draw */
  const [outcome, setOutcome] = useState(-1);

  /* functions */
  function resetBoard() {
    let newBoard = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
    setBoard(newBoard);
    setOutcome(-1);
    setToPlay(-1);
  }
  function resetPlayers() {
    return "hmm"
  }

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

  if (toPlay === -1) {
    return (
      <>
        <div>Select who will go first:</div>
        {
          players.map((player, index) => {
            return (
              <button key={index} type="button" onClick={()=>setToPlay(index)}>
                {player.name}
              </button>
            )
          })
        }
      </>
    )
  } else {
    return (
      <>
      { /* the board */
        board.map((row, r_ind) => {
          return (
            <div key={r_ind}>
            {
              row.map((square, c_ind) => {
                return (
                  square !== -1 ? (
                    /* piece already placed here */
                    <span key={c_ind}> '{players[square].piece}' </span>
                  ) : (
                    outcome === -1 ? (
                      /* no piece, is valid move */
                      <button
                      key={c_ind}
                      type="button"
                      onClick={() => placePiece(r_ind, c_ind)}
                      >
                      "
                      </button>) : (
                        /* no piece, somebody already won */
                        <span key={c_ind}>'-'</span>
                      )
                    )
                  )
                })
              }
              </div>
            )
          })
        }
        { /* who goes next */
          outcome === -1 && (
            <div>Next to play: {players[toPlay].name}</div>
          )
        }
        { /* display winner */
          (outcome === 0 || outcome === 1) && (
            <h2>{players[outcome].name} wins!</h2>
          )
        }
        { /* display draw */
          outcome === 2 && (
            <h2>It's a draw.</h2>
          )
        }
        { /* show restart options */
          outcome !== -1 && (
            <>
              <button
                type="button"
                onClick={resetBoard}
              >
                Play Again
              </button>
              <button
                type="button"
                onClick={resetPlayers}
              >
                New Players
              </button>
            </>
          )
        }
        </>
      )
  }
}

export default Board;
