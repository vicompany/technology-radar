export default {
	technologyRepository: null,

	dispose() {
		this.technologyRepository.dispose();

		return this;
	},

	async getLevels(version) {
		return this.technologyRepository.getLevels(version);
	},

	async getTechnology(version) {
		return (await this.technologyRepository.getTechnology(version))
			.reduce((technology, level) => technology.concat(level.items), []);
	},

	async getTechnologyByLevel(version) {
		return this.technologyRepository.getTechnology(version);
	},

	async getVersions() {
		return this.technologyRepository.getVersions();
	},

	setTechnologyRepository(technologyRepository) {
		this.technologyRepository = technologyRepository;
	},
};
