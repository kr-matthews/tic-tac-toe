function Header({ players, toPlay }) {
  const [p0, p1] = players;

  return (
    <>
      <header>
        <span>{p0.difficulty} - </span>
        <span>{p0.colour} - </span>
        <span>{p0.piece} - </span>
        <span>{p0.name} - </span>
        <span>{p0.wins} win(s) || </span>
        <span>{p0.draws} draw(s)</span>
        <span> || {p1.wins} win(s) - </span>
        <span>{p1.name} - </span>
        <span>{p1.piece} - </span>
        <span>{p1.colour} - </span>
        <span>{p1.difficulty}</span>
      </header>
    </>
  );
}

export default Header;
