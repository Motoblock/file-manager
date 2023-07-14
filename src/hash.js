import * as fs from 'node:fs';
import { createHash } from 'node:crypto';
import { getAbsolutePath, isExistFile } from './util.js';

export const hashFile = async (arrayFileName) => {
  const path = getAbsolutePath(arrayFileName);
  const isValid = await isExistFile(path);

  if (isValid) {
    const hash = createHash('sha256');
    const input = fs.createReadStream(arrayFileName);
    input.on('readable', () => {
      const data = input.read();
      if (data)
        hash.update(data);
      else {
        console.log(`${hash.digest('hex')}`);
      }
    });
  }
  //   try {
  //     const data = await fs.readFile(path, 'utf-8');
  //     const hash = createHash('sha256').update(data).digest('hex');
  //     console.log(hash);
  //   } catch {
  //     console.error("Operation failed");
    // }
};
