import * as fs from 'node:fs/promises';
import { getAbsolutePath, currentlyPath } from './util.js';

export const read = async (name) => {
	console.log('name', name);
	let p = '';
	if (name) {
		p = getAbsolutePath(name[0]);
		console.log('p', p);
		if (name.length === 0) { console.log('Invalid input'); return; }
		try {
			const data = await fs.readFile(p, {encoding: 'utf-8'});
			console.log(data);
		} catch(err) {
			console.error(new Error("FS operation failed"));
		}
	}
	currentlyPath();
};

await read();