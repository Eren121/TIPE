function Vec(x, y) {
	this.x = x || 0;
	this.y = y || 0;
}

Vec.prototype.length2 = function() {
	return this.x*this.x + this.y*this.y;
};

Vec.prototype.length = function() {
	return Math.sqrt(this.length2());
};

//Retourne le vecteur normalisé (çàd de longeur new_l et de même direction)

Vec.prototype.normalize = function(new_l) {
	new_l = new_l || 1;
	var l = this.length();
	return new Vec(this.x / l * new_l, this.y / l * new_l);
};

//Addition de vecteur

Vec.prototype.plus = function(v) {
	return new Vec(this.x + v.x, this.y + v.y);
};

//Soustraction de vecteur

Vec.prototype.minus = function(v) {
	return new Vec(this.x - v.x, this.y - v.y);
};

//Soustraction selon une des composantes. Simplifie l'expression

Vec.prototype.minusX = function(x) {
	return new Vec(this.x - x, this.y);
};

//Multiplie le vecteur par un scalaire

Vec.prototype.multiply = function(lambda) {
	return new Vec(this.x*lambda, this.y*lambda);
};

//Divise le vecteur par un scalaire

Vec.prototype.divide = function(lambda) {
	return new Vec(this.x/lambda, this.y/lambda);
};

Vec.prototype.zero = function() {
	return(this.x === 0 && this.y === 0);
};

Vec.prototype.copy = function() {
	return new Vec(this.x, this.y);
};

// calculer le vecteur perpendiculaire à une droite
// http://stackoverflow.com/questions/1243614/how-do-i-calculate-the-normal-vector-of-a-line-segment

function getNormal(posA, posB) {
	var dx = posB.x - posA.x;
	var dy = posB.y - posA.y;
	return new Vec(dy, -dx).normalize();
}
