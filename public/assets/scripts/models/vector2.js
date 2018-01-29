export default class Vector2 {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	clone() {
		return new Vector2(this.x, this.y);
	}

	multiplyScalar(s) {
		this.x *= s;
		this.y *= s;

		return this;
	}

	static fromPolar(phi, radius) {
		return new Vector2(
			Math.cos(phi) * radius,
			Math.sin(phi) * radius
		);
	}

	static fromScalar(s) {
		return new Vector2(s, s);
	}
}
