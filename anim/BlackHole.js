class BlackHole extends Animation {
	constructor() {
		super(SUN.radius * 20, daysToSeconds(0.001) / 60, 100);

		var blackHole = new Body(

			SUN.mass,
			SUN.radius,
			new Vec(this.world.w / 2, this.world.h / 2),
			20
		);

		this.addBody(blackHole);
		this.dilatation = 1e17;
		this.name='Trou noir';
	}
}
