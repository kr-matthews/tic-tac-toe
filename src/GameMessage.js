function GameMessage({ outcome, players, toPlay }) {
  if (outcome === -1) {
    // game on-going
    return <div>Next to play: {players[toPlay].name}</div>;
  } else if (outcome === 2) {
    // it's a draw
    return <div>It's a draw.</div>;
  } else {
    // outcome indicates which players has won
    return <div>{players[outcome].name} wins!</div>;
  }
}

export default GameMessage;
