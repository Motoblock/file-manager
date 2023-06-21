import { cwd } from 'process';
import { homedir } from 'node:os';
import { dirname } from 'node:path';
import { isAbsolute, resolve } from 'node:path';

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

export function currentlyPath() {
	console.log(`\nYou are currently in ${cwd()}`);
}

export const getAbsolutePath = (path) => {
//   const rootDir = dirname(path);
// 	console.log('rootDir', rootDir);

//   if (path === rootDir) return homedir();

  const isAbsolutePath = isAbsolute(path);
  const currentDir = cwd();
	console.log('path', path);
  return isAbsolutePath ? path : resolve(currentDir, path);
};