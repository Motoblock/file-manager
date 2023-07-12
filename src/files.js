import * as fs from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { cwd, stdout } from 'node:process';
import { resolve, basename } from 'node:path';

import { getAbsolutePath, validNameFile, isExistFile, isExistDir, currentDir } from './util.js';


export const read = async (filename) => {
	let path = '';
	let data = '';

	if (filename[0]) {
		path = getAbsolutePath(filename[0]);
		const isFile = await isExistFile(path);

		if (!isFile) {
			console.log('Invalid input');
			currentDir();
			return;
		}
		try {
			const dataStream = createReadStream(path, 'utf-8');
			dataStream.on('data', chunk => data += chunk );
			dataStream.on('end', () => {
				console.log(data);
				currentDir();
			});

		} catch(err) {
			console.error('Operation failed');
		}
	} else stdout.write('Invalid input\n> ');
};

export const create = async (filename) => {
	if (filename) {
		if (filename.length === 0) {
			console.error('Invalid input');
			currentDir();
			return;
		}
		const isValidFilename = validNameFile(filename.join(' '));

		if (!isValidFilename) {
			console.error('"/ | \\" and white spaces are not allowed in a filename. \nOperation failed');
		} else {
			try {
				const currentDir = cwd();
				await fs.appendFile(resolve(currentDir, filename[0]), "", { flag: "ax" });
			} catch (error) {
				console.error('Operation failed');
			}
		}
	}
	currentDir();
};

export const rename = async (arrayFileName) => {
	if (arrayFileName[0] && arrayFileName[1]) {
		const isfileBak = await isExistFile(arrayFileName[0]);
		const isfileNew = await isExistFile(arrayFileName[1]);

		if (!isfileBak || isfileNew)
			console.error("Operation failed");
		else {
			try {
				await fs.rename(arrayFileName[0], arrayFileName[1]);
			} catch (error) {
				console.error("Operation failed");
			}
		}
	} else console.error("Invalid input\n> ");

	currentDir();
};

export const copy = async (arrayFileName) => {
	if (arrayFileName[0] && arrayFileName[1]) {
		const pathToFile = getAbsolutePath(arrayFileName[0]);
    const pathToNewDirectory = getAbsolutePath(arrayFileName[1]);

		const isValid = await isExistFile(pathToFile);
		const isCopyToValid = await isExistDir(pathToNewDirectory);

		if (isValid && isCopyToValid) {
			try {
				const nameCopyFile = basename(pathToFile);
				const newCopyPath = resolve(pathToNewDirectory, nameCopyFile);
				const readStream = createReadStream(pathToFile);
				const writeStream = createWriteStream(newCopyPath);

				await pipeline(readStream, writeStream);

				console.log('Сopying files was successful!');
				return true;
			} catch(error) {
				console.log("Operation failed");
			}
		} else console.log("Invalid input\n> ");
	} else console.log("Invalid input\n> ");
	return false;
};

export const del = async (fileName) => {
	try {
		await fs.unlink(getAbsolutePath(fileName));
	}	catch(err) {
	  console.log("Operation failed");
	};
	currentDir();
};
