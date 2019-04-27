var keys = [];
var mousePos = new Two.Vector(0, 0);
var mouseDelta = new Two.Vector(0, 0);

var panSpeed = new Two.Vector(0, 0);

function mouse(e) {
    var currentMouse = new Two.Vector(e.screenX, e.screenY);
    mouseDelta.sub(currentMouse, mousePos);
    if(Math.abs(mouseDelta.x) <= 1 && Math.abs(mouseDelta.y) <=1) {
        mouseDelta.clear();
    }
    console.log(mouseDelta);
    mousePos.copy(currentMouse);
}
document.onmousemove = mouse;

document.onmouseenter = e => mouse(e);
document.onkeydown = e => keys[e.key] = true;
document.onkeyup = e => keys[e.key] = false;
