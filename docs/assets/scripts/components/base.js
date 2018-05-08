import EventEmitter from '../utils/event-emitter.js';

export default class Base extends EventEmitter {
	constructor(element) {
		super();

		this.element = element;
	}
}
