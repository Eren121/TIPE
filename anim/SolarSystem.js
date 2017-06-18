class SolarSystem extends Animation {

	constructor() {

		super(PLANETS.last().distance * 2, daysToSeconds(10) / 60, 100);

		var sun_pos = new Vec(this.world.w / 2, this.world.h / 2);	
		var sun = new Body(SUN.mass, SUN.radius, sun_pos, 20);
		var p;
		

		this.addBody(sun);

		for(p = 0; p < PLANETS.length; ++p) {
			var pos = sun_pos.copy().minusX(PLANETS[p].distance);
			var body = new Body(PLANETS[p].mass, PLANETS[p].radius, pos, 10);
			body.speed.y = PLANETS[p].speed;
		
			this.addBody(body);
		}
	
		this.dilatation = 1e17;

		this.name = 'Système solaire';
	}
}
