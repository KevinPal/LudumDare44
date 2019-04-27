var elem = document.getElementById('draw-shapes');
var params = { width: 285, height: 200, fullscreen:true };
var two = new Two(params).appendTo(elem);

var line = new Two.Line(0, 0, 20, 25);

// two has convenience methods to create shapes.
var circle = two.makeCircle(72, 100, 50);
var rect = two.makeRectangle(213, 100, 100, 100);


// The object returned has many stylable properties:
circle.fill = '#FF8000';
circle.stroke = 'orangered'; // Accepts all valid css color
circle.linewidth = 5;

rect.fill = 'rgb(0, 200, 255)';
rect.opacity = 0.75;
rect.noStroke();

// Don't forget to tell two to render everything
// to the screen
two.update();

var rails = [new Two.Vector(3, 4), new Two.Vector(5, -3)]
var speed = 1;
var spawn = new Two.Vector(150, 150);
var death = function(e) {

}
var enemy = new Enemy(speed, spawn, rails, death, rect);

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

