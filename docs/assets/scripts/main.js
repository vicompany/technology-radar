import $refs from './refs.js';
import RadarListFactory from './factories/radar-list.js';
import SvgRadarFactory from './factories/svg-radar.js';
import TechnologyRepository from './repositories/technology.js';
import TechnologyService from './services/technology.js';

TechnologyService.setTechnologyRepository(TechnologyRepository);

const elementRadar = $refs.get('radar');
const elementTechnologyList = $refs.get('technology-list');

(async () => {
	const levels = await TechnologyService.getLevels();
	const technologyList = await TechnologyService.getTechnology();
	const technologyByLevel = await TechnologyService.getTechnologyByLevel();

	elementRadar.innerHTML = SvgRadarFactory.get(levels, technologyByLevel, technologyList);
	elementTechnologyList.innerHTML = RadarListFactory.get(technologyByLevel);
})();
