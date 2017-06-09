function Planet(name, mass, diameter, distance, speed) {
	this.name = name;
	this.mass = mass;
	this.radius = diameter / 2;
	this.distance = distance;
	this.speed = speed;
}

//Valeurs en mètre, seconde
//distance: distance avec le soleil
//https://nssdc.gsfc.nasa.gov/planetary/factsheet/


var PLANETS = [
	new Planet('Mercury', 	0.330e24, 	4879e3, 	57.9e9, 	47.4e3),
	new Planet('Venus', 	4.87e24, 	12104e3, 	108.2e9,	35e3),
	new Planet('Earth',	5.97e24,	12756e3,	149.6e9,	29.8e3),
	new Planet('Mars',	0.642e24,	6792e3,		227.9e9,	24.1e3),
	new Planet('Jupiter',	1898e24,	142984e3,	778.6e9,	13.1e3),
	new Planet('Saturn',	568e24,		120536e3,	1433.5e9,	9.7e3),
	new Planet('Uranus',	86.8e24,	51118e3,	2872.5e9,	6.8e3),
	new Planet('Neptune',	102e24,		49528e3,	4495.1e9,	5.4e3),
	new Planet('Pluton',	0.0146e24,	2370e3,		5906.4e9,	4.7e3)
];

var SUN = {
	name: 'Sun',
	mass: 1.989e30,
	radius: 695700e3,
};

var EARTH = PLANETS[2];
