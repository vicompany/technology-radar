export default class Level {
	constructor(key, name, index) {
		this.key = key;
		this.name = name;
		this.index = index;
	}

	static fromObject(obj, index) {
		return new Level(obj.key, obj.name, index);
	}
}
