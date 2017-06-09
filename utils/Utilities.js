// Divers ---------------------------------------------------------------------------

//Retourne le dernier élément du tableau
if(!Array.last) {
	Array.prototype.last = function() {
		return this[this.length - 1];
	};
}

//Manipuler le code HTML
function setHTML(balise, title, value) {
	balise.innerHTML = "<strong>" + title + "</strong>: " + value;
}


function getMousePosition(cvs, event) {

	var rect = cvs.getElement().getBoundingClientRect();
	return new Vec(event.clientX - rect.left, event.clientY - rect.top);
}

// Time -----------------------------------------------------------------------------

//Retourne l'heure actuelle en secondes
function currentTime() {
	return Date.now() / 1000;
}


//Converti des jours en seconde
function daysToSeconds(days) {
	return days * 3600 * 24;
}

//Converti des secondes en jours
function secondsToDays(seconds) {
	return seconds / 3600 / 24;
}

// Maths -------------------------------------------------------------------------------

//Converti un angle radian -> degrés
function toDegrees(alpha) {
	return alpha * 180 / Math.PI;
}

//Converti un angle degrés -> radians
function toRadians(alpha) {
	return alpha * Math.PI / 180;
}
