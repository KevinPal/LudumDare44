var w = two.width;
var h = two.height;

var shopBG = two.makeRectangle(w/2, h/2, w/2, h/2);

var shopGroup = two.makeGroup(shopBG);
shopGroup.translation = new Two.Vector(0, h);

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
        } else if(shopState == 2) {
            if(shopGroup.translation.y < h) {
                shopGroup.translation.y += 50;
            } else {
                shopState = 0;
                state = 2;
            }
        }


    }

}
