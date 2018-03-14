import IdFactory from '../factories/id.js';
import LevelModel from '../models/level.js';
import TechnologyModel from '../models/technology.js';
import VersionModel from '../models/version.js';

const URL = 'data/frontend.json';
const technologyIdFactory = new IdFactory();

const parseItems = (levels, items) => levels.reduce((itemList, level) => {
	const itemsParsed = items[level.key]
		.map(item => new TechnologyModel(technologyIdFactory.next(), item));

	return [...itemList, {
		level,
		items: itemsParsed,
	}];
}, []);

export default {
	async _getData(version) {
		if (!this._data) {
			const data = await (await fetch(version.path)).json();
			const levels = data.levels.map(LevelModel.fromObject);

			this._data = Object.assign({}, data, {
				levels,
				items: parseItems(levels, data.items),
			});
		}

		return this._data;
	},

	dispose() {
		this._data = null;
		this._versions = null;
		technologyIdFactory.reset();
	},

	async getLevels(version) {
		return (await this._getData(version)).levels;
	},

	async getTechnology(version) {
		return (await this._getData(version)).items;
	},

	async getVersions() {
		if (!this._versions) {
			this._versions = (await (await fetch(URL)).json())
				.map(VersionModel.fromPath);
		}

		return this._versions;
	}
};
