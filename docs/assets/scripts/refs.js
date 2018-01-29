export default [...document.querySelectorAll('[data-ref]')].reduce((refs, element) => {
	refs.set(element.dataset.ref, element);

	return refs;
}, new Map());
