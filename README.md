# Odd One Out Game

## Overview

Browser game which displays a grid of symbols/characters and the user has to select the odd-one-out before the time runs out.

Built using ShadCN, TailwindCSS, Vite, and React. Uses local storage APIs for all leaderboard entries.

### Rules

- Board starts as a 5x5 grid with 1 random tile being the odd-one-out.
- You have until the time runs out to click on the tile with the unique symbol.
- Every round the starting time (10 seconds) decreases by 0.1 seconds, until it reaches 0.5 seconds.
- Every 5 rounds, the grid size increases by 1 (Max: 10x10)
- Game ends when the time runs out or an incorrect tile is selected. Score is rounds completed.


### Installation


1. Install [Yarn version 3.6.3](https://yarnpkg.com/) if you haven't already
2. Clone this repo 
```
# https
https://github.com/Trifall/odd-one-out.git

# or ssh
git@github.com:Trifall/odd-one-out.git
```

3. Install dependencies
```
yarn install
```

4. Run development server
```
yarn dev
```



## TODOS

- [x] Add game rules / description
  - [x] dropdown collapsible component (?)
- [x] Add local storage
- [x] Add scoreboard
- [-] Refactor to modularized components
  - [x] Stats card
  - [x] Scoreboard Game View
  - [x] Start Game View
  - [x] Active Game View
  - [x] End Game View
- [x] Could change gamestate to one state object instead of multiple useState hooks
- [x] Mobile friendly
- [x] Make sure default values are correct
