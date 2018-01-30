import $refs from './refs.js';
import Tooltip from './components/tooltip.js';
import RadarListFactory from './factories/radar-list.js';
import SvgRadarFactory from './factories/svg-radar.js';
import TechnologyRepository from './repositories/technology.js';
import TechnologyService from './services/technology.js';

import findTechnologyById from './utils/find-technology-by-id.js';
import getTechnologyId from './utils/get-technology-id.js';
import isTechnologyElement from './utils/is-technology-element.js';
import queryTechnologyElement from './utils/query-technology-element.js';

TechnologyService.setTechnologyRepository(TechnologyRepository);

const elementRadar = $refs.get('radar');
const elementTechnologyList = $refs.get('technology-list');
const tooltip = new Tooltip($refs.get('technology-tooltip'));
let previousSelectedTechnology = null;

const deactivateTechnology = (technology) => {
	const radarItem = queryTechnologyElement(elementRadar, technology.id);
	const listItem = queryTechnologyElement(elementTechnologyList, technology.id);

	tooltip.hide();

	radarItem.setAttribute('r', 4);
	listItem.classList.remove('is-active');
};

const activateTechnology = (technology) => {
	if (previousSelectedTechnology) {
		deactivateTechnology(previousSelectedTechnology);
	}

	const radarItem = queryTechnologyElement(elementRadar, technology.id);
	const listItem = queryTechnologyElement(elementTechnologyList, technology.id);

	tooltip.setTarget(radarItem);
	tooltip.setText(technology.name);
	tooltip.show();

	radarItem.setAttribute('r', 10);
	listItem.classList.add('is-active');

	previousSelectedTechnology = technology;
};

(async () => {
	const levels = await TechnologyService.getLevels();
	const technologyList = await TechnologyService.getTechnology();
	const technologyByLevel = await TechnologyService.getTechnologyByLevel();

	elementRadar.innerHTML = SvgRadarFactory.get(levels, technologyByLevel, technologyList);
	elementTechnologyList.innerHTML = RadarListFactory.get(technologyByLevel);

	window.addEventListener('mousemove', (e) => {
		const radarItemElements = elementRadar.querySelectorAll('[data-technology-id]');

		if (!e.target.closest('.radar') || radarItemElements.length === 0) {
			return;
		}

		if (previousSelectedTechnology) {
			deactivateTechnology(previousSelectedTechnology);
		}

		const elementRadarSvg = elementRadar.firstChild;
		const svgBox = elementRadarSvg.getBoundingClientRect();
		const svgScaleX = svgBox.width / elementRadarSvg.width.baseVal.value;
		const svgScaleY = svgBox.height / elementRadarSvg.height.baseVal.value;
		const mouseX = e.clientX - svgBox.left - (svgBox.width * 0.5);
		const mouseY = e.clientY - svgBox.top - (svgBox.height * 0.5);
		const closestItem = Array.from(radarItemElements)
			.map((el) => {
				const itemX = el.cx.baseVal.value * svgScaleX;
				const itemY = el.cy.baseVal.value * svgScaleY;
				const xd = itemX - mouseX;
				const yd = itemY - mouseY;

				return {
					element: el,
					distance: Math.sqrt((xd * xd) + (yd * yd)),
				};
			})
			.sort((a, b) => a.distance - b.distance)
			.shift();

		activateTechnology(findTechnologyById(technologyList, getTechnologyId(closestItem.element)));
	});

	window.addEventListener('mouseover', (e) => {
		if (!isTechnologyElement(e.target)) {
			return;
		}

		activateTechnology(findTechnologyById(technologyList, getTechnologyId(e.target)));
	});

	window.addEventListener('mouseout', (e) => {
		if (!isTechnologyElement(e.target)) {
			return;
		}

		deactivateTechnology(findTechnologyById(technologyList, getTechnologyId(e.target)));
	});
})();
