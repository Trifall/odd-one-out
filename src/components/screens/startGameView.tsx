import { Button } from '../ui/button';

const StartGameView = ({
	handleStartClick,
	handleShowScoreboardClick,
}: {
	handleStartClick: () => void;
	handleShowScoreboardClick: () => void;
}) => (
	<div className='flex flex-col items-center justify-center'>
		<Button onClick={handleStartClick} className='mt-4 h-64 w-64 text-4xl'>
			Start Game
		</Button>
		<Button onClick={handleShowScoreboardClick} className='text-600 mt-4 h-12 w-32 bg-teal-500'>
			Scoreboard
		</Button>
	</div>
);

export default StartGameView;
