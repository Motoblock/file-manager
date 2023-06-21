import { chdir  } from 'node:process';
import { currentlyPath } from './util.js';

export const nwd = (argv) => {
	if (argv.length === 0) { console.log('Invalid input'); return; }

	try {
		chdir(argv[0].trim());
		currentlyPath();
	} catch {
		console.log('Invalid input');
	}
}