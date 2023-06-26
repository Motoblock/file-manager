
import { createGzip, createGunzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { getAbsolutePath, isExistFile } from './util.js';

export const compressFile = async (source, destination) => {
  const pathSource = getAbsolutePath(source);
  const pathDestination = getAbsolutePath(destination);

  const isValidSource = await isExistFile(pathSource);
  if (isValidSource)
    try {
      const gzip = createGzip();
      const sourceI = createReadStream(pathSource);
      const destinationI = createWriteStream(pathDestination);

      await pipeline(sourceI, gzip, destinationI);
    } catch {
      console.error("Operation failed");
    }
};

export const decompressFile = async (source, destination) => {
  const pathSource = getAbsolutePath(source);
  const pathDestination = getAbsolutePath(destination);

  const isValidSource = await isExistFile(pathSource);
  if (isValidSource)
    try {
      const gzip = createGunzip();
      const sourceI = createReadStream(pathSource);
      const destinationI = createWriteStream(pathDestination);

      await pipeline(sourceI, gzip, destinationI);
    } catch {
      console.error("Operation failed");
    }
};