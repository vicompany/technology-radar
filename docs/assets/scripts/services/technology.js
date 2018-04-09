export default {
	technologyRepository: null,

	dispose() {
		this.technologyRepository.dispose();

		return this;
	},

	async getLevels() {
		return this.technologyRepository.getLevels();
	},

	async getTechnology(version) {
		if (!version) {
			return [];
		}

		return (await this.technologyRepository.getTechnology(version))
			.reduce((technology, level) => technology.concat(level.items), []);
	},

	async getTechnologyByLevel(version) {
		return this.technologyRepository.getTechnology(version);
	},

	async getTechnologyDeltas(version, versionPrevious) {
		const levels = await this.getLevels();
		const technology = await this.getTechnology(version);
		const technologyPrevious = await this.getTechnology(versionPrevious);
		const deltas = new WeakMap();

		technology.forEach((a) => {
			const b = technologyPrevious.find(t => t.name === a.name);
			const delta = a.level.index - (b ? b.level.index : levels.length);

			deltas.set(a, delta);
		});

		return deltas;
	},

	async getVersions() {
		return this.technologyRepository.getVersions();
	},

	setTechnologyRepository(technologyRepository) {
		this.technologyRepository = technologyRepository;
	},

	findLevel(items, technology) {
		return items.find(t => t.id === technology.id);
	},
};
