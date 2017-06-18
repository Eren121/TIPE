class LiberationSpeed extends Animation {

	constructor() {

		super(EARTH.radius * 100, daysToSeconds(0.001) / 60, 1000);

		this.earth = new Body(
			EARTH.mass,
			EARTH.radius,
			new Vec(this.world.w / 2, this.world.h / 2),
			15
		);
		this.addBody(this.earth);
		
		this.addRocket(0.9);
		this.addRocket(0.999);
		this.addRocket(1);
		this.dilatation = 1e12;

		this.name = 'Vitesse de libération';
	}

	addRocket(f) {
		
		var rocket = new Body(
			0,
			10,
			this.earth.pos.minus(new Vec(0, EARTH.radius)),
			5
		);

		rocket.speed.x = LIBERATION_SPEED_EARTH * f;

		this.addBody(rocket);
	}
}
