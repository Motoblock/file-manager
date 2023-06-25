
import readline from 'node:readline';
import { chdir  } from 'node:process';

import { welcom, goodbye, currentlyPath } from './util.js';
import { list } from './view.js';
import { nwd } from './nwd.js';
import { read, create, rename, copy, del } from './files.js';
import { os } from './os.js';

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
    let [command, ...arg] = input.split(' ');
    console.log(arg);

    switch(command) {
      case '.exit':
        rl.emit("SIGINT");
        break;
      case 'up':
        chdir('../');
        currentlyPath();
        break;
      case 'cd':
        nwd(arg);
        break;
      case 'ls':
        list();
        break;
      case 'cat':
        read(arg);
        break;
      case 'add':
        create(arg);
        break;
      case 'rn':
        rename(arg);
        break;
      case 'cp':
        copy(arg);
        break;
      case 'mv':
        copy(arg);
        del(arg[0]);
        break;
      case 'rm':
        await del(arg[0]);
        break;
      case 'os':
        console.log(os(arg[0]));
        break;
      default: console.log('Invalid input');
    }
	});
  rl.on("SIGINT", () => {
    goodbye();
  });
}

await init();