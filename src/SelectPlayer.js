import { useState } from 'react';

import { computerName, computerColour } from './computerPlayers.js';

function isColour(str) {
  let s = new Option().style;
  s.color = str;
  return s.color !== '';
}
function numericAdjective(num) {
  if (num < 6) {
    return (
      ["First", "Second", "Third", "Fourth", "Fifth", "Sixth",
       "Seventh", "Eight", "Ninth", "Tenth", "Eleventh",
       "Twelth", "Thirteenth"][num]
     )
  } else if (num % 10 === 1) {
    return num + "st"
  } else if (num % 10 === 2) {
    return num + "nd"
  } else if (num % 10 === 3) {
    return num + "rd"
  } else {
    return num + "th"
  }
}


function PlayerSelection({players, setPlayers}) {
  return (
    <>
      <div>
        Enter the {numericAdjective(players.length).toLowerCase()} player's
        information, or select a difficulty for a computer-controlled player.
      </div>
      <SelectHuman
        players={players}
        setPlayers={setPlayers}
      />
      <SelectComputer
        players={players}
        setPlayers={setPlayers}
      />
    </>
  )
}

function SelectHuman({players, setPlayers}) {

  /* for temporary storage when creating a player */
  const [player, setPlayer] = useState({});

  return (
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

function SelectComputer({players, setPlayers}) {

  /* for temporary storage when creating a player */
  const [player, setPlayer] = useState({});

  return (
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

export default PlayerSelection;