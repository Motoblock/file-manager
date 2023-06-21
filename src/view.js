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
			((b.Type.toLowerCase() < a.Type.toLowerCase()) - (a.Type.toLowerCase() < b.Type.toLowerCase()) ||
			(b.Name.toLowerCase() < a.Name.toLowerCase()) - (a.Name.toLowerCase() < b.Name.toLowerCase()))
		);

		console.table(sortable);
	} catch(err) {
		console.error(new Error("Operation failed"));
	}
};
