class BinaryStar extends Animation {
	constructor() {

		super(SUN.radius * 20, daysToSeconds(0.001) / 60, 100);

		var star1 = new Body(
			SUN.mass,
			SUN.radius,
			new Vec(this.world.w / 2, this.world.h / 2),
			20
		);
		
		var star2 = new Body(
			SUN.mass,
			SUN.radius,
			star1.pos.copy(),
			20
		);

		star1.pos.y -= SUN.radius * 2;
		star2.pos.y += SUN.radius * 2;

		star1.speed.x = 11e4;
		star2.speed.x = -11e4;

		this.addBody(star1);
		this.addBody(star2);

		this.star1 = star1;
		
		this.dilatation = 1e17;

		this.infoText = "Cliquer pour ajouter des étoiles";
		this.name = 'Étoile binaire';
	}

	click(x, y) {

		var body = new Body(
			SUN.mass,
			SUN.radius,
			this.world.getWorldCoord(new Vec(x, y)),
			20
		);

		body.speed = getNormal(body.pos, this.star1.pos).multiply(11e4);
		this.addBody(body);
	}
}
