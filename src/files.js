import * as fs from 'node:fs/promises';
// import { fileURLToPath } from 'url';
import { getAbsolutePath } from './util.js';

export const read = async (name) => {
	console.log(name);
	getAbsolutePath(name)
//   if (name.length === 0) { console.log('Invalid input'); return; }
	// try {
	// 	const data = await fs.readFile(name, {encoding: 'utf-8'});
	// 	console.log(data);
	// } catch(err) {
	// 	console.error(new Error("FS operation failed"));
	// }
};

await read();