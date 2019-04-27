var elem = document.getElementById('draw-shapes');
var params = { width: 285, height: 200, fullscreen:true };
var two = new Two(params).appendTo(elem);

var line = new Two.Line(0, 0, 20, 25);

//var pig = two.interpret(document.getElementById('pig'))
var rect = two.makeRectangle(213, 100, 100, 100);
two.update();

var state = 0;

var rails = [new Two.Vector(300, 0), new Two.Vector(0, 100),
new Two.Vector(200, 0), new Two.Vector(0, 500),
new Two.Vector(-300, 0), new Two.Vector(0, 100)]
var speed = 100;
var spawn = new Two.Vector(150, 150);


enemies = [];

var death = function(e) {
    enemies = enemies.filter( (value, index, arr) => value != e);
}


var enemy = new Enemy(speed, spawn, rails, death, rect);
enemies.push(enemy);

var shopBtnText = two.makeTexture(document.getElementById('shop_btn'));
var shopBtn = two.makeRectangle(two.width * .9, two.height * .9 , 100, 100);
shopBtn.fill = shopBtnText;
shopBtn.noStroke();

rect.fill = shopBtnText;

two.bind('update', function(frameCount) {
	if(keys["Control"]) {
		panSpeed.addSelf(mouseDelta.clone().multiplyScalar(-.5));
	}
	panSpeed.divideScalar(1.1);
	if(panSpeed.isZero()) {
		panSpeed.clear();
	}

	two.scene.translation.addSelf(panSpeed);
    for(var i = 0; i < enemies.length; i++) {
	    enemies[i].update(two.timeDelta);
    }

}).play();  // Finally, start the animation loop

