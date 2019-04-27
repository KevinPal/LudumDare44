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
