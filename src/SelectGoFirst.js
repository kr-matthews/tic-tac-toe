

function SelectGoFirst({players, setPlayers, setToPlay}) {
  return (
    <>
      <div>Select who will go first:</div>
      {
        players.map((player, index) => {
          return (
            <button key={index} type="button" onClick={() => {
                setToPlay(index);
                let newPlayers = [...players];
                newPlayers[index].piece = 'x';
                newPlayers[1 - index].piece = 'o';
                setPlayers(newPlayers);
              }}
            >
            {player.name}
            </button>
          )
        })
      }
    </>
  )
}

export default SelectGoFirst;
