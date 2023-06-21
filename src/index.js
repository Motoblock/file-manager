
import readline from 'node:readline';
// import { homedir } from 'node:os';
import { chdir  } from 'node:process';
import { welcom, goodbye, currentlyPath } from './util.js';
import { list } from './view.js';
import { nwd } from './nwd.js';
import { read } from './files.js';

const init = async () => {
  welcom();
  currentlyPath();
	const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Enter command, please \n> '
  });
  rl.prompt();

	rl.on('line', (input) => {
    let [command, ...argv] = input.split(' ');
    console.log(argv);

    switch(command) {
      case '.exit':
        rl.emit("SIGINT");
        break;
      case 'up':
        chdir('../');
        currentlyPath();
        break;
      case 'cd':
        nwd(argv);
        break;
      case 'ls':
        list();
        break;
      case 'cat':
        read(argv);
        break;
      default: console.log('Invalid input');
    }

	});
  rl.on("SIGINT", () => {
    goodbye();
  });
}

await init();