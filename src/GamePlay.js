import { useState } from 'react'
import Header from './Header.js'
import Board from './Board.js'

function GamePlay({players, setPlayers, goFirst}) {

  /* constants */
  const [board, setBoard] =
    useState([[-1, -1, -1],[-1, -1, -1],[-1, -1, -1]]);
    /* board position is i for player i, -1 for empty */
  const [nextTurn, setNextTurn] = useState(goFirst);

  return (
    <>
      <Header
        players={players}
        nextTurn={nextTurn}
      Header/>
      <Board
        players={players}
        nextTurn={nextTurn}
        setNextTurn={setNextTurn}
        board={board}
        setBoard={setBoard}
      Board/>
    </>
  )
}

export default GamePlay;
