// symbols can be any alphanumeric character
const SYMBOLS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const generateGrid = (size: number, _score?: number) => {
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

	// console.log(`generate size: ${size}x${size}`);

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

	// console.log(`grid size: ${grid.length}x${grid[0].length}`);

	return grid;
};
