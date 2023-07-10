
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { getAbsolutePath, isExistFile } from './util.js';
import { resolve, basename } from 'node:path';

export const compressFile = async (source, destination) => {
  const pathSource = getAbsolutePath(source);
  const pathDestination = getAbsolutePath(destination);

  const isValidSource = await isExistFile(pathSource);
  if (isValidSource)
    try {
      const filenameSourceFile = basename(pathSource);
			const newPath = resolve(pathDestination, `${filenameSourceFile}.br`);
      const sourceI = createReadStream(filenameSourceFile);
      const destinationI = createWriteStream(newPath);

      await pipeline(sourceI, createBrotliCompress(), destinationI);
    } catch {
      console.error("Operation failed123");
    }
  // currentlyPath();
};

export const decompressFile = async (source, destination) => {
  const pathSource = getAbsolutePath(source);
  const pathDestination = getAbsolutePath(destination);

  const isValidSource = await isExistFile(pathSource);
  if (isValidSource)
    try {
      const filenameSourceFile = basename(pathSource);
			const newPath = resolve(pathDestination, filenameSourceFile.replace('.br', ''));

      const sourceI = createReadStream(filenameSourceFile);
      const destinationI = createWriteStream(newPath);

      await pipeline(sourceI, createBrotliDecompress(), destinationI);
    } catch {
      console.error("Operation failed");
    }
  // currentlyPath();
};