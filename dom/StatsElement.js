//https://github.com/mrdoob/stats.js
//option: 0 FPS, 1 ms

function StatsElement(parentID, option, title) {
	this.stats = new Stats(title);
	document.getElementById(parentID).appendChild(this.stats.dom);

	this.stats.dom.style.cssText = '';
	this.stats.showPanel(option);
}

StatsElement.prototype.begin = function() {
	this.stats.begin();
};

StatsElement.prototype.end = function() {
	this.stats.end();
};
