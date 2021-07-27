function SelectRestart({ outcome, reset, resetBoard }) {
  return (
    <>
      <button className="button" type="button" onClick={resetBoard}>
        Play Again
      </button>
      <button className="button" type="button" onClick={reset}>
        New Players
      </button>
    </>
  );
}

export default SelectRestart;
