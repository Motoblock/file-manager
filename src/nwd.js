import { chdir  } from 'node:process';
import { currentDir } from './util.js';

export const nwd = (argv) => {
	if (argv.length === 0) { console.log('Invalid input'); return; }
console.log(argv[0].trim());
	try {
		chdir(argv[0].trim());
		currentDir();
	} catch {
		console.log('Invalid input');
	}
}