

function Header({ players, toPlay }) {

  const [p0, p1] = players;

  return (
    <>
      <header>
        <span>{p0.piece} - </span>
        <span>{p0.name} - </span>
        <span>{p0.wins} win(s) || </span>
        <span>{p1.wins} win(s) - </span>
        <span>{p1.name} - </span>
        <span>{p1.piece}</span>
      </header>
    </>
  )
}

export default Header;
