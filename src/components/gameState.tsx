import { useCallback, useEffect, useState } from 'react';
import { Button } from './ui/button';

// symbols can be any alphanumeric character
const SYMBOLS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');

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

const GameState = () => {
	const [gridSize, setGridSize] = useState(5);
	const [timeRemaining, setTimeRemaining] = useState(0);
	const [score, setScore] = useState(0);
	const [round, setRound] = useState(1);
	const [gameStarted, setGameStarted] = useState(false);
	const [gamePaused, setGamePaused] = useState(false);
	const [gameEnded, setGameEnded] = useState(false);

	const generateGrid = (size: number) => {
		// pick the random odd one out and another for the common one from symbols, but they must be different
		// the odd one out is the one that will be unique
		const oddOneOut = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
		let commonOne = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

		while (oddOneOut === commonOne) {
			commonOne = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
		}

		const grid: Array<Array<string>> = [];
		// generate the grid with the odd one out placed randomly, and the rest of the tiles are filled with the common one
		// the odd one out can only be placed once
		const oddOneOutIndex = Math.floor(Math.random() * size * size);

		console.log(`generate size: ${size}x${size}`);

		for (let i = 0; i < size; i++) {
			grid.push([]);
			for (let j = 0; j < size; j++) {
				if (i * size + j === oddOneOutIndex) {
					grid[i].push(oddOneOut);
				} else {
					grid[i].push(commonOne);
				}
			}
		}

		console.log(`grid size: ${grid.length}x${grid[0].length}`);

		return grid;
	};

	const [grid, setGrid] = useState(generateGrid(gridSize));

	const endGame = useCallback(() => {
		setGameStarted(false);
		setGameEnded(true);
	}, []);

	useEffect(() => {
		if (gameStarted && timeRemaining > 0 && !gamePaused) {
			// const timer = setInterval(() => {
			// 	setTimeRemaining((prevTime) => prevTime - 0.1);
			// }, 100);
			// return () => clearInterval(timer);
		}
	}, [gameStarted, timeRemaining, gamePaused]);

	useEffect(() => {
		if (gameStarted && timeRemaining <= 0 && !gamePaused) {
			endGame();
		}
	}, [gameStarted, timeRemaining, endGame, gamePaused]);

	const handleContinueClick = () => {
		setRound(round + 1);
		setGamePaused(false);
	};

	const handleTileClick = (symbol: string) => {
		if (symbol === getOddOneOut()) {
			let newGridSize = gridSize;
			const newScore = score + 1;
			setScore(newScore);
			if (newScore % 5 === 0 && newScore >= 5) {
				if (gridSize < 10) {
					newGridSize = gridSize + 1;
				}
				// set the time remaining to prev - 0.1, unless its less than 0.6 already
				setTimeRemaining((prevTime) => (prevTime - 0.1 < 0.6 ? 0.5 : prevTime - 0.1));
			}
			setGridSize(newGridSize);
			setGrid(generateGrid(newGridSize));
			setRound(round + 1);
			setGamePaused(true);
		} else {
			endGame();
		}
	};

	const getOddOneOut = () => {
		const symbols = grid.flat();
		const counts = symbols.reduce((acc: { [key: string]: number }, symbol) => {
			acc[symbol] = (acc[symbol] || 0) + 1;
			return acc;
		}, {});
		const oddOneOut = Object.keys(counts).find((symbol) => counts[symbol] === 1);
		return oddOneOut;
	};

	const handleStartClick = () => {
		setGameStarted(true);
		setGamePaused(false);
		setGameEnded(false);
		setTimeRemaining(5);
		setScore(0);
		setRound(1);
		setGridSize(5);
		setGrid(generateGrid(5));
	};

	return (
		<div className='layout flex min-h-screen flex-col items-center justify-center text-primary-foreground'>
			{!gameStarted && !gameEnded && (
				<Button onClick={() => handleStartClick()} className='mt-4'>
					Start Game
				</Button>
			)}
			{gameStarted && (
				<>
					{!gamePaused && (
						<>
							<div className='mb-4 flex w-full justify-center'>
								<div>Time remaining: {timeRemaining.toFixed(1)}</div>
							</div>
							<div className={`grid ${`grid-cols-${gridSize}`}  gap-4`}>
								{grid.flat().map((symbol, index) => (
									<Button
										className='max-h-[40px] min-h-[40px] min-w-[40px] max-w-[40px]'
										key={index}
										onClick={() => handleTileClick(symbol)}
									>
										{symbol}
									</Button>
								))}
							</div>
						</>
					)}
					<div className='mt-4 flex w-full flex-col items-center justify-center text-lg'>
						<p>Score: {score}</p>
						<p>
							Grid Size: {gridSize - 1}x{gridSize - 1}
						</p>
					</div>

					{gamePaused && (
						<div className=' flex w-full flex-col items-center justify-center text-lg'>
							<p>Current Max Time: {timeRemaining}</p>
							<Button onClick={handleContinueClick} className='mt-4'>
								Continue {score % 5 === 0 ? `(Grid Size +1)` : ''}
							</Button>
						</div>
					)}
				</>
			)}
			{gameEnded && (
				<div className='flex flex-col'>
					<h1 className='text-center text-3xl'>Game over!</h1>
					<Button onClick={() => handleStartClick()} className='mt-4'>
						Restart
					</Button>
					<div className='mt-2'>
						<p>Stats:</p>
						<p>Score: {score}</p>
						<p>Round: {round}</p>
						<p>
							Grid Size: {gridSize}x{gridSize}
						</p>
						<p>Time Remaining: {timeRemaining}</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default GameState;
