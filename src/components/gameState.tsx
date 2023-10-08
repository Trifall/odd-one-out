import { useCallback, useEffect, useState } from 'react';
import { generateGrid } from '../lib/grid';
import { saveScoreToStorage } from '../lib/storage';
import { GameState } from '../types/types';
import ActiveGameView from './screens/activeGameView';
import EndGameView from './screens/endGameView';
import ScoreboardView from './screens/scoreboardView';
import StartGameView from './screens/startGameView';

const GameState = () => {
	const [gridSize, setGridSize] = useState(5);
	const [timeRemaining, setTimeRemaining] = useState(0);
	const [score, setScore] = useState(0);
	const [gameState, setGameState] = useState<GameState>('INACTIVE');
	const [showScoreboard, setShowScoreboard] = useState(false);
	const [grid, setGrid] = useState(generateGrid(5));

	const endGame = useCallback(() => {
		setGameState('ENDED');
		saveScoreToStorage(score, timeRemaining);
	}, [score, timeRemaining]);

	// timer
	useEffect(() => {
		if (gameState === 'STARTED') {
			if (timeRemaining > 0) {
				const timer = setInterval(() => {
					setTimeRemaining((prevTime) => prevTime - 0.1);
				}, 100);
				return () => clearInterval(timer);
			} else {
				endGame();
			}
		}
	}, [gameState, timeRemaining, endGame]);

	const handleContinueClick = () => {
		setGameState('STARTED');
	};

	const handleBackClick = (state?: GameState) => {
		if (state) {
			setGameState(state);
		}
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

	const handleShowScoreboardClick = () => {
		setShowScoreboard(true);
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
				<StartGameView handleStartClick={handleStartClick} handleShowScoreboardClick={handleShowScoreboardClick} />
			)}
			{!showScoreboard && (gameState === 'STARTED' || gameState === 'PAUSED') && (
				<ActiveGameView
					gameState={gameState}
					timeRemaining={timeRemaining}
					gridSize={gridSize}
					score={score}
					grid={grid}
					handleTileClick={handleTileClick}
					handleContinueClick={handleContinueClick}
				/>
			)}
			{!showScoreboard && gameState === 'ENDED' && (
				<EndGameView
					handleStartClick={handleStartClick}
					handleBackClick={handleBackClick}
					handleShowScoreboardClick={handleShowScoreboardClick}
					gridSize={gridSize}
					score={score}
					timeRemaining={timeRemaining}
				/>
			)}
			{showScoreboard && <ScoreboardView handleBackClick={handleBackClick} />}
		</div>
	);
};

export default GameState;
