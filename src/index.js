
import readline from 'node:readline';
// import { chdir  } from 'node:process';

import { welcom, goodbye, currentDir } from './util.js';
import { list } from './view.js';
import { nwd } from './nwd.js';
import { read, create, rename, copy, del } from './files.js';
import { os } from './os.js';
import { hashFile } from './hash.js';
import { compressFile, decompressFile } from './zip.js';
// chdir(homedir());

welcom();

const init = async () => {
	const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.setPrompt('\nYou are currently in ' + process.cwd() + '\n> ');
  rl.prompt();

	rl.on('line', async (input) => {
    let [command, ...arg] = input.toString().trim().split(' ');

    switch(command.trim()) {
      case '.exit':
        rl.emit("SIGINT");
        break;
      case 'up':
        process.chdir('..');
        currentDir();
        break;
      case 'cd':
        nwd(arg);
        // currentDir();
        break;
      case 'ls':
        list();
        break;
      case 'cat':
        await read(arg);
        break;
      case 'add':
        await create(arg);
        break;
      case 'rn':
        await rename(arg);
        break;
      case 'cp':
        await copy(arg);
        break;
      case 'mv':
        await copy(arg);
        await del(arg[0]);
        break;
      case 'rm':
        await del(arg[0]);
        break;
      case 'os':
        console.log(os(arg[0]));
        currentDir();
        break;
      case 'hash':
        await hashFile(arg[0], arg[1]);
        break;
      case 'compress':
        if (arg.length === 2)
          await compressFile(arg[0], arg[1]);
        else { console.log('Invalid input');   currentDir(); }
        break;
      case 'decompress':
        if (arg.length === 2)
          await decompressFile(arg[0], arg[1]);
        else { console.log('Invalid input');  currentDir(); }
        break;
      default: {
        console.log('Invalid input');
        currentDir();
      }
    }
	});
  rl.on("SIGINT", () => {
    goodbye();
  });
}

await init();