# Odd One Out Game

## Overview

Simple game which displays a grid of symbols/characters and the user has to select the odd one out.

### Rules

- Board starts as a 5x5 grid with 1 random tile being the odd-one-out.
- You have until the time runs out to click on the tile with the unique symbol.
- Every round the starting time (10 seconds) decreases by 0.1 seconds, until it reaches 0.5 seconds.
- Every 5 rounds, the grid size increases by 1 (Max: 10x10)
- Game ends when the time runs out or an incorrect tile is selected. Score is rounds completed.

## TODOS

- [ ] Add game rules / description
  - [ ] dropdown collapsible component (?)
- [ ] Add local storage
- [ ] Add scoreboard
- [ ] Refactor to modularized components
  - [ ] Stats card
  - [ ] PausedScreen
  - [ ] GameOverScreen
  - [ ] GameScreen ?
- [ ] Could change gamestate to one state object instead of multiple useState hooks
- [ ] Mobile friendly
- [ ] Make sure default values are correct
