import { useState } from "react";

import {
  computerName,
  computerColour,
  getDifficulty,
} from "./computerPlayersAndStrategy/computerPlayerValues.js";

function isColour(str) {
  let s = new Option().style;
  s.color = str;
  return s.color !== "";
}
function numericAdjective(num) {
  if (num < 13) {
    return [
      "First",
      "Second",
      "Third",
      "Fourth",
      "Fifth",
      "Sixth",
      "Seventh",
      "Eight",
      "Ninth",
      "Tenth",
      "Eleventh",
      "Twelth",
      "Thirteenth",
    ][num];
  } else if (num % 10 === 1) {
    return num + "st";
  } else if (num % 10 === 2) {
    return num + "nd";
  } else if (num % 10 === 3) {
    return num + "rd";
  } else {
    return num + "th";
  }
}

function PlayerSelection({ players, setPlayers }) {
  return (
    <>
      <h4>Tic Tac Toe</h4>
      <div>
        Enter the {numericAdjective(players.length).toLowerCase()} player's
        information, <u>or</u> select a difficulty for a computer-controlled
        player.
      </div>
      <SelectHuman players={players} setPlayers={setPlayers} />
      <SelectComputer players={players} setPlayers={setPlayers} />
    </>
  );
}

function SelectHuman({ players, setPlayers }) {
  /* for temporary storage when creating a player */
  const [player, setPlayer] = useState({ name: "", colour: "" });

  return (
    <form className="playerForm human">
      <label htmlFor="name">
        Name:
        <input
          type="text"
          id="name"
          name="name"
          placeholder="display name"
          value={player.name}
          onChange={(e) => {
            setPlayer({ ...player, name: e.target.value });
          }}
        />
        <span className={player.name === "" ? "hide" : ""}>&#10003;</span>
      </label>
      <label htmlFor="colour">
        Colour:
        <input
          type="text"
          id="colour"
          name="colour"
          placeholder="name or hex/decimal code"
          value={player.colour}
          onChange={(e) => {
            setPlayer({ ...player, colour: e.target.value.toLowerCase() });
          }}
        />
        <span
          className={isColour(player.colour) ? "" : "hide"}
          style={isColour(player.colour) ? { color: player.colour } : {}}
        >
          &#10003;
        </span>
      </label>
      <input
        className="button"
        type="submit"
        value="Submit Human"
        onClick={(e) => {
          e.preventDefault();
          if (player.name === "") {
            alert("Please enter a name with at least one character.");
          } else if (isColour(player.colour)) {
            setPlayers([
              ...players,
              {
                name: player.name,
                colour: player.colour,
                type: "human",
                wins: 0,
                draws: 0,
                loses: 0,
              },
            ]);
            setPlayer({ ...player, name: "", colour: "" });
          } else {
            // maybe later check to see whether they selected the background colour as their piece colour and reject it
            alert(
              "Please enter a valid colour.\nUse a name ('red'), hex code ('#FF0000'), or decimal code ('rgb(255,0,0)')."
            );
          }
        }}
      />
    </form>
  );
}

function SelectComputer({ players, setPlayers }) {
  /* for temporary storage when creating a player */
  const [player, setPlayer] = useState({ difficulty: "" });

  return (
    <form className="playerForm computer">
      <label htmlFor="difficulty">
        Difficulty:
        <select
          id="difficulty"
          name="difficulty"
          value={player.difficulty}
          onChange={(e) => {
            setPlayer({ ...player, difficulty: e.target.value });
          }}
        >
          <option value="">Random</option>
          <option value="0">Easy</option>
          <option value="1">Medium</option>
          <option value="2">Hard</option>
        </select>
      </label>
      <input
        className="button"
        type="submit"
        value="Submit Computer"
        onClick={(e) => {
          e.preventDefault();
          let diff = getDifficulty(player.difficulty);
          setPlayers([
            ...players,
            {
              name: computerName(diff),
              type: "computer",
              difficulty: diff,
              colour: computerColour(diff),
              wins: 0,
              draws: 0,
              loses: 0,
            },
          ]);
          setPlayer({ ...player, difficulty: "" });
        }}
      />
    </form>
  );
}

export default PlayerSelection;
