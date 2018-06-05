import TechnologyModel from './technology.js';

export default class LevelList {
	constructor(levels, technology) {
		if (!Array.isArray(levels)) {
			throw new Error(`Levels "${levels}" is not an Array`);
		}
		if (!(technology instanceof TechnologyModel)) {
			throw new Error(`Technology "${technology}" is not a TechnologyModel`);
		}

		this.levels = levels;
		this.technology = technology;
	}
}
