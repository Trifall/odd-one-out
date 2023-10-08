import { ScoreboardEntry } from '../components/scoreboard';

export const saveScoreToStorage = (score: number, timeRemaining: number) => {
	// add the score to the scoreboard localstorage
	const scoreboardData = localStorage.getItem('scoreboard');
	if (scoreboardData) {
		// console.log(`adding new score: ${score}`);
		const scoreboard: ScoreboardEntry[] = JSON.parse(scoreboardData);
		scoreboard.push({
			score,
			date: new Date(),
			lostBy: timeRemaining <= 0 ? 'Time Expired' : 'Incorrect tile',
		} as ScoreboardEntry);
		localStorage.setItem('scoreboard', JSON.stringify(scoreboard));
		// console.log(`scoreboard data: ${JSON.stringify(scoreboard, null, 2)}`);
	} else {
		// create the scoreboard localstorage
		// console.log(`creating new scoreboard`);
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
};
