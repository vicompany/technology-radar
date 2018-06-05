import EventEmitter from '../utils/event-emitter.js';

export default class Base extends EventEmitter {
	constructor(element) {
		super();

		if (!(element instanceof HTMLElement)) {
			throw new Error(`Element "${element}" is not a HTMLElement`);
		}

		this.element = element;
	}
}
