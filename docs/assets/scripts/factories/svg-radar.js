import Vector2 from '../models/vector2.js';
import TechnologyCircle from '../models/technology-circle.js';

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
		const technologyCircles = technologyByLevel.reduce((circles, level) => {
			const levelInnerRadius = this._getLevelRadius(levels, level.level.index - 1);
			const levelOuterRadius = this._getLevelRadius(levels, level.level.index);

			return circles.concat(level.items.map((technology) => {
				const angle = Math.random() * Math.PI * 0.5;
				const radius = lerp(levelInnerRadius, levelOuterRadius, lerp(0.25, 0.75, Math.random()));
				const tc = new TechnologyCircle(technology, level.level, 12);

				tc.position = Vector2.fromPolar(angle, radius);

				return tc;
			}));
		}, []);

		for (let i = 0; i < 1364; i++) {
			technologyCircles.forEach((tc) => {
				const levelInnerRadius = this._getLevelRadius(levels, tc.level.index - 1);
				const levelOuterRadius = this._getLevelRadius(levels, tc.level.index);

				tc.test(technologyCircles, levelInnerRadius + tc.radius, levelOuterRadius - tc.radius);
			});
		}

		// eslint-disable-next-line arrow-body-style
		return technologyCircles.reduce((svg, tc) => {
			return `${svg} <g transform="translate(${tc.position.x}, ${tc.position.y})">
				<circle r="${tc.radius}"
					class="radar__technology"
					data-technology-id="${tc.technology.id}"></circle>
				<text x="0" y="0"
					text-anchor="middle"
					transform="translate(0, 4.5)"
					class="radar__technology-id fill--level-${tc.level.index + 1}">${tc.technology.id}</text>
			</g>`;
		}, '');
	},

	_getLevelLabelsSvg(levels) {
		return levels.reduce((svg, level, i) => {
			const levelInnerRadius = this._getLevelRadius(levels, i - 1);
			const levelOuterRadius = this._getLevelRadius(levels, i);
			const radius = lerp(levelInnerRadius, levelOuterRadius, 0.5);

			return `<text x="${radius}" y="${this.fontSize * -0.5}"
				class="radar__level-label">${level.name}</text>${svg}`;
		}, '');
	},

	_getLevelRadius(levels, n) {
		return (n + 1) / levels.length * this.size;
	},

	_getLevelsSvg(levels) {
		return levels.reduce((svg, level, i) => {
			const radius = this._getLevelRadius(levels, i);

			return `<path
				d="M -${radius} 0 A ${radius} ${radius} 0 0 0 ${radius} 0 Z"
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
};
