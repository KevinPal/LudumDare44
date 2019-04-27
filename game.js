var elem = document.getElementById('draw-shapes');
var params = {fullscreen: true};
var two = new Two(params).appendTo(elem);

var line = new Two.Line(0, 0, 20, 25);

//var pig = two.interpret(document.getElementById('pig'))
two.update();

var rails = [new Two.Vector(300, 0), new Two.Vector(0, 100),
new Two.Vector(200, 0), new Two.Vector(0, 500),
new Two.Vector(-300, 0), new Two.Vector(0, 100)]
var speed = 100;
var spawn = new Two.Vector(150, 150);
var death = function(e) {

}
var enemy = new Enemy(speed, spawn, rails, death, 5, document.getElementById('enemy'));
var enemies = [enemy];

var tower = new Tower(500, 10, 1000, document.getElementById('tower'), document.getElementById('tower'), new Two.Vector(0, 0));

two.bind('update', function(frameCount) {
	if(keys["Control"]) {
		panSpeed.addSelf(mouseDelta.clone().multiplyScalar(-.5));
	}
	panSpeed.divideScalar(1.1);
	if(panSpeed.isZero()) {
		panSpeed.clear();
	}

	two.scene.translation.addSelf(panSpeed);
	for (var i = 0; i < enemies.length; i++) {
		enemies[i].update(two.timeDelta);
	}

	for (var i = enemies.length; i > 0; i--) {
		if (enemies[i - 1].health < 0) {
			enemies.splice(i - 1, 1);
		}
	}
	tower.draw(enemies, two.timeDelta);

}).play();  // Finally, start the animation loop

