export default class EventEmitter {
	constructor(element) {
		this._eventHandlers = new Map();
	}

	on(event, handler) {
		if (typeof event !== 'string') {
			throw new Error(`Event "${event}" should be a string`);
		}

		if (typeof handler !== 'function') {
			throw new Error(`Handler "${handler}" should be a function`);
		}

		if (!this._eventHandlers.has(event)) {
			this._eventHandlers.set(event, []);
		}

		this._eventHandlers.get(event).push(handler);

		return this;
	}

	trigger(event, ...args) {
		if (typeof event !== 'string') {
			throw new Error(`Event "${event}" should be a string`);
		}

		if (!this._eventHandlers.has(event)) {
			return this;
		}

		this._eventHandlers.get(event)
			.forEach(handler => handler(...args));

		return this;
	}
}
