var terrain;
var img;

var particles = [];

var displayHeightmap = true;
var displaySlopes = false;

function preload() {
	img = loadImage('assets/heighmap.png');
}

function setup() {
	createCanvas(768, 1024);

	var w = 768;
	var h = 1024;
	var xResolution = 50;
	terrain = createHeightmap(img, w, h, xResolution);

	frameRate(30);
}

function draw() {
	background(255);

	if (displayHeightmap) {
		terrain.drawHeightmap();
	}
	if (displaySlopes) {
		terrain.drawVectorField();
	}


	//move particles
	for (var i = 0; i < particles.length; i++) {
		var p = particles[i];

		var slope = terrain.getSlope(p.x, p.y);


		p.x += slope.x;
		p.y += slope.y;

	}

	//draw particles
	fill(0);
	noStroke();
	for (var i = 0; i < particles.length; i++) {
		var p = particles[i];

		ellipse(p.x, p.y, 3, 3);
	}


}

function mousePressed() {

	var p = createVector(mouseX, mouseY);

	particles.push(p);

}

function keyPressed() {

	if (key == '1') {
		displayHeightmap = !displayHeightmap;
	}
	else if (key == '2') {
		displaySlopes = !displaySlopes;
	}
	else if (key == '3') {
		spawnParticles();
	}

}

function spawnParticles() {
	var border= 10;
	for (var i = 0; i < 100; i++) {

		var p = createVector(random(border, width-border), random(border, height-border));
		particles.push(p);
	}
}