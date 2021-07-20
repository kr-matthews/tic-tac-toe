

function SelectRestart({outcome, reset, resetBoard}) {
  return (
    outcome !== -1 && (
      <>
        <button
          type="button"
          onClick={resetBoard}
        >
        Play Again
        </button>
        <button
          type="button"
          onClick={reset}
        >
        New Players
        </button>
      </>
    )
  )
}

export default SelectRestart;
