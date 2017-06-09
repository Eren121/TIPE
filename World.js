//Permet de convertir des coordonnées monde en coordonnées canvas
//size: taille du monde simulé

function World(cvs, size) {
	this.cvs = cvs;
	this.w = size;
	this.h = size;
}

//Converti des coordonnées dans le monde en coordonnées dans le canvas

World.prototype.getCvsCoord = function(coord) {
	return new Vec(this.cvs.w/this.w * coord.x, this.cvs.h/this.h * coord.y);
};

//Converti des coordonnées canvas en coordonnées monde

World.prototype.getWorldCoord = function(coord) {
	return new Vec(this.w/this.cvs.w * coord.x, this.h/this.cvs.h * coord.y);
};
