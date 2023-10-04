import { useCallback, useEffect, useState } from 'react';
import { Button } from './ui/button';

// symbols can be any alphanumeric character
const SYMBOLS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');

const GameState = () => {
	const [gridSize, setGridSize] = useState(5);
	const [timeRemaining, setTimeRemaining] = useState(0);
	const [score, setScore] = useState(0);
	const [round, setRound] = useState(1);
	const [gameStarted, setGameStarted] = useState(false);

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
		alert(`Game over! Your score is ${score}.`);

		setGrid(generateGrid(5));
		setScore(0);
		setRound(1);
		setTimeRemaining(0);
		setGameStarted(false);
	}, [score]);

	useEffect(() => {
		if (gameStarted && timeRemaining > 0) {
			// const timer = setInterval(() => {
			// 	setTimeRemaining((prevTime) => prevTime - 0.1);
			// }, 100);
			// return () => clearInterval(timer);
		}
	}, [gameStarted, timeRemaining]);

	useEffect(() => {
		if (gameStarted && timeRemaining <= 0) {
			endGame();
		}
	}, [gameStarted, timeRemaining, endGame]);

	const handleTileClick = (symbol: string) => {
		if (symbol === getOddOneOut()) {
			let newGridSize = gridSize;
			setScore(score + 1);
			if (score % 5 === 0) {
				if (gridSize < 10) {
					newGridSize = gridSize + 1;
				}
				setTimeRemaining(100 - (round - 1) * 0.1);
			}
			setGridSize(newGridSize);
			setGrid(generateGrid(newGridSize));
			setRound(round + 1);
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
		setTimeRemaining(5);
		setScore(0);
		setRound(1);
		setGridSize(5);
		setGrid(generateGrid(5));
	};

	return (
		<div className='layout flex min-h-screen flex-col items-center justify-center text-primary-foreground'>
			{!gameStarted && (
				<Button onClick={() => handleStartClick()} className='mt-4'>
					Start Game
				</Button>
			)}
			{gameStarted && (
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
					<div className='mt-4 flex w-full justify-center'>
						<div>Score: {score}</div>
					</div>
					{timeRemaining <= 0 && (
						<Button onClick={() => endGame()} className='mt-4'>
							Restart
						</Button>
					)}
					{timeRemaining > 0 && score > 0 && score % 5 === 0 && (
						<Button onClick={() => setRound(round + 1)} className='mt-4'>
							Continue
						</Button>
					)}
				</>
			)}
		</div>
	);
};

export default GameState;
