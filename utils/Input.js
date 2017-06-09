//Etat du clavier

var BUTTON_CTRL = 17;
var Keyboard = {};

document.addEventListener('keydown', function(e) {
	Keyboard[e.keyCode] = true;
});

document.addEventListener('keyup', function(e) {
	Keyboard[e.keyCode] = false;
});
