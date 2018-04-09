/* eslint-disable implicit-arrow-linebreak */

const getListItemHtml = (item, delta = 0) => {
	const deltaClass = [
		delta < 0 ? 'delta delta--positive' : '',
		delta > 0 ? 'delta delta--negative' : '',
	];

	return `<li value="${item.id}" data-technology-id="${item.id}" class="${deltaClass.join(' ')}">${item.name}</li>`;
};

const getListHtml = (list, listType = 'ol', technologyDeltas = 0) => {
	const listItems = list.map((item) => {
		const delta = technologyDeltas.get(item);

		return getListItemHtml(item, typeof delta === 'number' ? delta : Infinity);
	});

	return `<${listType}>${listItems.join('')}</${listType}>`;
};

export default {
	get(technologyByLevel, technologyDeltas) {
		return technologyByLevel.reduce((html, levelItem) => {
			const { level, items: technology } = levelItem;
			const listTechnology = getListHtml(technology, 'ol', technologyDeltas);

			return `${html}
			<div>
				<h2 class="technology-list__title">${level.name}</h2>
				${listTechnology}
			</div>`;
		}, '');
	},
};
