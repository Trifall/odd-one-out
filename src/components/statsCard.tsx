type StatsProps = {
	score: number;
	timeRemaining: number;
	gridSize: number;
};

const StatsCard = ({ score, timeRemaining, gridSize }: StatsProps) => {
	return (
		<div className='mt-2'>
			<span className='text-lg font-bold'>Stats:</span>
			<p>Score: {score}</p>
			<p>
				Grid Size: {gridSize}x{gridSize}
			</p>
			<p>Time Remaining: {timeRemaining <= 0 ? 0 : timeRemaining.toFixed(1)}</p>
		</div>
	);
};

export default StatsCard;
