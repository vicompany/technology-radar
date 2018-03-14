export default class Base {
	constructor(element) {
		this._eventHandlers = new Map();
		this.element = element;
	}

	on(event, handler) {
		if (!this._eventHandlers.has(event)) {
			this._eventHandlers.set(event, []);
		}

		this._eventHandlers.get(event).push(handler);

		return this;
	}

	trigger(event, ...args) {
		if (!this._eventHandlers.has(event)) {
			return this;
		}

		this._eventHandlers.get(event)
			.forEach(handler => handler(...args));

		return this;
	}
};
