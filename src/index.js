
import readline from 'node:readline';
import { chdir  } from 'node:process';

import { welcom, goodbye, currentlyPath } from './util.js';
import { list } from './view.js';
import { nwd } from './nwd.js';
import { read, create, rename, copy, del } from './files.js';

const init = async () => {
  welcom();
  currentlyPath();
	const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Enter command, please \n> '
  });
  rl.prompt();

	rl.on('line', async (input) => {
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
      case 'add':
        create(argv);
        break;
      case 'rn':
        rename(argv);
        break;
      case 'cp':
        copy(argv);
        break;
      case 'mv':
        copy(argv);
        del(argv[0]);
        break;
      case 'rm':
        await del(argv[0]);
        break;
      default: console.log('Invalid input');
    }
	});
  rl.on("SIGINT", () => {
    goodbye();
  });
}

await init();