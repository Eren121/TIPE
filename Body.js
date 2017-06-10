//rendeRadius: taille de l'objet en pixel dans le canvas
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
	if(this.speed.length2() > SPEED_LIGHT*SPEED_LIGHT) {
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

	//On ne traite pas les cas ou la masse est nulle
	if(m.mass === 0 || this.mass === 0)
		return;
	
	// vecteur unitaire dirigé de m vers this
	
	var vec_distance = this.pos.minus(m.pos);

	var d = vec_distance.length();
	
	//On ne traite pas si la distance est inférieure au rayon des deux objets
	if(d < this.radius + m.radius)
		return;
	
	var a = (G * this.mass) / (d*d*d);

	m.acc.x += a * vec_distance.x;
	m.acc.y += a * vec_distance.y;

};
