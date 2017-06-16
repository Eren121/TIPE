class Orbital extends Animation {
	constructor() {
		super(SUN.radius * 20, daysToSeconds(1e-1) / 60, 1);
		
		// https://fr.wikipedia.org/wiki/Horizon_des_%C3%A9v%C3%A8nements

		this.blackHole = new Body(

			SUN.mass,
			0,
			new Vec(this.world.w / 2, this.world.h / 2),
			20
		);


		this.addBody(this.blackHole);
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
		
		var d = body.pos.minus(this.blackHole.pos).length();
		var v = Math.sqrt(G*this.blackHole.mass/d);
		body.speed = getNormal(body.pos, this.blackHole.pos).multiply(v);

		this.addBody(body);
	}
}
