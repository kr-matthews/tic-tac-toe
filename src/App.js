import { useState, useEffect } from "react";

import Header from "./Header.js";
import SelectPlayer from "./SelectPlayer.js";
import SelectGoFirst from "./SelectGoFirst.js";
import Board from "./Board.js";
import GameMessage from "./GameMessage.js";
import SelectRestart from "./SelectRestart.js";

import { findNextPlay } from "./computerPlayersAndStrategy/computerStrategy.js";
import { computerColour } from "./computerPlayersAndStrategy/computerPlayerValues.js";

import "./index.css";
import "./header.css";
import "./board.css";

// TODO: ideally, the board functions should be compartmentalized in their
//  own file - which requires a lot of prop drilling, so context should be used

function App() {
  /* constants */

  /* a player consists of: name, colour, type, wins, draws, loses */
  const [players, setPlayers] = useState([]);
  /* board position is i for player i, -1 for empty */
  const initBoard = [
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1],
  ];
  const [board, setBoard] = useState(initBoard);
  const [toPlay, setToPlay] = useState(-1);
  /* 0, 1 for player win, -1 for not yet, 2 for draw */
  const [outcome, setOutcome] = useState(-1);

  /* effects */

  useEffect(() => {
    // if computer's turn, do it's move
    if (toPlay >= 0 && players[toPlay].type === "computer") {
      let { row, col } = findNextPlay(
        players[toPlay].difficulty,
        board,
        toPlay
      );
      setTimeout(() => {
        placePiece(row, col);
      }, 700 + players[toPlay].difficulty * 350);
    }
    // eslint-disable-next-line
  }, [toPlay]);
  useEffect(() => {
    // reselect a computer colour if necessary to avoid conflict
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
    // eslint-disable-next-line
  }, [players.length]);

  /* functions */
  function placePiece(r_ind, c_ind) {
    let newBoard = [...board];
    newBoard[r_ind][c_ind] = toPlay;
    setBoard(newBoard);
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
    return ![...board[0], ...board[1], ...board[2]].includes(-1);
  }
  function won(r, c) {
    //todo: redo with "lines"
    return (
      allEq([toPlay, board[0][c], board[1][c], board[2][c]]) ||
      allEq([toPlay, board[r][0], board[r][1], board[r][2]]) ||
      allEq([toPlay, board[0][0], board[1][1], board[2][2]]) ||
      allEq([toPlay, board[0][2], board[1][1], board[2][0]])
    );
  }
  function allEq(arr) {
    return new Set(arr).size === 1;
  }

  /* reset states */
  function reset() {
    resetBoard();
    setPlayers([]);
  }
  function resetBoard() {
    /* not just the board, but also the outcome and who goes first */
    setBoard(initBoard);
    setOutcome(-1);
    setToPlay(-1);
    let newPlayers = [...players];
    delete newPlayers[0].piece;
    delete newPlayers[1].piece;
    setPlayers(newPlayers);
  }

  /* return */

  if (players.length < 2) {
    return <SelectPlayer players={players} setPlayers={setPlayers} />;
  } else if (toPlay === -1) {
    /* pick who goes first */
    return (
      <>
        <Header players={players} />
        <Board
          board={board}
          players={players}
          toPlay={toPlay}
          outcome={outcome}
          placePiece={placePiece}
        />
        <SelectGoFirst
          players={players}
          setPlayers={setPlayers}
          setToPlay={setToPlay}
        />
      </>
    );
  } else {
    return (
      <>
        <Header players={players} />
        <Board
          board={board}
          players={players}
          toPlay={toPlay}
          outcome={outcome}
          placePiece={placePiece}
        />
        <GameMessage players={players} toPlay={toPlay} outcome={outcome} />
        {outcome !== -1 && (
          <SelectRestart
            outcome={outcome}
            reset={reset}
            resetBoard={resetBoard}
          />
        )}
      </>
    );
  }
}

export default App;
