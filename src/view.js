import * as fs from 'node:fs/promises';
import { cwd } from 'node:process';

export const list = async () => {
    const currentDir = cwd();
	try {
		const files = await fs.readdir(currentDir, { withFileTypes: true });
		const resTree = [];
		files.forEach((el) => {
			resTree.push({Name: el.name, Type: el.isDirectory() ? 'directory': 'file'})
		})

		const sortable = resTree.sort((a, b) =>
			((b.Type < a.Type) - (a.Type < b.Type) || (b.Name < a.Name) - (a.Name < b.Name))
		);

		console.table(sortable);
	} catch(err) {
		console.error(new Error("Operation failed"));
	}
};
