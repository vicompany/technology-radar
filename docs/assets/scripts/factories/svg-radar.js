import Vector2 from '../models/vector2.js';

// const TAU = Math.PI * 2;
const lerp = (a, b, t) => (t * (b - a)) + a;

export default {
	get(levels, technologyByLevel) {
		this.fontSize = 16;
		this.size = 512;

		const svgContents = this._getItemsSvg(levels, technologyByLevel);
		const svgLevels = this._getLevelsSvg(levels);
		const svgLevelLabels = this._getLevelLabelsSvg(levels);

		return this._getSvg(new Vector2(this.size, this.size), svgLevels + svgContents + svgLevelLabels);
	},

	_getItemsSvg(levels, technologyByLevel) {
		const technologyRadius = 4;

		return technologyByLevel.reduce((svg, level, levelIndex) => {
			const levelInnerRadius = this._getLevelRadius(levels, levelIndex - 1);
			const levelOuterRadius = this._getLevelRadius(levels, levelIndex);

			return svg + level.items.map((technology, technologyIndex) => {
				const radiusOffset = this._getTechnologyRadiusOffset(levelIndex, technologyIndex);
				const angle = lerp(0, Math.PI * 0.5, technologyIndex / level.items.length);
				const radius = lerp(levelInnerRadius, levelOuterRadius, radiusOffset);
				const position = Vector2.fromPolar(angle, radius);
				const strokeWidth = 0.5;

				return `<circle r="${technologyRadius * (1 + (0.5 * strokeWidth))}"
					cx="${position.x * 100}%"
					cy="${position.y * 100}%"
					stroke-width="${technologyRadius * strokeWidth}"
					class="radar__technology stroke stroke--level-${levelIndex + 1}"
					data-technology-id="${technology.id}"></circle>`;
			}).join('');
		}, '');
	},

	_getLevelLabelsSvg(levels) {
		return levels.reduce((svg, level, i) => {
			const levelInnerRadius = this._getLevelRadius(levels, i - 1);
			const levelOuterRadius = this._getLevelRadius(levels, i);
			const radius = lerp(levelInnerRadius, levelOuterRadius, 0.5);

			return `<text x="${radius * 100}%" y="${this.fontSize * -0.5}"
				class="radar__level-label">${level.name}</text>${svg}`;
		}, '');
	},

	_getLevelRadius(levels, n) {
		return (n + 1) / levels.length;
	},

	_getLevelsSvg(levels) {
		return levels.reduce((svg, level, i) => {
			const radius = this._getLevelRadius(levels, i);

			return `<path
				d="M -${radius} 0 A ${radius} ${radius} 0 0 0 ${radius} 0 Z"
				transform="scale(${this.size})"
				class="fill fill--level-${i + 1}"></path>${svg}`;
		}, '');
	},

	_getRequiredSurfaceArea(technologyCount) {
		const surfacePerTechnology = 32;

		return surfacePerTechnology * technologyCount;
	},

	_getSvg(size, contents) {
		const labelHeight = this.fontSize * 1.5;

		return `<svg xmlns="http://www.w3.org/2000/svg"
			class="radar"
			height="${size.y}" width="${size.x}"
			viewBox="0 ${-labelHeight} ${size.x} ${size.y + labelHeight}">${contents}</svg>`;
	},

	_getTechnologyRadiusOffset(nthLevel, nthTechnology) {
		const padding = 0.2;
		const levels = nthLevel === 0 ? 6 : 4;
		const t = (nthTechnology % levels) / levels;

		if (nthLevel === 0) {
			return lerp(0.5, 1 - padding, t);
		}

		return lerp(padding, 1 - padding, t);
	},
};
