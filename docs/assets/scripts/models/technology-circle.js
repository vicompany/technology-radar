import Vector2 from './vector2.js';

export default class TechnologyCircle {
	constructor(technology, level, radius, mass = Math.sqrt(radius)) {
		this.technology = technology;
		this.level = level;

		this.position = new Vector2();
		this.radius = radius;
		this.mass = mass;
	}

	test(technologyCircles, minDistanceFromCenter, maxDistanceFromCenter) {
		const center = Vector2.fromScalar(0);

		technologyCircles.forEach((tc) => {
			if (tc === this) {
				return;
			}

			const centerDifference = center.clone().subtract(this.position);
			const centerDistance = centerDifference.getLength();
			const targetLength = Math.max(minDistanceFromCenter, Math.min(maxDistanceFromCenter, centerDistance));

			this.position.setLength(targetLength);
			this.position.x = Math.max(0, this.position.x);
			this.position.y = Math.max(this.radius, this.position.y);

			const positionDifference = tc.position.clone().subtract(this.position);
			const angle = positionDifference.getDirection();

			const distance = positionDifference.getLength();
			const distanceMin = this.radius + tc.radius;

			if (distance > distanceMin) {
				return;
			}

			this.position.subtract(Vector2.fromPolar(angle, this.radius * 0.25));
		});

		this.position.x = Math.max(0, this.position.x);
		this.position.y = Math.max(this.radius, this.position.y);
	}
}
