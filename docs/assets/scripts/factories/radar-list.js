const getListItemHtml = item => `<li value="${item.id}" data-technology-id="${item.id}">${item.name}</li>`;
const getListHtml = (list, listType = 'ol') => `<${listType}>${list.map(getListItemHtml).join('')}</${listType}>`;

export default {
	get(technologyByLevel) {
		return technologyByLevel.reduce((html, levelItem) => {
			const { level, items: technology } = levelItem;
			const listTechnology = getListHtml(technology);

			return `${html}
			<div>
				<h2>${level.name}</h2>
				${listTechnology}
			</div>`;
		}, '');
	}
};
