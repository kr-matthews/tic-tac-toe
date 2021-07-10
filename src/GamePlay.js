import { useState } from 'react'
import Header from './Header.js'
import Board from './Board.js'

function GamePlay({players, setPlayers}) {

  /* constants */
  /* board position is i for player i, -1 for empty */
  const [board, setBoard] =
    useState([[-1, -1, -1],[-1, -1, -1],[-1, -1, -1]]);

  return (
    <>
    <div>WIP</div>
      <Header
        players={players}
      Header/>
      <Board
        players={players}
        board={board}
        setBoard={setBoard}
      Board/>
    </>
  )
}

export default GamePlay;
