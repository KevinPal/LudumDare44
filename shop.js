var w = two.width;
var h = two.height;

var shopBG = two.makeRectangle(0, 0, w/2, h/2);
var tower1 = two.makeRectangle(-w/8, -h/8, w/6, h/6);
var tower2 = two.makeRectangle(w/8, -h/8, w/6, h/6);
var tower3 = two.makeRectangle(-w/8, h/8, w/6, h/6);
var tower4 = two.makeRectangle(w/8, h/8, w/6, h/6);
var shopGroupPanel = two.makeGroup(shopBG, tower1, tower2, tower3, tower4);
shopGroupPanel.translation = new Two.Vector(w/2, h/2);


var shopGroup = two.makeGroup(shopGroupPanel);
shopGroup.translation = new Two.Vector(0, h);

two.update();

tower1._renderer.elem.onclick = placeTowerWrapper(1);
tower2._renderer.elem.onclick = placeTowerWrapper(2);
tower3._renderer.elem.onclick = placeTowerWrapper(3);
tower4._renderer.elem.onclick = placeTowerWrapper(4);

function placeTowerWrapper(towerNum) {
    var tower = tower;
    foo =  function() {
        shopState = 3;
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
            console.log(selectedTile.translation);
            var placementPos = selectedTile.translation.clone();
            var tower = new Tower(500, 10, 1000, document.getElementById('tower'), document.getElementById('tower'), placementPos);
            towers.push(tower);
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
