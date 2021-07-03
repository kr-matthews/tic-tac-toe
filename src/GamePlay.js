import { useState } from 'react'

function GamePlay({players, setPlayers, goFirst}) {

  console.log("game play");
  console.log(players);

  /* constants */
  const [board, setBoard] =
    useState([[null, null, null],[null, null, null],[null, null, null]]);
  const [nextTurn, setNextTurn] = useState(goFirst);

  return (
    <>
      <div>game play</div>
      <div className="board">{board}</div>
    </>
  )
}

export default GamePlay;
