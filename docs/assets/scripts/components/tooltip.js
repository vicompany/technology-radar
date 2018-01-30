export default class Tooltip {
	constructor(element) {
		this.element = element;
	}

	hide() {
		this.element.hidden = true;
	}

	setTarget(element) {
		const boundingBox = element.getBoundingClientRect();
		const x = window.scrollX + boundingBox.left + (boundingBox.width * 0.5);
		const y = window.scrollY + boundingBox.top + (boundingBox.height * 0.5);

		this.element.style.left = `${x}px`;
		this.element.style.top = `${y}px`;
	}

	setText(text) {
		this.element.textContent = text;
	}

	show() {
		this.element.hidden = false;
	}
}
