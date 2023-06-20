
import readline from 'node:readline';
import { homedir } from 'node:os';
import { chdir  } from 'node:process';
import { welcom, goodbye, currently } from './util.js';
import {list } from './view.js';

const init = async () => {
  welcom();
  currently();
	const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Enter command, please \n> '
  });
  rl.prompt();

	rl.on('line', (input) => {
    switch(input) {
      case '.exit':
        rl.emit("SIGINT");
        break;
      case 'up':
        chdir('../');
        currently();
        break;
      case 'ls':
        list();
        break;
      default: console.log('Invalid input');
    }

	});
  rl.on("SIGINT", () => {
    goodbye();
  });
}

await init();