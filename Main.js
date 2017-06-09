var libe_speed, solar_system, binary_star;
var currentAnim = libe_speed;
var paused = false;

document.addEventListener('keydown', function(e) {
	if(e.keyCode == 80) { // touche "p"
		paused = !paused;
	}
});

var radios = document.querySelectorAll('input[type=radio][name=type-simulation]');
var type_change = function() {
	
	var target;

	for(var i = 0; i < radios.length; ++i) {
		if(radios[i].checked) {
			target = radios[i];
			break;
		}
	}

	if(currentAnim != null) {

		currentAnim.goBackground();
	}

	switch(target.value) {
		case 'liberation':
			currentAnim = libe_speed;
			break;

		case 'solar-system':
			currentAnim = solar_system;
			break;

		case 'binary-star':
			currentAnim = binary_star;
			break;
	}

	currentAnim.goForeground();

	document.getElementById('infos').innerHTML = currentAnim.infoText;
};

for(var i = 0; i < radios.length; ++i) {
	radios[i].addEventListener('change', type_change);
}

var checkbox = document.querySelectorAll('input[type=checkbox]');
var checkbox_change = function(e) {
	global[e.target.name] = e.target.checked; //On active/désactive l'option associé qui porte le même nom
};

for(i = 0; i < checkbox.length; ++i) {
	checkbox[i].addEventListener('change', checkbox_change);	
}

//Bouton reset

document.getElementById('reset').addEventListener('click', function(e) {
	reset();
});

document.getElementById('cvs').addEventListener('click', function(e) {

	var 	x = e.pageX - e.target.offsetLeft,
		y = e.pageY - e.target.offsetTop;
	
	currentAnim.click(x, y);
});

function update() {

	if(!paused) {

		currentAnim.update();
	}

	window.requestAnimationFrame(update);
}

//Initialisation/réinitialisation

function reset() {

	libe_speed = new LiberationSpeed();
	solar_system = new SolarSystem();
	binary_star = new BinaryStar();

	type_change();
}

reset();
update();
