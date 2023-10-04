import GameState from './gameState';

const GameBox = () => {
	return (
		<div className='flex flex-col items-center justify-center text-primary-foreground'>
			{/* <Button
				onClick={() => {
					console.log(`Button clicked!`);
				}}
			>
				Button
			</Button> */}
			<GameState />
		</div>
	);
};

export default GameBox;

// Game Overview:
/*
  - Board starts a 5x5 grid, with 1 random tile being the odd one out.
  - Each tile is a square with a random symbol in it, this is generated each round, and the odd one out is also generated each round.
  - The player has 1 life, and 5 seconds to find the odd one out.
  - If the player clicks the wrong tile, they lose the game, and the game ends, shows the player their score, and a button to restart the game.
    - The game is restarted when the player clicks the restart button.
  - If the player clicks the correct tile, the game continues, and the player's score increases by 1.
  - On each successful round, the grid size increases by 1, and the time to find the odd one out decreases by 0.1 seconds.
    - The timer starts at 5 seconds, and decreases by 0.1 seconds each round, and is shown to the player during the round
  - The game ends when the player loses.
  - The player's score is the amount of rounds they successfully completed.
  - Between each round, the player is shown their score, and a button to continue to the next round.
    - The game continues to the next round when the player clicks the continue button.
*/
