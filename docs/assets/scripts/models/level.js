export default class Level {
	constructor(key, name, index) {
		if (typeof key !== 'string') {
			throw new Error(`Key "${key}" should be a string`);
		}
		if (typeof name !== 'string') {
			throw new Error(`Name "${name}" should be a string`);
		}
		if (typeof index !== 'number') {
			throw new Error(`Index "${index}" should be a number`);
		}

		this.key = key;
		this.name = name;
		this.index = index;
	}

	static fromObject(obj, index) {
		return new Level(obj.key, obj.name, index);
	}
}
