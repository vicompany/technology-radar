export default class Vector2 {
	constructor(x = 0, y = 0) {
		this.set(x, y);
	}

	add(v) {
		this.x += v.x;
		this.y += v.y;

		return this;
	}

	clone() {
		return new Vector2(this.x, this.y);
	}

	getDirection() {
		return Math.atan2(this.y, this.x);
	}

	getLength() {
		return Math.sqrt((this.x * this.x) + (this.y * this.y));
	}

	multiplyScalar(s) {
		this.x *= s;
		this.y *= s;

		return this;
	}

	set(x, y) {
		this.x = x;
		this.y = y;

		return this;
	}

	setLength(length) {
		return this.multiplyScalar(length / this.getLength());
	}

	subtract(v) {
		this.x -= v.x;
		this.y -= v.y;

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
