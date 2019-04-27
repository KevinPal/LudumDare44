class Enemy {

    update(deltaTime) {
        this.d += this.speed * (deltaTime / 1000);
        console.log(this);
        var currentRail = this.rails[this.currentRail]
        var currentRailLen = currentRail.length();
        if(this.d > currentRailLen) {
            console.log("Swapping rails");
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


    constructor(speed, spawn, rails, deathFunction, twoObject) {
        this.speed = speed;
        this.d = 0;
        this.twoObject = twoObject;
        this.update = this.update.bind(this);
        this.destroy = deathFunction;

        this.position = spawn;
        this.vecRailPos = spawn;
        this.currentRail = 0;
        this.rails = rails;
    }

}