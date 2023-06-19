
import readline from 'node:readline';

import { welcom, goodbye, currently } from './util.js';

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
		// console.log(input);
    switch(input) {
      case '.exit':  rl.emit("SIGINT"); break;
      default: console.log('Invalid input');
    }

	});
  rl.on("SIGINT", function () {
    goodbye();
    process.exit();
  });
}

await init();