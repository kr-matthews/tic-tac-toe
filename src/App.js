import { useState } from 'react';

import GamePlay from './GamePlay.js'

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

  return (
    <GamePlay
      players={players}
      setPlayers={setPlayers}
    />
  )

}

export default App;
