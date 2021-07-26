function GameMessage({ outcome, players, toPlay }) {
  if (outcome === -1) {
    // game on-going
    return (
      <>
        <div className="message">Next to play:</div>
        <div className="message">
          <font style={{ color: players[toPlay].colour }}>
            {players[toPlay].name}
          </font>
        </div>
      </>
    );
  } else if (outcome === 2) {
    // it's a draw
    return <div className="message">It's a draw.</div>;
  } else {
    // outcome indicates which players has won
    return (
      <div className="message">
        <font style={{ color: players[outcome].colour }}>
          {players[outcome].name}
        </font>{" "}
        wins!
      </div>
    );
  }
}

export default GameMessage;
