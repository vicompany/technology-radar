const getBasename = (file, extension = '') => {
	const start = file.lastIndexOf('/') + 1;

	if (extension) {
		const extensionIndex = file.lastIndexOf(extension);
		const hasExtension = extensionIndex === file.length - extension.length;

		if (hasExtension) {
			return file.substring(start, extensionIndex);
		}
	}

	return file.substr(start);
};

export {
	getBasename,
};
