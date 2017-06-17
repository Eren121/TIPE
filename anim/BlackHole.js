class BlackHole extends Animation {
	constructor() {
		super(SUN.radius * 20, daysToSeconds(1e-4) / 60, 100);
		
		// https://fr.wikipedia.org/wiki/Horizon_des_%C3%A9v%C3%A8nements

		var radius = SUN.radius * 3;

		this.blackHole = new Body(

			SPEED_LIGHT2*radius/(G),
			radius,
			new Vec(this.world.w / 2, this.world.h / 2),
			20
		);


		this.addBody(this.blackHole);
		this.dilatation = 1e23;
		this.name ='Trou noir';
		this.infoText = 'Cliquer pour ajouter des photons<br />Cercle bleu: horizon des évènements.<br />Cercle rouge: taille du trou noir.';
	}

	click(x, y) {

		var body = new Body(
			0,
			SUN.radius,
			this.world.getWorldCoord(new Vec(x, y)),
			5
		);
		
		var d = body.pos.minus(this.blackHole.pos).length();

		//body.speed = getNormal(body.pos, this.blackHole.pos).multiply(SPEED_LIGHT);
		body.speed.x = SPEED_LIGHT;

		this.addBody(body);
	}

	draw() {

		var r1 = this.blackHole.radius;
		var r2 = 2 * r1;

		this.cvs.circle_stroke(this.world.getCvsCoord(this.blackHole.pos), this.world.getCvsLength(r1), 'red');
		this.cvs.circle_stroke(this.world.getCvsCoord(this.blackHole.pos), this.world.getCvsLength(r2), 'blue');
		super.draw();
	}
}
