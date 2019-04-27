enemyUpdate = (deltaTime) => {


    this.d += this.speed * deltaTime;

    var currentRail = this.rails[this.currentRail]
    var currentRailLen = currentRail.length();
    if(this.d > currentRailLen) {
        this.d -= currentRailLen;
        this.currentRail += 1;
        currentRail = this.rails[this.currentRail]
        if(!currentRail) {
            this.destroy(this);
        }
    }

    var angle = Math.atan2(currentRail.y, currentRail.x);
    this.position.add(this.vecRailPos, new Two.Vector(this.d * Math.cos(angle), this.d * Math.sin(angle)));


    this.twoObject.translation.copy(this.position);
}


function Enemy(speed, spawn, rails, deathFunction, twoObject) {
    this.speed = speed;
    this.d = 0;
    this.two = twoInstance;
    this.update = enemyUpdate;
    this.destroy = deathFunction;

    this.position = spawn;
    this.vecRailPos = spawn;
    this.currentRail = 0;
    this.rails = rails;
}
