let previousId = 0;

export default class Technology {
	constructor(name) {
		this.id = ++previousId;
		this.name = name;
	}
}
