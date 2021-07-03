import { useState } from 'react';

import PlayerSelection from './PlayerSelection.js'
import GamePlay from './GamePlay.js'

import './css/index.css'

function App() {

  /* constants */
  const [players, setPlayers] = useState([]);

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
        goFirst={1}
      />
    )
  }

}

export default App;
