class Enemy {
    update(deltaTime) {
        this.d += this.speed * (deltaTime / 1000);
        var currentRail = this.rails[this.currentRail]
        var currentRailLen = currentRail.length();
        if(this.d > currentRailLen) {
            console.log("Swapping rails");
            this.vecRailPos.add(this.vecRailPos, currentRail);
            this.d -= currentRailLen;
            this.currentRail += 1;
            currentRail = this.rails[this.currentRail]
            if(!currentRail) {
                this.destroy(this);
                return;
            }
        }

        var angle = Math.atan2(currentRail.y, currentRail.x);
        
        this.position = new Two.Vector(this.vecRailPos.x + this.d * Math.cos(angle), this.vecRailPos.y + this.d * Math.sin(angle));

        this.enemyGroup.translation.copy(this.position);
	
    }


    constructor(speed, spawn, rails, deathFunction, health, svg) {
        this.speed = speed;
        this.d = 0;
        this.enemyGroup = svg;
        gameLayer.add(this.enemyGroup);
        this.update = this.update.bind(this);
        this.destroy = deathFunction;

        this.position = spawn.clone();
        this.vecRailPos = spawn.clone();
        this.currentRail = 0;
        this.rails = rails;

        this.health = health;
    }


    attack(damage) {
	    this.health -= damage;
	    if (this.health <= 0) {
            gameLayer.remove(this.enemyGroup);
            this.destroy(this);
	    }
    }

}
