var rails = [new Two.Vector(300, 0), new Two.Vector(0, 100),
new Two.Vector(200, 0), new Two.Vector(0, 500),
new Two.Vector(-300, 0), new Two.Vector(0, 100)] 

var speed = 100;
var spawn = new Two.Vector(150, 150);

var death = function(e) {
    enemies = enemies.filter( (value, index, arr) => value != e);
}

var enemy = new Enemy(speed, spawn, rails, death, 5, 5, document.getElementById('enemy'));
enemies.push(enemy);


generateTileBoard(spawn, rails);

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

two.bind('update', function(frameCount) {
    if(state == 0) {
        for(var i = 0; i < enemies.length; i++) {
            enemies[i].update(two.timeDelta);
        }
        for(var i = 0; i < towers.length; i++) {
            towers[i].draw(enemies, two.timeDelta);
        }
		// update health and currency

		if (player_health < player_max_health) {
			if (regen_time > player_regen_rate) {
				regen_time -= player_regen_rate;
				player_health += 1;
			}
			regen_time += two.timeDelta;
		}

		// update health and currency ui
		two_health.value = "" + player_health;
		two_currency.value = "" + player_currency;

    } 
    shopUpdate(two.timeDelta);
    placementUpdate(two.timeDelta);

}).play();  // Finally, start the animation loop

