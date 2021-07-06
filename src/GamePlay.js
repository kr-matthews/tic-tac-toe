import { useState } from 'react'
import Header from './Header.js'
import Board from './Board.js'

function GamePlay({players, setPlayers, goFirst}) {

  /* constants */
  const [board, setBoard] =
    useState([[-1, -1, -1],[-1, -1, -1],[-1, -1, -1]]);
    /* board position is i for player i, -1 for empty */
  const [toPlay, setToPlay] = useState(goFirst);

  return (
    <>
    <div>WIP</div>
      <Header
        players={players}
        toPlay={toPlay}
      Header/>
      <Board
        players={players}
        toPlay={toPlay}
        setToPlay={setToPlay}
        board={board}
        setBoard={setBoard}
      Board/>
    </>
  )
}

export default GamePlay;
