function CanvasElement(id) {
	this.cvs = document.querySelector('#' + id);
	this.ctx = this.cvs.getContext('2d');
	this.w = this.cvs.width;
	this.h = this.cvs.height;
}

CanvasElement.prototype.circle = function(pos, r, clr) {
	
	this.ctx.beginPath();
	this.ctx.fillStyle = clr;
	this.ctx.arc(pos.x, pos.y, r, 0, 2 * Math.PI);
	this.ctx.fill();
	this.ctx.closePath();

	this.ctx.beginPath();
	this.ctx.strokeStyle = 'yellow';
	this.ctx.lineWidth = 1;
	this.ctx.arc(pos.x, pos.y, r, 0, 2 * Math.PI);
	this.ctx.stroke();
	this.ctx.closePath();
};

CanvasElement.prototype.dot = function(pos, clr) {
	this.ctx.fillStyle = clr;
	this.ctx.fillRect(pos.x, pos.y, 2, 2);
}

CanvasElement.prototype.clear = function() {
	this.ctx.clearRect(0, 0, this.w, this.h);
};

CanvasElement.prototype.getElement = function() {
	return this.cvs;
};

//Dessine une flèche
//Selon une position et un vecteur direction

CanvasElement.prototype.arrow = function(pos, vec, color)  {

	var m1 = pos;
	var m2 = pos.plus(vec);

	//Angle entre la ligne principale et chaque ligne adjacente
	var alpha = toRadians(20);

	//Angle du vecteur m2m1
	var beta = Math.atan2(m1.y-m2.y,m1.x-m2.x);

	//Longueur des lignes adjacentes
	var small_length = 10;

	this.ctx.beginPath();
	this.ctx.lineWidth = 1.5;

	//Corps de la flèche
	this.ctx.moveTo(m1.x, m1.y);
	this.ctx.lineTo(m2.x, m2.y);
	
	//Ligne inférieure (les y sont inversés)
	this.ctx.moveTo(m2.x, m2.y);
	this.ctx.lineTo(m2.x + Math.cos(beta - alpha) * small_length, m2.y + Math.sin(beta - alpha) * small_length);

	//Ligne supérieure
	this.ctx.moveTo(m2.x, m2.y);
	this.ctx.lineTo(m2.x + Math.cos(beta + alpha) * small_length, m2.y + Math.sin(beta + alpha) * small_length);
	
	this.ctx.strokeStyle = color;
	this.ctx.stroke();
	this.ctx.closePath();
};
