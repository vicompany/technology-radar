export default class IdFactory {
	constructor() {
		this.reset();
	}

	next() {
		return ++this.previousId;
	}

	reset() {
		this.previousId = 0;

		return this;
	}
}
