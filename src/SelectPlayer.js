import { useState } from 'react';

import { computerName } from './computerPlayers.js';

function isColour(str){
  let s = new Option().style;
  s.color = str;
  return s.color !== '';
}


function PlayerSelection({players, setPlayers, computerColour}) {

  /* constants */
  /* for temporary storage when creating a player */
  const [player, setPlayer] = useState({});

  /* return */
  return (
    <>
      {players.length === 0 ?
        <div>First Player:</div> :
        <div>Second Player:</div>
      }
      <button type="button" onClick={() => {
          setPlayer({type: "human"})
        }}
      >
      Player-Controlled
      </button>
      <button type="button" onClick={() => {
          setPlayer({type: "computer"})
        }}
      >
      Computer-Controlled
      </button>
      {
        player.type === "computer" && (
          <form>
            <label htmlFor="difficulty">
              Difficulty:
              <select
                id="difficulty"
                name="difficulty"
                value={player.difficulty}
                onChange={(e) => {
                  setPlayer({...player, difficulty: e.target.value});
                }}
              >
                <option value="">Random</option>
                <option value="0">Easy</option>
                <option value="1">Medium</option>
                <option value="2">Hard</option>
              </select>
            </label>
            <input
              type="submit"
              value="Submit"
              onClick={(e) => {
                e.preventDefault();
                let diff = (
                  !player.difficulty
                ) ? (
                  Math.floor(Math.random() * 3)
                ) : (
                  parseInt(player.difficulty, 10)
                );
                let newPlayers = [...players];
                newPlayers.push({
                  name: computerName(diff),
                  type: "computer",
                  difficulty: diff,
                  colour: computerColour(diff),
                  wins: 0,
                  draws: 0,
                  loses: 0
                })
                setPlayers(newPlayers);
                setPlayer({});
              }}
            />
          </form>
        )
      }

      {
        player.type === "human" && (
          <form>
            <label htmlFor="name">
              Name:
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter a display name..."
                value={player.name}
                onChange={(e) => {
                  setPlayer({...player, name: e.target.value});
                }}
              />
            </label>
            <label htmlFor="colour">
              Colour:
              <input
                type="text"
                id="colour"
                name="colour"
                placeholder="Pick your piece colour..."
                value={player.colour}
                onChange={(e) => {
                  setPlayer({...player, colour: e.target.value.toLowerCase()});
                }}
              />
            </label>
            <input
              type="submit"
              value="Submit"
              onClick={(e) => {
                e.preventDefault();
                let newPlayers = [...players];
                newPlayers.push({
                  name: player.name,
                  colour: player.colour,
                  type: "human",
                  wins: 0,
                  draws: 0,
                  loses: 0
                })
                !isColour(player.colour) && alert("Enter a valid colour.");
                isColour(player.colour) && setPlayers(newPlayers);
                isColour(player.colour) && setPlayer({});
              }}
            />
          </form>
        )
      }
    </>
  )
}

export default PlayerSelection;
