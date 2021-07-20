

function GameMessage({outcome, players, toPlay}) {
  return (
    <>
      { /* who goes next */
        outcome === -1 && (
          <div>Next to play: {players[toPlay].name}</div>
        )
      }
      { /* display winner */
        (outcome === 0 || outcome === 1) && (
          <h2>{players[outcome].name} wins!</h2>
        )
      }
      { /* display draw */
        outcome === 2 && (
          <h2>It's a draw.</h2>
        )
      }
    </>
  )
}

export default GameMessage;
