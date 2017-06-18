//rendeRadius: taille de l'objet en pixel dans le canvas
//radius: inutilisé, les corps sont assimilés à des points matériels

function Body(mass, radius, pos, render_radius) {
	this.mass = mass;
	this.radius = radius;
	this.render_radius = render_radius;

	this.pos = pos || new Vec(0, 0);
	this.speed = new Vec(0, 0);
	this.acc = new Vec(0, 0);
}

Body.prototype.update = function(dt) {
	
	this.speed.x += this.acc.x * dt;
	this.speed.y += this.acc.y * dt;

	//Ne pas dépasser la vitesse de la lumière
	if(this.speed.length2() > SPEED_LIGHT2) {
		this.speed = this.speed.normalize(SPEED_LIGHT);
	}

	this.pos.x += this.speed.x * dt;
	this.pos.y += this.speed.y * dt;
};

// réinitialise les forces s'exerçant sur le système

Body.prototype.resetForces = function() {
	this.acc = new Vec(0, 0);
};

// Attire un objet par la force gravitationnelle

Body.prototype.attract = function(m) {
	
	var vec = this.pos.minus(m.pos);

	var d = vec.length();

	if(d == 0)
		return;

	var a = (G * this.mass) / (d*d*d);

	m.acc.x += a * vec.x;
	m.acc.y += a * vec.y;
};
