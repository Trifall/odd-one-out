import { GameState } from '../../types/types';
import Scoreboard from '../scoreboard';
import { Button } from '../ui/button';

const ScoreboardView = ({ handleBackClick }: { handleBackClick: (state?: GameState) => void }) => (
	<div className='flex flex-col'>
		<h1 className='text-center text-3xl'>Scoreboard</h1>
		<Scoreboard />
		<Button onClick={() => handleBackClick()} className='mt-4'>
			Back
		</Button>
	</div>
);

export default ScoreboardView;
