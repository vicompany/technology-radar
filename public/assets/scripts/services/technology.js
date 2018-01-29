export default {
	technologyRepository: null,

	setTechnologyRepository(technologyRepository) {
		this.technologyRepository = technologyRepository;
	},

	async getTechnology() {
		return (await this.technologyRepository.getTechnology())
			.reduce((technology, level) => technology.concat(level.items), []);
	},

	async getTechnologyByLevel() {
		return this.technologyRepository.getTechnology();
	},

	async getLevels() {
		return this.technologyRepository.getLevels();
	},
};
