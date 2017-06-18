class GravityZero extends Animation {
	constructor() {

		super(SUN.radius * 20, daysToSeconds(0.001) / 60, 1000);

		this.a = new Body(
			SUN.mass,
			SUN.radius,
			new Vec(this.world.w / 2, this.world.h / 2),
			20
		);
		
		this.b = new Body(
			SUN.mass / 4,
			SUN.radius,
			this.a.pos.copy(),
			10
		);

		//Centre

		this.p = new Body(
			10,
			0,
			0,
			5
		);

		this.a.pos.y -= SUN.radius * 2;
		this.b.pos.y += SUN.radius * 2;

		this.p.pos = this.a.pos.copy();

		this.posa = this.a.pos.copy();
		this.posb = this.b.pos.copy();

		//Calcul de la position du centre de masse

		
		var ab = this.b.pos.minus(this.a.pos);
		var u = ab.normalize();
		var m = this.a.mass, n = this.b.mass;
		var d;

		if(m == n) {
			
			d = ab.length() / 2;	
		}
		else {

			d = ab.length() * (m - Math.sqrt(m*n)) / (m-n);

		}


		this.p.pos = this.p.pos.plus(u.multiply(d));

		this.addBody(this.a);
		this.addBody(this.b);
		this.addBody(this.p);

		this.dilatation = 1e17;

		this.infoText = "Cliquer pour ajouter des étoiles";
		this.name = 'Gravité zéro';
	}

	//On empêche les corps de bouger

	computeForces() {
		super.computeForces();

		this.a.pos = this.posa.copy();
		this.a.speed = new Vec(0, 0);
		this.a.acc = new Vec(0, 0);

		this.b.pos = this.posb.copy();
		this.b.speed = new Vec(0, 0);
		this.b.acc = new Vec(0, 0);

	}

	click(x, y) {

		var body = new Body(
			10,
			SUN.radius,
			this.world.getWorldCoord(new Vec(x, y)),
			5
		);

		this.addBody(body);
	}
}
