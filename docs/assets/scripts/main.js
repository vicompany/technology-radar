import $refs from './refs.js';
import Tooltip from './components/tooltip.js';
import SvgRadarFactory from './factories/svg-radar.js';
import TechnologyRepository from './repositories/technology.js';
import TechnologyService from './services/technology.js';

TechnologyService.setTechnologyRepository(TechnologyRepository);

const elementRadar = $refs.get('radar');
const elementTechnologyList = $refs.get('technology-list');
const tooltip = new Tooltip($refs.get('technology-tooltip'));

const findTechnologyById = (technologyList, technologyId) => technologyList
	.find(technology => technology.id === technologyId);

const activateTechnology = (technology) => {
	const selector = `[data-technology-id="${technology.id}"]`;
	const radarItem = elementRadar.querySelector(selector);
	const listItem = elementTechnologyList.querySelector(selector);

	tooltip.setTarget(radarItem);
	tooltip.setText(technology.name);
	tooltip.show();

	radarItem.setAttribute('r', 10);
	listItem.classList.add('is-active');
};

const deactivateTechnology = (technology) => {
	const selector = `[data-technology-id="${technology.id}"]`;
	const radarItem = elementRadar.querySelector(selector);
	const listItem = elementTechnologyList.querySelector(selector);

	radarItem.setAttribute('r', 4);
	listItem.classList.remove('is-active');

	tooltip.hide();
};

const isTechnologyElement = element => 'technologyId' in element.dataset;

const getListItemHtml = item => `<li value="${item.id}" data-technology-id="${item.id}">${item.name}</li>`;
const getListHtml = (list, listType = 'ol') => `<${listType}>${list.map(getListItemHtml).join('')}</${listType}>`;

(async () => {
	const levels = await TechnologyService.getLevels();
	const technologyList = await TechnologyService.getTechnology();
	const technologyByLevel = await TechnologyService.getTechnologyByLevel();

	window.addEventListener('mouseover', (e) => {
		if (!isTechnologyElement(e.target)) {
			return;
		}

		const technologyId = Number.parseInt(e.target.dataset.technologyId, 10);

		activateTechnology(findTechnologyById(technologyList, technologyId));
	});

	window.addEventListener('mouseout', (e) => {
		if (!isTechnologyElement(e.target)) {
			return;
		}

		const technologyId = Number.parseInt(e.target.dataset.technologyId, 10);

		deactivateTechnology(findTechnologyById(technologyList, technologyId));
	});

	elementRadar.innerHTML = SvgRadarFactory.get(levels, technologyByLevel, technologyList);
	elementTechnologyList.innerHTML = technologyByLevel.reduce((html, levelItem) => {
		const { level, items: technology } = levelItem;
		const listTechnology = getListHtml(technology);

		return `${html}
		<div>
			<h2>${level.name}</h2>
			${listTechnology}
		</div>`;
	}, '');
})();
