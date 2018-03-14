import { getBasename } from '../parsers/path.js';

export default class Version {
	constructor(id, path) {
		this.id = id;
		this.path = path;
	}

	static fromPath(path) {
		const id = getBasename(path, '.json');

		return new Version(id, path);
	}
}
