var global =  {
	stats_fps: new StatsElement('stats', 0),
	stats_computing: new StatsElement('stats', 1, 'Calcul'),
	stats_rendering: new StatsElement('stats', 1, 'Rendu'),

	cvsGLSL: new CanvasWebGL('cvs_webgl', VERT_SHADER_SRC, FRAG_SHADER_SRC), //Canvas pour l'affichage des shaders

	draw_bodies: true,
	draw_field: true,
	draw_trace: true,
	draw_vectors: true
};


class Animation {
	constructor(size, dt, iterations) {

		//Elements de la page HTML
		this.html_time = document.querySelector('#time');
		this.html_nbr = document.querySelector('#nbr_of_bodies');
		this.html_stats = document.querySelector('#stats');

		this.stats_fps = global.stats_fps;
		this.stats_computing = global.stats_computing;
		this.stats_rendering = global.stats_rendering;

		this.cvs = new CanvasElement('cvs'); //Canvas principal

		this.world = new World(this.cvs, size);
		this.dt = dt;		 //Temps (en secondes) simulé entre chaque itération
		this.bodies = [];

		this.iterations = iterations;
		this.simulation_time = 0;

		//Trace des corps
		this.traces = [];
		this.last_time_trace = currentTime();

		//Coefficient de dilatation du champ gravitationnel
		this.dilatation = 1e17;

		//L'animation est au premier plan
		this.isForeground = false;

		//Texte d'information
		this.infoText = "";
	}
	
	//Quand l'animation est choisie pour aller au premier plan

	goForeground() {
		setHTML(this.html_nbr, "nb. Corps", this.bodies.length);
		setHTML(this.html_time, "Jours", secondsToDays(this.simulation_time).toFixed(6));

		global.cvsGLSL.setDilatation(this.dilatation);

		this.isForeground = true;
	}

	goBackground() {

		this.isForeground = false;
	}
	
	addBody(body) {
		
		this.bodies.push(body);
		this.traces.push([]);

		if(this.isForeground) {
			
			setHTML(this.html_nbr, "nb. Corps", this.bodies.length);
		}
	}

	computeForces() {

		var i;
		var j;

		for(i = 0; i < this.bodies.length; ++i) {
			
			this.bodies[i].resetForces();
		
			for(j = 0; j < this.bodies.length; ++j) {

				if(i != j) {

					//On applique la force gravitationnelle sur l'objet 
					this.bodies[j].attract(this.bodies[i]);
				}
			
			}

		}
		
		//Update à l'extérieur de la boucle, pour modifier toutes les positions en même temps
		for(i = 0; i < this.bodies.length; ++i) {
			//Actualiser la position
			this.bodies[i].update(this.dt);
		}

	}

	computeTrace() {
		
		var i;

		//Ajouter la trace
		if(currentTime() > this.last_time_trace + 0.1) {
			
			this.last_time_trace = currentTime();

			for(i = 0; i < this.bodies.length; ++i) {
				this.last_trace_time = currentTime();
				this.traces[i].push(this.world.getCvsCoord(this.bodies[i].pos));
			}
		}

	}

	draw() {

		var i;
		var body;

		
		if(global.draw_bodies) {

			for(i = 0; i < this.bodies.length; ++i) {

				body = this.bodies[i];
				this.cvs.circle(this.world.getCvsCoord(body.pos), body.render_radius, 'green');
			}

		}

		if(global.draw_vectors) {

			for(i = 0; i < this.bodies.length; ++i) {

				body = this.bodies[i];

				//Si l'acélération/vitesse est supérieure à 0, on l'affiche

				if(body.speed.length2() > 0)
					this.cvs.arrow(this.world.getCvsCoord(body.pos), body.speed.normalize().multiply(20), 'blue');

				if(body.acc.length2() > 0)
					this.cvs.arrow(this.world.getCvsCoord(body.pos), body.acc.normalize().multiply(20), 'red');
			}
		}
	}

	drawShader() {

		if(global.draw_field) {

			global.cvsGLSL.setBodies(this.world, this.bodies);
		}
		else {

			global.cvsGLSL.setBodies(this.world, []);
		}
		
		global.cvsGLSL.draw();	
	}

	drawTrace() {
	

		if(global.draw_trace) {

			var i;
			var j;
			var bodies_length = this.bodies.length;
			var trace_length;
			var pos;

			for(i = 0; i < bodies_length; ++i) {

				trace_length = this.traces[i].length;	
				
				for(j = 0; j < trace_length; ++j) {
					
					pos = this.traces[i][j];
					this.cvs.dot(pos, 'pink');
				}
			}
		}

	}

	//L'utilisateur a cliqué

	click(x, y) {

	}

	//60 fois par seconde
	update() {

		this.cvs.clear();

		var nb;

		this.stats_fps.begin();
		this.stats_computing.begin();

			
			//On fait plusieurs fois la boucle pour augmenter la vitesse de l'animation
			for(nb = 0; nb < this.iterations; ++nb) {
				this.computeForces();
			}

			this.computeTrace();

			this.simulation_time += this.dt * this.iterations;
			setHTML(this.html_time, "Jours", secondsToDays(this.simulation_time).toFixed(6));

		this.stats_computing.end();
		this.stats_rendering.begin();

		this.drawShader();
		this.drawTrace();
		this.draw();

		this.stats_rendering.end();
		this.stats_fps.end();
	}
}
