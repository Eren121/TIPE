class LiberationSpeed extends Animation {

	constructor() {

		super(EARTH.radius * 1000, daysToSeconds(0.001) / 60, 1000);

		var earth = new Body(
			EARTH.mass,
			EARTH.radius,
			new Vec(this.world.w / 2, this.world.h / 2),
			15
		);
		
		var rocket = new Body(
			10,
			10,
			earth.pos.minus(new Vec(0, EARTH.radius)),
			5
		);

		rocket.speed.x = LIBERATION_SPEED_EARTH * 0.99;

		this.addBody(earth);
		this.addBody(rocket);
		
		this.dilatation = 1e12;

		this.name = 'Vitesse de libération';
	}
}
