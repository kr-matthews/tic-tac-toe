// given difficulty in string form (or "" indicating random) return integer
function getDifficulty(diff) {
  if (diff) {
    return parseInt(diff, 10);
  } else {
    return Math.floor(Math.random() * 3);
  }
}
// names of computer players
function computerName(diff) {
  switch (diff) {
    case 0:
      return "Rookie Ron";
    case 1:
      return "Seasoned Sam";
    case 2:
      return "Expert Ellie";
    default:
      return "Error Erik";
  }
}
// colours of computer players, and default backup for conflicts
function computerColour(diff) {
  switch (diff) {
    case 0:
      return "green";
    case 1:
      return "yellow";
    case 2:
      return "red";
    default:
      return "purple";
  }
}
// given a move to play, the chances the computer player will take it
function computerOptimalRate(diff) {
  switch (diff) {
    case 0:
      return 0.55;
    case 1:
      return 0.8;
    case 2:
      return 0.97;
    default:
      return 1;
  }
}

export { getDifficulty, computerName, computerColour, computerOptimalRate };
