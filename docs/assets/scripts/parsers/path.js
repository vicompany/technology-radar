const getBasename = (file, extension = '') => {
	if (typeof file !== 'string') {
		throw new Error(`File path "${file}" is not a String`);
	}
	if (typeof extension !== 'string') {
		throw new Error(`Extension "${extension}" is not a String`);
	}

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
