import { useState, useEffect } from 'react'

import Header from './Header.js'

import './css/index.css'

function App() {

  /* constants */

  /* a player consists of: name, colour, type, wins, draws, loses */
  const [players, setPlayers] = useState(
    [
      /* dummy data for testing, initial state should be [] */
      //{name: "Alice", colour: "blue", type: "computer", difficulty: 2, wins: 0, draws: 0, loses: 0},
      //{name: "Bob", colour: "red", type: "computer", difficulty: 0, wins: 0, draws: 0, loses: 0}
    ]
  );
  /* board position is i for player i, -1 for empty */
  const [board, setBoard] = useState(
    [[-1, -1, -1],[-1, -1, -1],[-1, -1, -1]]
  );
  const [toPlay, setToPlay] = useState(-1);
  /* 0, 1 for player win, -1 for not yet, 2 for draw */
  const [outcome, setOutcome] = useState(-1);
  /* for temporary storage when creating a player */
  const [player, setPlayer] = useState({});


  /* effects */

  useEffect(() => {
    if (toPlay >= 0 && players[toPlay].type === "computer") {
      // TODO: add proper strategy instead of random
      let {row, col} = findNextPlay(players[toPlay].difficulty);
      setTimeout(() => {
        placePiece(row, col);
      }, 700 + players[toPlay].difficulty * 350);
    }
  }, [toPlay]);
  useEffect(() => {
    if (players.length === 2 && players[0].colour === players[1].colour) {
      if (players[1].type === "computer") {
        let newPlayers = [...players];
        newPlayers[1].colour = computerColour(-1);
        setPlayers(newPlayers);
      } else if (players[0].type === "computer") {
        let newPlayers = [...players];
        newPlayers[0].colour = computerColour(-1);
        setPlayers(newPlayers);
      }
    }
  }, [players.length])


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
  function isColour(str){
    let s = new Option().style;
    s.color = str;
    return s.color !== '';
  }

  function placePiece(r_ind, c_ind) {
    let copyBoard = [...board];
    copyBoard[r_ind][c_ind] = toPlay;
    setBoard(copyBoard);
    if (won(r_ind, c_ind)) {
      setOutcome(toPlay);
      let newPlayers = [...players];
      newPlayers[toPlay].wins += 1;
      newPlayers[1 - toPlay].loses += 1;
      setPlayers(newPlayers);
    } else if (full()) {
      setOutcome(2);
      let newPlayers = [...players];
      newPlayers[toPlay].draws += 1;
      newPlayers[1 - toPlay].draws += 1;
      setPlayers(newPlayers);
    } else {
      setToPlay(1 - toPlay);
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


  /* computer player strategies */
  function findNextPlay(diff) {
    var row = 1;
    var col = 1;
    while (board[row][col] !== -1) {
      row = Math.floor(Math.random() * 3);
      col = Math.floor(Math.random() * 3);
    }
    return {row, col}
  }


  /* return */
  // TODO: split up into components once the structure is better understood

  if (players.length < 2) {
    /* create/select a player */
    return (
      <>
        {players.length === 0 ?
          <div>First Player:</div> :
          <div>Second Player:</div>
        }
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
        {
          player.type === "computer" && (
            <form>
              <label htmlFor="difficulty">
                Difficulty:
                <select
                  id="difficulty"
                  name="difficulty"
                  value={player.difficulty}
                  onChange={(e) => {
                    setPlayer({...player, difficulty: e.target.value});
                  }}
                >
                  <option value="">Random</option>
                  <option value="0">Easy</option>
                  <option value="1">Medium</option>
                  <option value="2">Hard</option>
                </select>
              </label>
              <input
                type="submit"
                value="Submit"
                onClick={(e) => {
                  e.preventDefault();
                  let diff = (
                    !player.difficulty
                  ) ? (
                    Math.floor(Math.random() * 3)
                  ) : (
                    parseInt(player.difficulty, 10)
                  );
                  let newPlayers = [...players];
                  newPlayers.push({
                    name: computerName(diff),
                    type: "computer",
                    difficulty: diff,
                    colour: computerColour(diff),
                    wins: 0,
                    draws: 0,
                    loses: 0
                  })
                  setPlayers(newPlayers);
                  setPlayer({});
                }}
              />
            </form>
          )
        }

        {
          player.type === "human" && (
            <form>
              <label htmlFor="name">
                Name:
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter a display name..."
                  value={player.name}
                  onChange={(e) => {
                    setPlayer({...player, name: e.target.value});
                  }}
                />
              </label>
              <label htmlFor="colour">
                Colour:
                <input
                  type="text"
                  id="colour"
                  name="colour"
                  placeholder="Pick your piece colour..."
                  value={player.colour}
                  onChange={(e) => {
                    setPlayer({...player, colour: e.target.value.toLowerCase()});
                  }}
                />
              </label>
              <input
                type="submit"
                value="Submit"
                onClick={(e) => {
                  e.preventDefault();
                  let newPlayers = [...players];
                  newPlayers.push({
                    name: player.name,
                    colour: player.colour,
                    type: "human",
                    wins: 0,
                    draws: 0,
                    loses: 0
                  })
                  !isColour(player.colour) && alert("Enter a valid colour.");
                  isColour(player.colour) && setPlayers(newPlayers);
                  isColour(player.colour) && setPlayer({});
                }}
              />
            </form>
          )
        }
      </>
    )


  } else if (toPlay === -1) {
    /* pick who goes first */
    return (
      <>
      <Header
      players={players}
      Header/>
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
    /* show board, with buttons for humans as applicable */
    return (
      <>
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
                    <span key={c_ind}> .{players[square].piece}. </span>
                  ) : (
                    (outcome === -1 && players[toPlay].type === "human") ? (
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
                    )
                  )
                )
              })
            }
            </div>
          )
        })
      }
      { /* who goes next */ /* this and below is common to the computer case */
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
