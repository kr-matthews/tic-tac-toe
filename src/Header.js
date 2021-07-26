function Header({ players }) {
  let s = players[0].draws === 1 ? "" : "s";
  return (
    <>
      <header>
        <PlayerInfoBox player={players[0]} />
        <span className="spec draws">
          {players[0].draws} Draw{s}
        </span>
        <PlayerInfoBox player={players[1]} />
      </header>
    </>
  );
}

function PlayerInfoBox({ player }) {
  let s = player.wins === 1 ? "" : "s";
  return (
    <span className="infoBox">
      <span className="spec name">
        <font style={{ color: player.colour }}>{player.name}</font>
      </span>
      <span className="spec piece">
        <font style={{ color: player.colour }}>{player.piece}</font>
      </span>
      <span className="spec wins">
        {player.wins} Win{s}
      </span>
    </span>
  );
}

export default Header;
