function SelectGoFirst({ players, setPlayers, setToPlay }) {
  return (
    <>
      <div className="message">Select which player will go first.</div>
      {players.map((player, index) => {
        return (
          <button
            key={index}
            type="button"
            onClick={() => {
              setToPlay(index);
              let newPlayers = [...players];
              newPlayers[index].piece = "X";
              newPlayers[1 - index].piece = "O";
              setPlayers(newPlayers);
            }}
          >
            {player.name}
          </button>
        );
      })}
    </>
  );
}

export default SelectGoFirst;
