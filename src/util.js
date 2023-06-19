import { cwd } from 'process';

const argv = process.argv;
let variable;

export function welcom() {
	argv.forEach((val) => {
	if (val.startsWith('--')) {
			variable = val.replace('--username=', '');
			console.log(`Welcome to the File Manager, ${variable}!`);
		}
	});
};

export function goodbye() {
	console.log(`Thank you for using File Manager, ${variable}, goodbye!`);
};

export function currently() {
	console.log(`\nYou are currently in ${cwd()}`);
}