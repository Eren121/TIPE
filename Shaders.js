var FRAG_SHADER_SRC =  `
	precision mediump float;
	uniform float param;

	//xy: pos, z: mass
	uniform vec3 bodies[10];

	float G = 6.674e-11;

	//Facteur de dilatation pour faire apparaître le champ gravitationnel
	uniform float dilatation;

	vec2 getGravitationLocal(vec2 pos, vec3 body) {

		vec2 vec_distance = vec2(0.0);
		vec2 force = vec2(0.0);
		
		vec_distance.x = pos.x - body.x;
		vec_distance.y = pos.y - body.y;
		
		float d = length(vec_distance);
		float f = (G * body.z) / (d*d*d);

		force.x += f * vec_distance.x;
		force.y += f * vec_distance.y;

		return force;
	}


	vec2 getGravitationField(vec2 pos) {
		
		vec2 field = vec2(0.0);
		
		
		for(int i = 0; i < 10; ++i) {
			if(bodies[i].z > 0.0) { //Si la masse est supérieure à 0
				field += getGravitationLocal(pos, bodies[i]);
			}
		}

		return field;
	}

	void main(void) {
		
		vec2 field = getGravitationField(gl_FragCoord.xy);
		field /= dilatation;
		
		float r = length(field);
		
		gl_FragColor = vec4(r, r, r, 1.0);
		//gl_FragColor = vec4(0.0, 0.0, 1.0, 0.0);
	}
`;

var VERT_SHADER_SRC =  `
	precision mediump float;
	attribute vec4 position;

	void main(void) {
		gl_Position = position;
	}


`;
