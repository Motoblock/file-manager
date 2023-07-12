import { cwd } from 'node:process';
import { isAbsolute, resolve } from 'node:path';
import { access, stat } from 'node:fs/promises';

let variable;

export function welcom() {
	const argv = process.argv;

	variable = 'Incognito';

	argv.forEach((val) => {
	if (val.startsWith('--')) {
			variable = val.replace('--username=', '');
		}
	});
	console.log(`Welcome to the File Manager, ${variable}!`);
};

export function goodbye() {
	console.log(`Thank you for using File Manager, ${variable}, goodbye!`);
	process.exit();
};

export function currentDir() {
	process.stdout.write(`\nYou are currently in ${process.cwd()}\n> `);
};

export const getAbsolutePath = (path) => {
  const isAbsolutePath = isAbsolute(path);
  const currentDir = cwd();
  return isAbsolutePath ? path : resolve(currentDir, path);
};

export const validNameFile = (nameFile) => !/[/|\||\\|\s]/.test(nameFile);

export const isExistFile = async (path) => {
	try {
	  await access(path);
	  return true;
	} catch (error) {
	  return false;
	}
};

export const isExistDir = async (path) => {
	try {
	const infoDir = await stat(path);
		return infoDir.isDirectory();
	} catch {
		return false;
	}
};