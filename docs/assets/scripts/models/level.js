export default class Level {
	constructor(key, name, index) {
		if (typeof key !== 'string') {
			throw new Error(`Key "${key}" is not a String`);
		}
		if (typeof name !== 'string') {
			throw new Error(`Name "${name}" is not a String`);
		}
		if (!Number.isInteger(index)) {
			throw new Error(`Index "${index}" is not an Integer`);
		}

		this.key = key;
		this.name = name;
		this.index = index;
	}

	static fromObject(obj, index) {
		return new Level(obj.key, obj.name, index);
	}
}
