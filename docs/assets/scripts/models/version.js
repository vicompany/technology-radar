import { getBasename } from '../parsers/path.js';

export default class Version {
	constructor(id, path) {
		this.id = id;
		this.path = path;
	}

	static fromPath(path) {
		if (typeof path !== 'string') {
			throw new Error(`Path "${path}" should be a string`);
		}

		const id = getBasename(path, '.json');

		if (id.length === 0) {
			throw new Error(`No id could be extrapolated from path "${path}"`);
		}

		return new Version(id, path);
	}
}
