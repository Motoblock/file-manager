import { EOL, cpus, homedir, arch, userInfo } from 'node:os';

export const os = (arg) => {
  switch (arg) {
    case "--EOL":
      return JSON.stringify(EOL);
    case "--cpus":
      return {
        numberCores: cpus().length,
        cores: cpus().map((core) => ({model: core.model, speed: `${core.speed / 1000}GHz`}))
      };
    case "--homedir":
      return homedir();
    case "--username":
      return userInfo().username;
    case "--architecture":
      return arch();
    default:
      return 'Invalid input';
  }
};