export default class Level {
	constructor(key, name) {
		this.key = key;
		this.name = name;
	}

	static fromObject(obj) {
		return new Level(obj.key, obj.name);
	}
}
