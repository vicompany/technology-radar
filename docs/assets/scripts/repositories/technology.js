import IdFactory from '../factories/id.js';
import LevelModel from '../models/level.js';
import TechnologyModel from '../models/technology.js';
import VersionModel from '../models/version.js';

const URL_VERSIONS = 'data/frontend.json';
const URL_LEVELS = 'data/levels.json';

const technologyIdFactory = new IdFactory();

const parseItems = (levels, items) => levels.reduce((itemList, level) => {
	const itemsParsed = items[level.key]
		.map(item => new TechnologyModel(technologyIdFactory.next(), item, level));

	return [...itemList, {
		level,
		items: itemsParsed,
	}];
}, []);

export default {
	async _getTechnology(version) {
		if (!this._technology.has(version)) {
			const technology = await (await fetch(version.path)).json();
			const levels = await this.getLevels();

			this._technology.set(version, Object.assign({}, technology, {
				levels,
				items: parseItems(levels, technology),
			}));
		}

		return this._technology.get(version);
	},

	dispose() {
		this._levels = null;
		this._technology = new Map();
		this._versions = null;

		technologyIdFactory.reset();
	},

	async getLevels() {
		if (!this._levels) {
			const levels = await (await fetch(URL_LEVELS)).json();

			this._levels = levels.map(LevelModel.fromObject);
		}

		return this._levels;
	},

	async getTechnology(version) {
		return (await this._getTechnology(version)).items;
	},

	async getVersions() {
		if (!this._versions) {
			this._versions = (await (await fetch(URL_VERSIONS)).json())
				.map(VersionModel.fromPath);
		}

		return this._versions;
	},
};
