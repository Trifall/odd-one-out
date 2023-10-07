import moment from 'moment-timezone';
import { formatDate } from '../lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

export type ScoreboardEntry = {
	score: number;
	date: Date;
	lostBy: string;
};

const Scoreboard = () => {
	let scores: ScoreboardEntry[] = [];
	try {
		const scoreboardData = localStorage.getItem('scoreboard');
		if (!scoreboardData) {
			console.log(`scoreboard empty, creating new scoreboard`);
			localStorage.setItem('scoreboard', JSON.stringify([]));
		} else {
			scores = JSON.parse(scoreboardData).sort((a: ScoreboardEntry, b: ScoreboardEntry) => b.score - a.score);
		}
	} catch (e) {
		console.log(`error parsing scoreboard data: ${e}`);
	}

	return (
		<>
			<Table className='max-h-[40%}'>
				<TableHeader>
					<TableRow>
						<TableHead>Score</TableHead>
						<TableHead>Date</TableHead>
						<TableHead>Lost by</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{scores?.length === 0 && (
						<TableRow>
							<TableCell colSpan={3} className='text-center'>
								No entries yet.
							</TableCell>
						</TableRow>
					)}
					{scores?.map((entry, index) => (
						<TableRow key={index}>
							<TableCell>{entry.score}</TableCell>
							<TableCell>
								{formatDate(entry.date)} - {moment(entry.date).format('h:mmA')}
							</TableCell>
							<TableCell>{entry.lostBy}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<span className='mt-4 text-center text-sm text-muted-foreground'>
				Sorted by score, descending.
				<br />* Dates are MM/DD/YYYY - h:mmA
			</span>
		</>
	);
};

export default Scoreboard;
