

function Header({ players }) {

  const [p1, p2] = players;
  /* name, type (0 human, else comp id), colour, wins */

  return (
    <>
      <div>header</div>
      <div>{p1.name}</div>
      <div>{p1.wins}</div>
      <div>{p2.wins}</div>
      <div>{p2.name}</div>
    </>
  )
}

export default Header;
