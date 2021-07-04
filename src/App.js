import { useState } from 'react';

import PlayerSelection from './PlayerSelection.js'
import GamePlay from './GamePlay.js'

import './css/index.css'

function App() {

  /* constants */
  /* a player consists of: name, colour, piece, type, wins, draws, loses */
  const [players, setPlayers] = useState(
    [
      {name: "Alice", colour: "blue", piece: "x",
        type: 0, wins: 3, draws: 5, loses: 1},
      {name: "Bob", colour: "red", piece: "o",
        type: 0, wins: 1, draws: 5, loses: 3}
    ]
  );
  /* dummy data for testing, initial state should be [] */

  /* should be < 2 */
  if (players.length < -2) {
    return (
      <PlayerSelection
        players={players}
        setPlayers={setPlayers}
      />
    )
  } else {
    return (
      <GamePlay
        players={players}
        setPlayers={setPlayers}
        goFirst={0}
      />
    )
  }

}

export default App;
