import Vector2 from '../models/vector2.js';

const lerp = (a, b, t) => (t * (b - a)) + a;

export default {
	get(levels, technologyByLevel) {
		const TAU = Math.PI * 2;

		const svgLevels = this._getLevels(levels);
		const technologyRadius = 4;

		const svgContents = technologyByLevel.reduce((svg, level, levelIndex) => {
			const levelInnerRadius = this._getLevelRadius(levels, levelIndex - 1);
			const levelOuterRadius = this._getLevelRadius(levels, levelIndex);
			const rotationOffset = levelIndex * TAU * 0.25;

			return svg + level.items.map((technology, technologyIndex) => {
				const radiusOffset = this._getTechnologyRadiusOffset(levelIndex, technologyIndex);
				const angle = ((technologyIndex / level.items.length) * TAU) + rotationOffset;
				const radius = lerp(levelInnerRadius, levelOuterRadius, radiusOffset);
				const position = Vector2.fromPolar(angle, radius);

				return `<circle r="${technologyRadius}"
					cx="${position.x * 50}%"
					cy="${position.y * 50}%"
					class="technology"
					data-technology-id="${technology.id}"></circle>`;
			}).join('');
		}, '');

		// const svgContents = technology.reduce((svg, item, i) => {
		// 	const levelIndex = levels.indexOf(item.level);
		// 	const levelInnerRadius = this._getLevelRadius(technologyByLevel, levelIndex - 1);
		// 	const levelOuterRadius = this._getLevelRadius(technologyByLevel, levelIndex);
		// 	const positionRadius = lerp(levelInnerRadius, levelOuterRadius, i % 2 === 0 ? 0.25 : 0.75);
		// 	const position = Vector2.fromPolar((i / technology.length) * TAU, positionRadius);

		// 	const circleTechnology = `<circle cx="${position.x * 50}%" cy="${position.y * 50}%"
		// 		r="${technologyRadius}">
		// 		<text>${item.name}</text>
		// 	</circle>`;

		// 	return `${svg} ${circleTechnology}`;
		// }, '');

		return this._getBase(Vector2.fromScalar(512, 512), svgLevels + svgContents);
	},

	_getTechnologyRadiusOffset(nthLevel, nthTechnology) {
		const spread = 0.2;
		const radius = nthLevel === 0
			? [0.5, 0.5 + spread]
			: [0.5 - spread, 0.5 + spread];

		return radius[nthTechnology % 2];
	},

	_getLevels(levels) {
		return levels.reduce((svg, level, i) => `<circle
			r="${this._getLevelRadius(levels, i) * 50}%"
			class="level level--${i + 1}"></circle>
			${svg}`, '');
	},

	_getLevelRadius(levels, n) {
		return (n + 1) / levels.length;
	},

	_getRequiredSurfaceArea(technologyCount) {
		const surfacePerTechnology = 32;

		return surfacePerTechnology * technologyCount;
	},

	_getBase(size, contents) {
		const sizeHalf = size.clone().multiplyScalar(0.5);

		return `<svg xmlns="http://www.w3.org/2000/svg"
			class="radar"
			height="${size.y}" width="${size.x}"
			viewBox="${-sizeHalf.x} ${-sizeHalf.y} ${size.x} ${size.y}">${contents}</svg>`;
	},
};
