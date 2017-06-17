class Orbital extends Animation {
	constructor() {
		super(SUN.radius * 20, daysToSeconds(1e-1) / 60, 100);
		
		// https://fr.wikipedia.org/wiki/Horizon_des_%C3%A9v%C3%A8nements

		this.star = new Body(

			SUN.mass,
			0,
			new Vec(this.world.w / 2, this.world.h / 2),
			20
		);


		this.addBody(this.star);
		this.dilatation = 1e17;
		this.name ='Vitesse orbitale';
		this.infoText = 'Cliquer pour ajouter des planètes';
	}

	click(x, y) {

		var body = new Body(
			0,
			SUN.radius,
			this.world.getWorldCoord(new Vec(x, y)),
			20
		);
		
		var d = body.pos.minus(this.star.pos).length();
		var v = Math.sqrt(G*this.star.mass/d);

		body.speed = getNormal(body.pos, this.star.pos).multiply(v);

		this.addBody(body);
	}
}
