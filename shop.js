var w = two.width;
var h = two.height;
var towerSelectionId = 0;

//var shopBG = two.makeRectangle(0, 0, 705, 810);
var shopBG = two.interpret(document.getElementById('shop'));
shopBG.translation = new Two.Vector(-350, -400);
//var shopBGText = two.makeTexture(document.getElementById('shop'));
//shopBG.fill = shopBGText;
shopBG.noStroke();


var shopLabel = two.makeRectangle(0, -320, 253, 59);
var shopLabelText = two.makeTexture(document.getElementById('shop_label'));
shopLabel.fill = shopLabelText;
shopLabel.noStroke();

var towerText = two.makeTexture(document.getElementById('shop_entry'));
var tower1 = two.makeRectangle(0, -h/4+50, 650, 125);
var tower2 = two.makeRectangle(0, -h/4+50+150*1, 650, 125);
var tower3 = two.makeRectangle(0, -h/4+50+150*2, 650, 125);
var tower4 = two.makeRectangle(0, -h/4+50+150*3, 650, 125);
tower1.fill = towerText;
tower2.fill = towerText;
tower3.fill = towerText; tower4.fill = towerText;
tower1.noStroke();
tower2.noStroke();
tower3.noStroke();
tower4.noStroke();

var tower1_lb = new Two.Text("Standard Turret - 500G");
tower1_lb.family = 'zcool kuaile';
tower1_lb.size = 40;
tower1_lb.translation = new Two.Vector(0, -h/4+50+150*0);

var tower2_lb = new Two.Text("AOE Turret - 5000G");
tower2_lb.family = 'zcool kuaile';
tower2_lb.size = 40;
tower2_lb.translation = new Two.Vector(0, -h/4+50+150*1);

var tower3_lb = new Two.Text("Slowing Turret - 2500G");
tower3_lb.family = 'zcool kuaile';
tower3_lb.size = 40;
tower3_lb.translation = new Two.Vector(0, -h/4+50+150*2);

var tower4_lb = new Two.Text("Sniper Turret - 1500G");
tower4_lb.family = 'zcool kuaile';
tower4_lb.size = 40;
tower4_lb.translation = new Two.Vector(0, -h/4+50+150*3)


var shopGroupPanel = two.makeGroup(shopBG, shopLabel, tower1, tower2, tower3, tower4, tower1_lb, tower2_lb, tower3_lb, tower4_lb);
shopGroupPanel.translation = new Two.Vector(w/2.5, h/2);


var shopGroup = two.makeGroup(shopGroupPanel);
shopGroup.translation = new Two.Vector(0, h);

two.update();

tower1._renderer.elem.onclick = placeTowerWrapper(1);
tower2._renderer.elem.onclick = placeTowerWrapper(2);
tower3._renderer.elem.onclick = placeTowerWrapper(3);
tower4._renderer.elem.onclick = placeTowerWrapper(4);


function placeTowerWrapper(towerNum) {

    foo =  function() {
        shopState = 3;
        towerSelectionId = towerNum;
        console.log("Selected turret " + towerSelectionId);
    }
    return foo;
}

UILayer.add(shopGroup);

var placementTiles = [];
var towerDim = 100;
var selectedTile;
function generateTileBoard(spawn, rails) {

    function onTileClick() {
        if(state == 2) {
            var placementPos = selectedTile.translation.clone();
            if(towerSelectionId == 1) {
                if (player_currency >= 5) {
                    var tower = new Tower(500, 1, 1000, document.getElementById('tower'), document.getElementById('tower'), 1, placementPos);
                    player_currency -= 5;
                    towers.push(tower);
                }
            } else if(towerSelectionId == 2){
                if(player_currency >= 50) {
                    var tower = new Tower(500, 1, 1000, document.getElementById('tower'), document.getElementById('tower'), 2, placementPos);
                    player_currency -= 50;
                    towers.push(tower);
                }
            } else if(towerSelectionId == 3){
                if(player_currency >= 25) {
                    var tower = new Tower(500, 0, 5000, document.getElementById('tower'), document.getElementById('tower'), 3, placementPos);
                    player_currency -= 25;
                    towers.push(tower);
                }
			} else if(towerSelectionId == 4){
                if(player_currency >= 15) {
                    var tower = new Tower(50000, 10, 10000, document.getElementById('tower'), document.getElementById('tower'), 1, placementPos);
                    player_currency -= 25;
                    towers.push(tower);
                }
			}

			state = 1;
			shopState = 0;
        }
    }
    
    for(var i = 0; i < w / towerDim; i++) {
        for(var j = 0; j < h / towerDim; j ++) {
            var newRect = two.makeRectangle(towerDim * i, towerDim * j, towerDim, towerDim);
            var vectStart = spawn.clone();
            var intersects = false;
            debug = j == 4 && i == 2;
            for(var k = 0; k < rails.length; k++) {
                if(lineIntersectsRect(vectStart, vectStart.clone().addSelf(rails[k]), newRect)) {
                    intersects = true;
                    break;
                } else {
                    vectStart.addSelf(rails[k]);
                }
            }
            if(!intersects) {
                newRect.opacity = 0.5;
                placementTiles[j * Math.ceil(w / towerDim) + i] = newRect;
            } else {
                two.remove(newRect);
            }
        }
    }
    var placementPanel = two.makeGroup(placementTiles);
    two.update();
    for(var i = 0; i < placementTiles.length; i++) {
        if(placementTiles[i]) {
            placementTiles[i]._renderer.elem.onclick = onTileClick;
        }
    }

    tileLayer.add(placementPanel);
}

function placementUpdate(delta) {
    for(var i = 0; i < placementTiles.length; i++) {
        if(!placementTiles[i]) {
            continue;
        }
        if(state != 2) {
            placementTiles[i].opacity = .1;
        } else {
            placementTiles[i].opacity = .5;
        }
    }
    for(var i = 0; i < placementTiles.length; i++) {
        var tile = placementTiles[i];
        if(!tile) {
            continue;
        }
        if(tile.translation.x - towerDim/2 < mousePos.x && mousePos.x <= tile.translation.x + towerDim/2 &&
        tile.translation.y + towerDim/2 < mousePos.y && mousePos.y <= tile.translation.y + 3*towerDim/2) {
            placementTiles[i].fill = '#999999';
            selectedTile = placementTiles[i];
        } else {
            placementTiles[i].fill = '#c9c9c9';
        }
    }
}

function shopUpdate(delta) {
    if(state != 1) {
        shopGroup.visible = false;
    } else {
        shopGroup.visible = true;


        if(shopState == 0) {
            if(shopGroup.translation.y > 0) {
                shopGroup.translation.y -= 50;
            } else {
                shopState = 1;
            }
        } else if(shopState == 2) {
            if(shopGroup.translation.y < h) {
                shopGroup.translation.y += 50;
            } else {
                shopState = 0;
                state = 0;
            }
        } else if(shopState == 3) {
            if(shopGroup.translation.y < h) {
                shopGroup.translation.y += 50;
            } else {
                shopState = 0;
                state = 2;
            }
        }
    }

}
