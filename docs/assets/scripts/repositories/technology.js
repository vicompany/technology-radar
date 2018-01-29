import LevelModel from '../models/level.js';
import TechnologyModel from '../models/technology.js';

const URL = '/data/frontend.json';

const parseItems = (levels, items) => levels.reduce((itemList, level) => {
	const itemsParsed = items[level.key]
		.map(item => new TechnologyModel(item));

	return [...itemList, {
		level,
		items: itemsParsed,
	}];
}, []);

export default {
	async _getData() {
		if (!this._data) {
			const data = await (await fetch(URL)).json();
			const levels = data.levels.map(LevelModel.fromObject);

			this._data = Object.assign({}, data, {
				levels,
				items: parseItems(levels, data.items),
			});
		}

		return this._data;
	},

	async getLevels() {
		return (await this._getData()).levels;
	},

	async getTechnology() {
		return (await this._getData()).items;
	},
};
