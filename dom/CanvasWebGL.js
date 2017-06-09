var BODIES_LENGTH = 10;

function CanvasWebGL(id, vert, frag) {
	this.cvs = document.getElementById(id);
	this.gl = null;
	this.program = null;

	this.init();
	this.loadShaders(vert, frag);
	this.initBodies();
}

CanvasWebGL.prototype.init = function() {

	try {
		this.gl = this.cvs.getContext('webgl');
	}
	catch(e) {}

	if(!this.gl) {
		alert('Erreur CanvasWebGL.init');
	}
};

CanvasWebGL.prototype.loadShader = function(src, type) {
	
	var GL = this.gl;
	var shader = GL.createShader(type);
	
	GL.shaderSource(shader, src);
	GL.compileShader(shader);

	if(!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
		alert(GL.getShaderInfoLog(shader));
		return null;
	}

	return shader;
};

CanvasWebGL.prototype.loadShaders = function(vertexSrc, fragmentSrc) {

	var GL = this.gl;

	this.program = GL.createProgram();
	var vertex = this.loadShader(vertexSrc, GL.VERTEX_SHADER);
	var fragment = this.loadShader(fragmentSrc, GL.FRAGMENT_SHADER);

	GL.attachShader(this.program, vertex);
	GL.attachShader(this.program, fragment);
	GL.linkProgram(this.program);

	if(!GL.getProgramParameter(this.program, GL.LINK_STATUS)) {
		alert("Impossible d'intialiser le shader");
	}
	
	GL.useProgram(this.program);
};

//Initialise les corps

CanvasWebGL.prototype.initBodies = function(world, bodies) {
	
	var GL = this.gl;
	var bodiesUniform = GL.getUniformLocation(this.program, 'bodies');
	var pos;
	var data = [];

	for(var i = 0; i < BODIES_LENGTH; ++i) {
		
		data.push(0, 0, -1);
	}
	
	GL.uniform3fv(bodiesUniform, data);
}

//Modifie les corps dans le shader
//On enregistre la masse et la position dans un vec3

CanvasWebGL.prototype.setBodies = function(world, bodies) {

	var GL = this.gl;
	var bodiesUniform = GL.getUniformLocation(this.program, 'bodies');
	var pos;
	var data = [];
	var length = bodies.length;
	var i;

	for(i = 0; i < length; ++i) {
		
		pos = world.getCvsCoord(bodies[i].pos);
		data.push(pos.x,  800 - pos.y, bodies[i].mass); //Les Y sont inversé
	}

	//On complète avec les corps restants

	for(i = 0; i < (BODIES_LENGTH - length); ++i) {
		data.push(0, 0, -1);
	}

	GL.uniform3fv(bodiesUniform, data);
};

//Modifie le facteur de dilatation du champ gravitationnel

CanvasWebGL.prototype.setDilatation = function(f) {

	var GL = this.gl;
	var dilatationUniform = GL.getUniformLocation(this.program, 'dilatation');
	GL.uniform1f(dilatationUniform, f);
}

CanvasWebGL.prototype.draw = function() {

	var GL = this.gl;

	GL.clearColor(0, 0, 0, 1);
	GL.enable(GL.DEPTH_TEST);
	GL.depthFunc(GL.LEQUAL);
	GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
	
	//On dessine sur la surface entière
	var vertices = [
		-1, -1,
		 1, -1,
		-1,  1,
		 1,  1
	];
	var buf = GL.createBuffer();

	GL.bindBuffer(GL.ARRAY_BUFFER, buf);
	GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(vertices), GL.STATIC_DRAW);

	var positionUniform = GL.getAttribLocation(this.program, 'position');

	GL.enableVertexAttribArray(positionUniform);
				
	var size = 2;
	var type = GL.FLOAT;
	var normalize = false;
	var stride = 0;
	var offset = 0;
	
	GL.vertexAttribPointer(positionUniform, size, type, normalize, stride, offset);


	GL.drawArrays(GL.TRIANGLE_STRIP, 0, 4);
};
