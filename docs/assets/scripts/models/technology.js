import LevelModel from './level.js';

export default class Technology {
	constructor(id, name, level = null) {
		if (!Number.isInteger(id)) {
			throw new Error(`ID "${id}" is not an Integer`);
		}
		if (typeof name !== 'string') {
			throw new Error(`Name "${name}" is not a String`);
		}
		if (!(level instanceof LevelModel)) {
			throw new Error(`Level "${level}" is not a LevelModel`);
		}

		this.id = id;
		this.name = name;
		this.level = level;
	}
}
