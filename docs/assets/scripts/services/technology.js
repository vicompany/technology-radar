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
		return (await this.technologyRepository.getTechnology(version))
			.reduce((technology, level) => technology.concat(level.items), []);
	},

	async getTechnologyByLevel(version) {
		return this.technologyRepository.getTechnology(version);
	},

	async getTechnologyDeltas(version, versionPrevious) {
		const technology = await this.getTechnology(version);
		const technologyPrevious = await this.getTechnology(versionPrevious);
		const deltas = new WeakMap();

		technology.forEach((a) => {
			const b = technologyPrevious.find(t => t.name === a.name);

			if (!b) {
				return;
			}

			deltas.set(a, a.level.index - b.level.index);
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
