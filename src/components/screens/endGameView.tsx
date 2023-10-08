import { GameState } from '../../types/types';
import StatsCard from '../statsCard';
import { Button } from '../ui/button';

const EndGameView = ({
	handleStartClick,
	handleBackClick,
	handleShowScoreboardClick,
	gridSize,
	score,
	timeRemaining,
}: {
	handleStartClick: () => void;
	handleBackClick: (state?: GameState) => void;
	handleShowScoreboardClick: () => void;
	gridSize: number;
	score: number;
	timeRemaining: number;
}) => (
	<div className='flex flex-col'>
		<h1 className='text-center text-3xl'>Game over!</h1>
		<div className='flex flex-col'>
			<Button onClick={handleStartClick} className='mt-4'>
				Restart
			</Button>
			<Button onClick={() => handleBackClick('INACTIVE')} className='mt-4'>
				Back
			</Button>
			<Button onClick={handleShowScoreboardClick} className='mt-4'>
				Scoreboard
			</Button>
		</div>
		<StatsCard gridSize={gridSize} score={score} timeRemaining={timeRemaining} />
	</div>
);

export default EndGameView;
