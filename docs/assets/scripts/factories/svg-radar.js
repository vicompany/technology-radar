import Vector2 from '../models/vector2.js';

const TAU = Math.PI * 2;
const lerp = (a, b, t) => (t * (b - a)) + a;

export default {
	get(levels, technologyByLevel) {
		const svgContents = this._getItems();
		const svgLevels = this._getLevels(levels);

		return this._getSvg(Vector2.fromScalar(512, 512), svgLevels + svgContents);
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
			class="fill fill--level-${i + 1}"></circle>
			${svg}`, '');
	},

	_getLevelRadius(levels, n) {
		return (n + 1) / levels.length;
	},

	_getItems(levels, technologyByLevel) {
		const technologyRadius = 4;

		return technologyByLevel.reduce((svg, level, levelIndex) => {
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
					cy="${position.y * 50} %"
					class="radar__technology"
					data-technology-id="${technology.id}"></circle>`;
			}).join('');
		}, '');
	},

	_getRequiredSurfaceArea(technologyCount) {
		const surfacePerTechnology = 32;

		return surfacePerTechnology * technologyCount;
	},

	_getSvg(size, contents) {
		const sizeHalf = size.clone().multiplyScalar(0.5);

		return `<svg xmlns="http://www.w3.org/2000/svg"
			class="radar"
			height="${size.y}" width="${size.x}"
			viewBox="${-sizeHalf.x} ${-sizeHalf.y} ${size.x} ${size.y}">${contents}</svg>`;
	},
};
