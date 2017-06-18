var currentAnimIndex = 0;

var options = [
	{
		obj: null,
		className: LiberationSpeed
	},
	{
		obj: null,
		className: SolarSystem
	},
	{
		obj: null,
		className: BinaryStar
	},
	{
		obj: null,
		className: Orbital 
	},
	{
		obj: null,
		className: BlackHole
	},
	{
		obj: null,
		className: GravityZero
	}
];

function currentAnim() {
	return options[currentAnimIndex].obj;
}

//Réinitialisation

function reset() {

	for(var i = 0; i < options.length; ++i) {
		options[i].obj = new options[i].className();
	}

}

document.getElementById('reset').addEventListener('click', function(e) {
	reset();
});

reset();

//Créer les boutons d'options

(function() {

	var anims = document.getElementById('animations');

	for(var i = 0; i < options.length; ++i) {
		
		var label = document.createElement('label');
		var input = document.createElement('input');
		var span = document.createElement('span');

		label.htmlFor = 'opt_' + i;
		input.type = 'radio';
		input.name = 'type-simulation';
		input.value = i;
		input.id = 'opt_' + i;
		span.innerHTML = options[i].obj.name;

		if(i === 0)
			input.checked = true;

		label.appendChild(input);
		label.appendChild(span);
		anims.appendChild(label);
	}
})();

//Pause

document.addEventListener('keydown', function(e) {
	if(e.keyCode == 80) { // touche "p"
		global.paused = !global.paused;
	}
});

//Changement d'animation

var radios = document.querySelectorAll('input[type=radio][name=type-simulation]');

var type_change = function() {
	
	var target = null;

	for(var i = 0; i < radios.length; ++i) {
		if(radios[i].checked) {
			target = radios[i];
			break;
		}
	}

	currentAnim().goBackground();
	currentAnimIndex = parseInt(target.value, 10);
	currentAnim().goForeground();

	document.getElementById('infos').innerHTML = currentAnim().infoText;
};

for(var i = 0; i < radios.length; ++i) {
	radios[i].addEventListener('change', type_change);
}

type_change();

//Options

var checkbox = document.querySelectorAll('input[type=checkbox]');
var checkbox_change = function(e) {
	global[e.target.name] = e.target.checked; //On active/désactive l'option associé qui porte le même nom
};

for(i = 0; i < checkbox.length; ++i) {
	checkbox[i].addEventListener('change', checkbox_change);	
}

//Click

document.getElementById('cvs').addEventListener('click', function(e) {

	var 	x = e.pageX - e.target.offsetLeft,
		y = e.pageY - e.target.offsetTop;
	
	currentAnim().click(x, y);
});

function update() {

	currentAnim().update();
	window.requestAnimationFrame(update);
}

update();
