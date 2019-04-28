var rails = [new Two.Vector(300, 0), new Two.Vector(0, 100),
new Two.Vector(200, 0), new Two.Vector(0, 500),
new Two.Vector(-300, 0), new Two.Vector(0, 100)]


var speed = 100;
var spawn = new Two.Vector(150, 150);

var death = function(e) {
    enemies = enemies.filter( (value, index, arr) => value != e);
}

//var enemy = new Enemy(speed, spawn, rails, death, 5, document.getElementById('enemy'));
//enemies.push(enemy);


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

var level = 0;
var levelIsRunning = true;

function enemySpawns() {
    return [[[3, 0, 0, 0],
            [2, 0, 0, 0]],
            [[5, 1, 0, 0],
            [1, 3, 0, 0]],
            [[10, 5, 0, 0],
            [2, 3, 0, 0]]];
}

var currentEnemy = 0;
var numEnemiesSpawned = 0;
var spawnTimer = 0;
var numEnemies = 4;

two.bind('update', function(frameCount) {

    if(state == 0) {
        

        var spawns = enemySpawns()[level];
        spawnTimer += two.timeDelta/1000;
        if(spawnTimer >= spawns[1][currentEnemy] && levelIsRunning) {
            spawnTimer -= spawns[1][currentEnemy];

            if(numEnemiesSpawned >= spawns[0][currentEnemy]) {
                numEnemiesSpawned = 0;
                currentEnemy++;
                if(currentEnemy > numEnemies) {
                    levelIsRunning = false;
                }
            } else {
                var newRect = two.makeRectangle(0, 0, 100, 100);
                newRect.fill = '#FF00FF';
                var enemy = new Enemy(100 * (currentEnemy+1), spawn, rails, death, 5, newRect);
                console.log("Spawning enemy type " + currentEnemy);
                enemies.push(enemy);
                numEnemiesSpawned++;
            }
        }

        for(var i = 0; i < enemies.length; i++) {
            enemies[i].update(two.timeDelta);
        }
        for(var i = 0; i < towers.length; i++) {
            towers[i].draw(enemies, two.timeDelta);
        }
    } 
    shopUpdate(two.timeDelta);
    placementUpdate(two.timeDelta);

}).play();  // Finally, start the animation loop

