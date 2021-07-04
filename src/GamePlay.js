import { useState } from 'react'
import Header from './Header.js'
import Board from './Board.js'

function GamePlay({players, setPlayers, goFirst}) {

  console.log("game play");
  console.log(players);

  /* constants */
  const [board, setBoard] =
    useState([[null, null, null],[null, null, null],[null, null, null]]);
  const [nextTurn, setNextTurn] = useState(goFirst);

  return (
    <>
      <Header players={players} Header/>
      <Board board={board} Board/ >
    </>
  )
}

export default GamePlay;
