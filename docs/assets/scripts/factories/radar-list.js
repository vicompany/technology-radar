import LevelModel from '../models/level.js';

const getListItemHtml = (item, delta = 0) => {
	const deltaClass = [
		delta < 0 ? 'delta delta--positive' : '',
		delta > 0 ? 'delta delta--negative' : '',
	];

	return `<li value="${item.id}" data-technology-id="${item.id}" class="${deltaClass.join(' ')}">${item.name}</li>`;
};

const getListHtml = (list, listType = 'ol', deltas = null) => {
	if (!(deltas instanceof Map) && !(deltas instanceof WeakMap)) {
		throw new Error(`Deltas "${deltas}" is not a Map or WeakMap`);
	}

	const listItems = list.map((item) => {
		const delta = deltas.get(item);

		return getListItemHtml(item, delta);
	});

	return `<${listType}>${listItems.join('')}</${listType}>`;
};

export default {
	get(technologyByLevel, technologyDeltas) {
		if (!Array.isArray(technologyByLevel)) {
			throw new Error(`TechnologyByLevel "${technologyByLevel}" is not an Array`);
		}
		if (!(technologyDeltas instanceof Map) && !(technologyDeltas instanceof WeakMap)) {
			throw new Error(`TechnologyDeltas "${technologyDeltas}" is not a Map or WeakMap`);
		}

		return technologyByLevel.reduce((html, levelItem) => {
			if (typeof levelItem !== 'object') {
				throw new Error(`TechnologyByLevel item "${levelItem}" is not an Object`);
			}
			if (!(levelItem.level instanceof LevelModel)) {
				throw new Error(`TechnologyByLevel item.level "${levelItem.level}" is not a LevelModel`);
			}
			if (!Array.isArray(levelItem.items)) {
				throw new Error(`TechnologyByLevel item.items "${levelItem.items}" is not an Array`);
			}

			const { level, items: technology } = levelItem;
			const listTechnology = getListHtml(technology, 'ol', technologyDeltas);

			return `${html}
			<div class="technology-list__level technology-list__level-${level.key}">
				<h2 class="technology-list__title">${level.name}</h2>
				${listTechnology}
			</div>`;
		}, '');
	},
};
