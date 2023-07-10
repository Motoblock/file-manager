import { cwd } from 'process';
import { isAbsolute, resolve } from 'node:path';
import { access, stat } from 'node:fs/promises';

const argv = process.argv;
let variable;

export function welcom() {
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
		const p = await stat(path);
		console.log('p=',p);
      return p.isDirectory();
    } catch {
      return false;
    }
  };