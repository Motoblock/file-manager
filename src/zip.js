
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { resolve, basename } from 'node:path';

import { getAbsolutePath, isExistFile, currentDir, validNameFile } from './util.js';

export const compressFile = async (source, destination) => {
  const pathSource = getAbsolutePath(source);
  const pathDestination = getAbsolutePath(destination);
  const isValidSource = await isExistFile(pathSource);
  const isValidFilename = validNameFile(source);

  if (isValidSource && isValidFilename) {
    try {
      const nameSourceFile = basename(pathSource);
			const newPath = resolve(pathDestination, `${nameSourceFile}.br`);
      const sourceI = createReadStream(nameSourceFile);
      const destinationI = createWriteStream(newPath);

      await pipeline(sourceI, createBrotliCompress(), destinationI);
      currentDir();
    } catch {
      console.error('Operation failed');
    }
  } else if (!isValidFilename)
      console.error('"/ | \\" and white spaces are not allowed in a filename. \nOperation failed');
  else console.error("Invalid input\n> ");
};

export const decompressFile = async (source, destination) => {
  const pathSource = getAbsolutePath(source);
  const pathDestination = getAbsolutePath(destination);
  const isValidSource = await isExistFile(pathSource);
  const isValidFilename = validNameFile(source);

  if (isValidSource && isValidFilename) {
    try {
      const nameSourceFile = basename(pathSource);
			const newPath = resolve(pathDestination, nameSourceFile.replace('.br', ''));

      const sourceI = createReadStream(nameSourceFile);
      const destinationI = createWriteStream(newPath);

      await pipeline(sourceI, createBrotliDecompress(), destinationI);
      currentDir();
    } catch {
      console.error('Operation failed');
    }
  } else if (!isValidFilename)
    console.error('"/ | \\" and white spaces are not allowed in a filename. \nOperation failed');
  else console.error("Invalid input\n> ");
};