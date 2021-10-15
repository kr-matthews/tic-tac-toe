# Tic Tac Toe

This is a simple single-page application where two players (human or computer) can play tic-tac-toe.

This was my second project using React, and the first where I wasn't following any type of guide/tutorial. I would do a lot differently if I were to restart this project today.

## Play

On GitHub Pages at [https://kr-matthews.github.io/tic-tac-toe/](https://kr-matthews.github.io/tic-tac-toe/).

## Features

There are two players playing against each other on a common interface (screen). Each player can be human-controlled or one of several built-in computer players.

Wins-ties-loses are tracked (until the page is refreshed or exited).

## Intentions

As my second project (the first being a relatively static website), my main goal was simply to get something that functioned properly. While I tried to follow conventions and best practices, they were secondary to just getting something working (refinement could come in later projects).

## Focus

I ended up focusing on the basics JSX, click handlers, basic state storage and manipulation (`useState` and `useEffect`), and form submissions.

## Flaws

There are many, many flaws with this project:

- I used `useState` where `useReducer` may have been better.

- Some states were updated via improper uses of side effects (using `useEffect`).

- I didn't encapsulate board-related states and code into a custom hook.

- If-then statements were used where ternary operators (`_ ? _ : _`) may have been better.

- Some views could have been broken down into simpler components.

- Form submission, and managing state attached to those inputs, was messy.

- There are no tests at all.

- The styling via CSS isn't great.

There are probably more flaws beyond this list.
