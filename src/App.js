import { useState } from 'react'

import Header from './Header.js'

import './css/index.css'

function App() {

  /* constants */

  /* a player consists of: name, colour, type, wins, draws, loses */
  const [players, setPlayers] = useState(
    [
      /* dummy data for testing, initial state should be [] */
      {name: "Alice", colour: "blue", type: "human", wins: 0, draws: 0, loses: 0},
      {name: "Bob", colour: "red", type: "human", wins: 0, draws: 0, loses: 0}
    ]
  );
  /* board position is i for player i, -1 for empty */
  const [board, setBoard] = useState(
    [[-1, -1, -1],[-1, -1, -1],[-1, -1, -1]]
  );
  const [toPlay, setToPlay] = useState(-1);
  /* 0, 1 for player win, -1 for not yet, 2 for draw */
  const [outcome, setOutcome] = useState(-1);
  const [player, setPlayer] = useState({});


  /* functions */

  /* reset states */
  function resetPlayers() {
    /* also reset the board for when we come back later */
    resetBoard();
    setPlayers([]);
  }
  function resetBoard() {
    /* not just the board, but also the outcome and who goes first */
    let newBoard = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
    setBoard(newBoard);
    setOutcome(-1);
    setToPlay(-1);
  }

  function placePiece(r_ind, c_ind) {
    let copyBoard = [...board];
    copyBoard[r_ind][c_ind] = toPlay;
    setBoard(copyBoard);
    if (won(r_ind, c_ind)) {
      setOutcome(toPlay);
      players[toPlay].wins += 1;
      players[1 - toPlay].loses += 1;
    } else {
      setToPlay(1 - toPlay);
      if (full()) {
        setOutcome(2);
        players[toPlay].draws += 1;
        players[1 - toPlay].draws += 1;
      }
    }
  }

  /* check properties of the board */
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


  /* return */

  if (players.length === 0) {
    /* create / select 1st player */
    return (
      <>
        <div>First Player:</div>
        <button type="button" onClick={() => {
            setPlayer({type: "human"})
          }}
        >
        Player-Controlled
        </button>
        <button type="button" onClick={() => {
            setPlayer({type: "computer"})
          }}
        >
        Computer-Controlled
        </button>
      </>
    )
  } else if (players.length === 1) {
    /* create / select 2nd player */
    return "1 player"
  } else if (toPlay === -1) {
    /* pick who goes first */
    return (
      <>
      <div>Select who will go first:</div>
      {
        players.map((player, index) => {
          return (
            <button key={index} type="button" onClick={() => {
                setToPlay(index);
                players[index].piece = 'x';
                players[1 - index].piece = 'o';
              }}
            >
            {player.name}
            </button>
          )
        })
      }
      </>
    )
  } else {
    /* play a round */
    return (
      <>
      <div>WIP</div>
      <Header
      players={players}
      Header/>
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
                      </button>
                    ) : (
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

export default App;
