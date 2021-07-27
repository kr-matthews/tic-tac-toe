function SelectGoFirst({ players, setPlayers, setToPlay }) {
  return (
    <>
      <div className="message">Select which player will go first.</div>
      {players.map((player, index) => {
        return (
          <button
            className="button"
            key={index}
            type="button"
            //style={{ borderColor: player.colour }}
            onClick={() => {
              setToPlay(index);
              let newPlayers = [...players];
              newPlayers[index].piece = "X";
              newPlayers[1 - index].piece = "O";
              setPlayers(newPlayers);
            }}
          >
            <font style={{ color: player.colour }}>{player.name}</font>
          </button>
        );
      })}
    </>
  );
}

export default SelectGoFirst;
