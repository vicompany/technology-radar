import $refs from './refs.js';

import VersionPicker from './components/version-picker.js';
import RadarListFactory from './factories/radar-list.js';
import TechnologyRepository from './repositories/technology.js';
import TechnologyService from './services/technology.js';

TechnologyService.setTechnologyRepository(TechnologyRepository);

const elementTechnologyList = $refs.get('technology-list');
const elementHistoricDataPicker = $refs.get('container-historic-data-picker');

const loadVersion = async (version, versionPrevious) => {
	TechnologyService.dispose();

	const technologyByLevel = await TechnologyService.getTechnologyByLevel(version);
	const technologyDeltas = await TechnologyService.getTechnologyDeltas(version, versionPrevious);

	elementTechnologyList.innerHTML = RadarListFactory.get(technologyByLevel, technologyDeltas);
};

(async () => {
	const versions = await TechnologyService.getVersions();
	const versionPicker = new VersionPicker(elementHistoricDataPicker, versions);
	const versionCurrent = versions[versions.length - 1];
	const versionPrevious = versions[versions.length - 2];

	versionPicker.on('change', version => loadVersion(version));
	versionPicker.setVersion(versionCurrent);
	loadVersion(versionCurrent, versionPrevious);
})();
