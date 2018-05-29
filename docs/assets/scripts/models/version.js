import { getBasename } from '../parsers/path.js';

const formatter = new Intl.DateTimeFormat('en-GB', {
	year: 'numeric',
	month: 'long',
});

export default class Version {
	constructor(id, path) {
		this.id = id;
		this.name = Version.getNameFromId(id);
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

	static getNameFromId(id) {
		if (typeof id !== 'string') {
			throw new Error(`ID "${id}" should be a string`);
		}

		if (!id.match(/^\d{4}-\d{2}$/)) {
			throw new Error(`ID "${id}" should be be in the following format: "yyyy-mm"`);
		}

		const [year, month] = id.split('-').map(n => Number.parseInt(n, 10));

		if (month < 1 || month > 12) {
			throw new Error(`Month "${month} should be within the range 1-12"`);
		}

		return formatter.format(new Date(year, month - 1));
	}
}
