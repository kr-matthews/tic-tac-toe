function specialBoard1(toPlay) {
  return [
    [toPlay, -1, -1],
    [-1, 1 - toPlay, -1],
    [-1, -1, -1],
  ];
}
const specialSquare1 = [2, 2];

function specialBoard2(toPlay) {
  return [
    [1 - toPlay, -1, -1],
    [-1, toPlay, -1],
    [-1, -1, 1 - toPlay],
  ];
}
const specialSquare2a = [0, 2];
const specialSquare2b = [2, 0];

export {
  specialBoard1,
  specialBoard2,
  specialSquare1,
  specialSquare2a,
  specialSquare2b,
};
