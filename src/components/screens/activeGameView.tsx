import { GameState } from '../../types/types';
import { Button } from '../ui/button';

const ActiveGameView = ({
	gameState,
	timeRemaining,
	gridSize,
	score,
	grid,
	handleTileClick,
	handleContinueClick,
}: {
	gameState: GameState;
	timeRemaining: number;
	gridSize: number;
	score: number;
	grid: Array<Array<string>>;
	handleTileClick: (symbol: string) => void;
	handleContinueClick: () => void;
}) => (
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
				{score % 5 === 0 && gameState === 'PAUSED' ? `${gridSize - 1}x${gridSize - 1}` : `${gridSize}x${gridSize}`}
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
);

export default ActiveGameView;
