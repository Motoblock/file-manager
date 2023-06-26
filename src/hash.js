import * as fs from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { getAbsolutePath, isExistFile, currentlyPath } from './util.js';

export const hashFile = async (arrayFileName) => {
  const path = getAbsolutePath(arrayFileName);
  const isValid = await isExistFile(path);

  if (isValid)
    try {
      const data = await fs.readFile(path, 'utf-8');
      const hash = createHash("sha256").update(data).digest('hex');
      console.log(hash);
    } catch {
      console.error("Operation failed");
    }
  currentlyPath();
};
