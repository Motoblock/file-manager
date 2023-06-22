import * as fs from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { cwd } from 'process';
import { resolve, basename } from 'node:path';
import { getAbsolutePath, currentlyPath, validNameFile, isExistFile,isExistDir } from './util.js';

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
		try {
			await fs.rename(arrayFileName[0], arrayFileName[1] );
		} catch (error) {
			console.error("Operation failed");
		}
	} else console.error("Invalid input");
	currentlyPath();
};

export const copy = async (arrayFileName) => {
	if (arrayFileName[0] && arrayFileName[1]) {
		const pathToFile = getAbsolutePath(arrayFileName[0]);
    const pathToNewDirectory = getAbsolutePath(arrayFileName[1]);

		const isValid = await isExistFile(pathToFile);
		const isCopyToValid = await isExistDir(pathToNewDirectory);

		if (isValid && isCopyToValid) {
			try {
					const filenameCopyFile = basename(pathToFile);
					const newCopyPath = resolve(pathToNewDirectory, filenameCopyFile);
					const readStream = createReadStream(pathToFile);
					const writeStream = createWriteStream(newCopyPath);

					readStream.pipe(writeStream);

					console.log('Сopying files was successful!');
			} catch(error) {
				console.error("Operation failed");
			}
		} else console.error("Invalid input");
	} else console.error("Invalid input");
	currentlyPath();
};