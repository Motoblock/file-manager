import * as fs from 'node:fs/promises';
import { cwd } from 'process';
import { resolve } from 'node:path';
import { getAbsolutePath, currentlyPath, validNameFile } from './util.js';

export const read = async (filename) => {
	let path = '';
	if (filename) {
		path = getAbsolutePath(filename[0]);
		if (filename.length === 0) { console.log('Invalid input'); return; }
		try {
			const data = await fs.readFile(path, {encoding: 'utf-8'});
			console.log(data);
		} catch(err) {
			console.error("Operation failed");
		}
	}
	currentlyPath();
};

export const create = async(filename) => {
	if (filename) {
		if (filename.length === 0) { console.error('Invalid input'); return; }
		const isValidFilename = validNameFile(filename.join(' '));

		const currentDir = cwd();

		if (!isValidFilename) {
			console.error('"/ | \\" and white spaces are not allowed in a filename. \nOperation failed');
		} else {
			try {
				await fs.appendFile(resolve(currentDir, filename[0]), "", { flag: "ax" });
			} catch (error) {
				console.error('Operation failed');
			}
		}
	}
	currentlyPath();
};

export const rename = async (arrayFileName) => {
	if (arrayFileName[0] && arrayFileName[1]) {
		
		// fs.access(arrayFileName[1],fs.constants.F_OK, (err) => {});
		let isAccess = true;
		// try {
		// 	console.log('0');
		// 	 await fs.access(arrayFileName[1]);
		// } catch (error) {
		// 	isAccess = false;
		// }
		if (!fs.access(arrayFileName[1])) 	console.error("Operation failed");
		else {
		try {
			console.log('0');
			// const isAccess = await fs.access(arrayFileName[1]);
			// console.log(isAccess);
			// if ( await fs.access(arrayFileName[1]))
				await fs.rename(arrayFileName[0], arrayFileName[1]);
		} catch (error) {
			console.error("Operation failed" + error);
		}
	}

		// 	console.log('00');
		// 	try {
		// 		console.log('1');
		// 		fs.rename(arrayFileName[0], arrayFileName[1]);
		// 	} catch(err) {
		// 		console.error("Operation failed");
		// 	};
		// });
	}
};