
function lineIntersectsRect(lineStart, lineEnd, rect) {
    var x = rect.translation.x;
    var y = rect.translation.y;
    var topLeft =  new Two.Vector(x - rect.width/2, y - rect.height/2);
    var topRight = new Two.Vector(x + rect.width/2, y - rect.height/2);
    var botLeft =  new Two.Vector(x - rect.width/2, y + rect.height/2);
    var botRight = new Two.Vector(x + rect.width/2, y + rect.height/2);

    return lineIntersectsLine(lineStart, lineEnd, topLeft, topRight) ||
        lineIntersectsLine(lineStart, lineEnd, topRight, botRight) ||
        lineIntersectsLine(lineStart, lineEnd, botRight, botLeft) ||
        lineIntersectsLine(lineStart, lineEnd, botLeft, topLeft);

}

function lineIntersectsLine(a1, a2, b1, b2) {

    var b = new Two.Vector(a2.x - a1.x, a2.y - a1.y);
    var d = new Two.Vector(b2.x - b1.x, b2.y - b1.y);
    var bDotDPerp = b.x * d.y - b.y * d.x;

    if (bDotDPerp == 0) {
        return false;
    }
    

    var c = new Two.Vector(b1.x - a1.x, b1.y - a1.y);
    var t = (c.x * d.y - c.y * d.x) / bDotDPerp;
    if (t < 0 || t > 1) {
        return false;
    }

    var u = (c.x * b.y - c.y * b.x) / bDotDPerp;
    if (u < 0 || u > 1) {
        return false;
    }

    return true;
}
