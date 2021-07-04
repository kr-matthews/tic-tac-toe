

function Header({ players, nextTurn }) {

  const [p0, p1] = players;

  return (
    <>
      <header>
        <span>{p0.piece}-</span>
        <span>{p0.name}-</span>
        <span>{p0.wins}-</span>
        <span>{p1.wins}-</span>
        <span>{p1.name}-</span>
        <span>{p1.piece}</span>
        <div>Next to play: {players[nextTurn].name}</div>
      </header>
    </>
  )
}

export default Header;
