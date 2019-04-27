
//var pig = two.interpret(document.getElementById('pig'))
var rect = two.makeRectangle(213, 100, 100, 100);
two.update();

var state = 0; //0 -> game, 1-> shop, 2-> placement
var shopState = 0; //0 -> window opening, 1-> window displayed, 2-> window closing then game, 3-> shop closing then place

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
two.update();

shopBtn._renderer.elem.onclick = () => {
    if(state == 0) {
        state = 1;
        shopState = 0;
    } else if(state == 1) {
        shopState = 2;
    }
}

shopBtn.fill = shopBtnText;
shopBtn.noStroke();

rect.fill = shopBtnText;

two.bind('update', function(frameCount) {

    if(state == 0) {
        for(var i = 0; i < enemies.length; i++) {
            enemies[i].update(two.timeDelta);
        }
    } else if(state == 1){
        shopUpdate(two.timeDelta);
    }

}).play();  // Finally, start the animation loop

