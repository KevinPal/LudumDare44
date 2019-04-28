var rails = [new Two.Vector(300, 0), new Two.Vector(0, 100),
new Two.Vector(200, 0), new Two.Vector(0, 500),
new Two.Vector(-300, 0), new Two.Vector(0, 100)] 

var speed = 100;
var spawn = new Two.Vector(150, 150);

var death = function(e) {
    enemies = enemies.filter( (value, index, arr) => value != e);
}

generateTileBoard(spawn, rails);

var bg = two.makeRectangle(w/2, h/2, two.width, two.height);
var bgText = two.makeTexture(document.getElementById('bg_img'));
bg.fill = bgText;
bg.noStroke();
bgLayer.add(bg);

var shopBtnText = two.makeTexture(document.getElementById('shop_btn'));
var shopBtnActvText = two.makeTexture(document.getElementById('shop_btn_actv'));
var shopBtn = two.makeRectangle(two.width * .9, two.height * .85 , 100, 100);
shopBtn.fill = shopBtnText;
shopBtn.noStroke();


var uiBgText = two.makeTexture(document.getElementById('ui_bg'));
var uiBg = two.makeRectangle(two.width * .9 - 75, two.height/2, 450, 800);
uiBg.fill = uiBgText;
uiBg.noStroke();

var hpBarText = two.makeTexture(document.getElementById('hp_bar'));
var hpBar = two.makeRectangle(two.width * .9 - 75, two.height * .15 , 400, 70);
hpBar.fill = hpBarText;
hpBar.noStroke();

var hpBarText = two.makeTexture(document.getElementById('hp_bar_hp'));
var hpBarhp = two.makeRectangle(two.width * .9 - 75-29, two.height * .15 , 330, 58);
hpBarhp.fill = hpBarText;
hpBarhp.noStroke();

var moneyBarText = two.makeTexture(document.getElementById('money_bar'));
var moneyBar = two.makeRectangle(two.width * .9 - 75, two.height * .15 + 100, 400, 70);
moneyBar.fill = moneyBarText;
moneyBar.noStroke();

var two_currency = new Two.Text("" + player_currency);
two_currency.alignment = 'right';
two_currency.size = 65;
two_currency.family = 'ZCOOL KuaiLe';
two_currency.fill = '#FFFFFF';
two_currency.translation = new Two.Vector(two.width * .9 - 75 + 120, two.height * .15 + 107);

var normalText = two.makeTexture(document.getElementById('normal_btn'));
var fastText =  two.makeTexture(document.getElementById('fast_btn'));
var speedBtn = two.makeRectangle(two.width * .9 - 150, two.height * .85 , 100, 100);
speedBtn.noStroke();
speedBtn.fill = normalText;

UILayer.add(uiBg, speedBtn, shopBtn, hpBar, hpBarhp, moneyBar, two_currency);

two.update();

speedBtn._renderer.elem.onclick = () => {
    if(gameSpeed == 1) {
        gameSpeed = 2;   
        speedBtn.fill = fastText;
    } else {
        gameSpeed = 1;
        speedBtn.fill = normalText;
    }
}

shopBtn._renderer.elem.onclick = () => {
    if(state == 0) {
        shopBtn.fill = shopBtnActvText;
        state = 1;
        shopState = 0;
    } else if(state == 1) {
        shopBtn.fill = shopBtnText;
        shopState = 2;
    } else if(state == 2) {
        shopBtn.fill = shopBtnActvText;
        state = 1;
        shopState = 0;
    }
}


var level = -1;
var levelRunningState = 0; //0 -> waiting for current enemies to die
//1 -> spawning enemies
//2 -> level transition time

function enemySpawns() {
    return [[[4, 0, 0, 0],
            [2, 0, 0, 0]],
            [[5, 1, 0, 0],
            [1, 3, 0, 0]],
            [[10, 5, 2, 0],
            [2, 1, .5, 0]],
            [[10, 10, 3, 1],
            [0.5, 0.25, 1, 1]]];
}

var currentEnemy = 0;
var numEnemiesSpawned = 0;
var spawnTimer = 0;
var numEnemies = 4;

two.bind('update', function(frameCount) {
    if(state == 0) {
        
        if(levelRunningState == 0 && enemies.length == 0) {
            levelRunningState = 2;
			setTimeout(() => {levelRunningState = 1; level++;currentEnemy = 0, numEnemySpawn=0, spawnTimer=0}, 5000/gameSpeed);
        }

        var spawns = enemySpawns()[level];
        spawnTimer += two.timeDelta/1000*gameSpeed;


        if(spawns && spawnTimer >= spawns[1][currentEnemy] && levelRunningState == 1) {
            spawnTimer -= spawns[1][currentEnemy];

            if(numEnemiesSpawned >= spawns[0][currentEnemy]) {
                numEnemiesSpawned = 0;
                currentEnemy++;
                if(currentEnemy >= numEnemies) {
                    levelRunningState = 0;
                }
            } else {
                var newRect = two.makeRectangle(0, 0, 100, 100);
                newRect.fill = '#FF00FF';
                var enemy = new Enemy(100 * (currentEnemy+1), spawn, rails, death, 5, 5, newRect);
                console.log("Spawning enemy type " + currentEnemy);
                enemies.push(enemy);
                numEnemiesSpawned++;
            }
        }


        for(var i = 0; i < enemies.length; i++) {
            enemies[i].update(two.timeDelta*gameSpeed);
        }
        for(var i = 0; i < towers.length; i++) {
            towers[i].draw(enemies, two.timeDelta*gameSpeed);
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

        if(player_health_visual != player_health) {
            player_health_visual += (-player_health_visual + player_health) * 0.05;
        }

        var hpbarhpWidth = 330;
        var hpbarhpPos = two.width * .9 - 75-29;
        var normalizedHp = player_health_visual / player_max_health;
        hpBarhp.width = hpbarhpWidth * normalizedHp;
        hpBarhp.translation.set(hpbarhpPos - (1 - normalizedHp) * hpbarhpWidth / 2, hpBarhp.translation.y);

    } 


    two_currency.value = "" + player_currency * 100;


    shopUpdate(two.timeDelta*gameSpeed);
    placementUpdate(two.timeDelta*gameSpeed);

}).play();  // Finally, start the animation loop

