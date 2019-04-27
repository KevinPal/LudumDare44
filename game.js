var elem = document.getElementById('draw-shapes');
var params = { width: 285, height: 200, fullscreen:true };
var two = new Two(params).appendTo(elem);

var line = new Two.Line(0, 0, 20, 25);

var pig = two.interpret(document.getElementById('pig'))

two.update();

var rails = [new Two.Vector(3, 4), new Two.Vector(5, -3)]
var speed = 1;
var spawn = new Two.Vector(150, 150);
var death = function(e) {

}
var enemy = new Enemy(speed, spawn, rails, death, pig);

two.bind('update', function(frameCount) {
	if(keys["Control"]) {
		panSpeed.addSelf(mouseDelta.clone().multiplyScalar(-.5));
	}
	panSpeed.divideScalar(1.1);
	if(panSpeed.isZero()) {
		panSpeed.clear();
	}

	two.scene.translation.addSelf(panSpeed);
	enemy.update(two.timeDelta);

}).play();  // Finally, start the animation loop

