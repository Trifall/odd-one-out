import { useCallback, useEffect, useState } from 'react';
import Scoreboard, { ScoreboardEntry } from './scoreboard';
import { Button } from './ui/button';

// symbols can be any alphanumeric character
const SYMBOLS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');

const GAME_STATES = ['STARTED', 'PAUSED', 'ENDED', 'INACTIVE'] as const;

type GameState = (typeof GAME_STATES)[keyof typeof GAME_STATES];

const GameState = () => {
	const [gridSize, setGridSize] = useState(5);
	const [timeRemaining, setTimeRemaining] = useState(0);
	const [score, setScore] = useState(0);
	const [gameState, setGameState] = useState<GameState>('ENDED');
	const [showScoreboard, setShowScoreboard] = useState(false);

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
		setGameState('ENDED');
		// add the score to the scoreboard localstorage
		const scoreboardData = localStorage.getItem('scoreboard');
		if (scoreboardData) {
			console.log(`adding new score: ${score}`);
			const scoreboard: ScoreboardEntry[] = JSON.parse(scoreboardData);
			scoreboard.push({
				score,
				date: new Date(),
				lostBy: timeRemaining <= 0 ? 'Time Expired' : 'Incorrect tile',
			} as ScoreboardEntry);
			localStorage.setItem('scoreboard', JSON.stringify(scoreboard));
			console.log(`scoreboard data: ${JSON.stringify(scoreboard, null, 2)}`);
		} else {
			// create the scoreboard localstorage
			console.log(`creating new scoreboard`);
			localStorage.setItem(
				'scoreboard',
				JSON.stringify([
					{
						score,
						date: new Date(),
						lostBy: timeRemaining <= 0 ? 'Time Expired' : 'Incorrect tile',
					} as ScoreboardEntry,
				])
			);
		}
	}, [score, timeRemaining]);

	useEffect(() => {
		if (gameState === 'STARTED' && timeRemaining > 0) {
			const timer = setInterval(() => {
				setTimeRemaining((prevTime) => prevTime - 0.1);
			}, 100);
			return () => clearInterval(timer);
		}
	}, [gameState, timeRemaining]);

	useEffect(() => {
		if (gameState === 'STARTED' && timeRemaining <= 0) {
			endGame();
		}
	}, [gameState, timeRemaining, endGame]);

	const handleContinueClick = () => {
		setGameState('STARTED');
	};

	const handleBackClick = () => {
		setGameState('INACTIVE');
		setShowScoreboard(false);
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
			}
			const newTimeRemaining = 10 - newScore * 0.1;
			setTimeRemaining(newTimeRemaining < 0.6 ? 0.5 : newTimeRemaining);
			console.log(`newtime: ${newTimeRemaining}, score: ${newScore}`);
			// set the time remaining to 10 - (score * 0.1), unless its less than 0.6, then set it to 0.5
			setGridSize(newGridSize);
			setGrid(generateGrid(newGridSize));
			setGameState('PAUSED');
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
		setGameState('STARTED');
		setTimeRemaining(10);
		setScore(0);
		setGridSize(5);
		setGrid(generateGrid(5));
	};

	return (
		<div className='layout flex min-h-screen flex-col items-center justify-center text-primary-foreground'>
			{!showScoreboard && gameState === 'INACTIVE' && (
				<div className='flex flex-col items-center justify-center'>
					<Button onClick={() => handleStartClick()} className='mt-4 h-64 w-64 text-4xl'>
						Start Game
					</Button>
					<Button onClick={() => setShowScoreboard(true)} className='text-600 mt-4 h-12 w-32 bg-teal-500'>
						Scoreboard
					</Button>
				</div>
			)}
			{!showScoreboard && (gameState === 'STARTED' || gameState === 'PAUSED') && (
				<>
					{gameState !== 'PAUSED' && (
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
							Grid Size:{' '}
							{score % 5 === 0 && gameState === 'PAUSED'
								? `${gridSize - 1}x${gridSize - 1}`
								: `${gridSize}x${gridSize}`}
						</p>
					</div>

					{gameState === 'PAUSED' && (
						<div className=' flex w-full flex-col items-center justify-center text-lg'>
							<p>Current Max Time: {timeRemaining.toFixed(1)}</p>
							<Button onClick={handleContinueClick} className='mt-4'>
								Continue {score % 5 === 0 ? `(Grid Size +1)` : ''}
							</Button>
						</div>
					)}
				</>
			)}
			{!showScoreboard && gameState === 'ENDED' && (
				<div className='flex flex-col'>
					<h1 className='text-center text-3xl'>Game over!</h1>
					<div className='flex flex-col'>
						<Button onClick={() => handleStartClick()} className='mt-4'>
							Restart
						</Button>
						<Button onClick={() => handleBackClick()} className='mt-4'>
							Back
						</Button>
						<Button onClick={() => setShowScoreboard(true)} className='mt-4'>
							Scoreboard
						</Button>
					</div>
					<div className='mt-2'>
						<span className='text-lg font-bold'>Stats:</span>
						<p>Score: {score}</p>
						<p>
							Grid Size: {gridSize}x{gridSize}
						</p>
						<p>Time Remaining: {timeRemaining <= 0 ? 0 : timeRemaining.toFixed(1)}</p>
					</div>
				</div>
			)}
			{showScoreboard && (
				<div className='flex flex-col'>
					<h1 className='text-center text-3xl'>Scoreboard</h1>
					<Scoreboard />
					<Button onClick={() => setShowScoreboard(false)} className='mt-4'>
						Back
					</Button>
				</div>
			)}
		</div>
	);
};

export default GameState;
