
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
        currentDir(rl);
        break;
      case 'cd':
        nwd(arg);
        currentDir(rl);
        break;
      case 'ls':
        list();
        break;
      case 'cat':
        await read(arg, rl);
        // currentDir(rl);
        break;
      case 'add':
        await create(arg, rl);
        break;
      case 'rn':
        await rename(arg, rl);
        break;
      case 'cp':
        await copy(arg, rl);
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
        currentDir(rl);
        break;
      case 'hash':
        await hashFile(arg[0], arg[1]);
        break;
      case 'compress':
        if (arg.length === 2)
          await compressFile(arg[0], arg[1]);
        else { console.log('Invalid input');   currentDir(rl); }
        break;
      case 'decompress':
        if (arg.length === 2)
          await decompressFile(arg[0], arg[1]);
        else { console.log('Invalid input');  currentDir(rl); }
        break;
      default: {
        console.log('Invalid input');
        currentDir(rl);
      }
    }
	});
  rl.on("SIGINT", () => {
    goodbye();
  });
}

await init();