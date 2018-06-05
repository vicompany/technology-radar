import Base from './base.js';

export default class VersionPicker extends Base {
	constructor(element, versions) {
		super(element);

		this.elementSelect = VersionPicker.createDocumentFragment(versions);
		this.element.appendChild(this.elementSelect);

		this.elementSelect.addEventListener('change', (event) => {
			const version = versions.find(v => v.id === event.target.value);

			this.trigger('change', version);
		});
	}

	setVersion(version) {
		Array.from(this.elementSelect.children).forEach((option) => {
			option.selected = option.value === version.id;
		});
	}

	static createDocumentFragment(data) {
		const fragment = document.createRange().createContextualFragment(`<select>
			${data.map(snapshot => `<option value="${snapshot.id}">
				${snapshot.name}
			</option>`).join('')}
		</select>`);

		return fragment.firstElementChild;
	}
}
