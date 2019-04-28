class Enemy {
    update(deltaTime) {
        this.d += this.speed * (deltaTime / 1000);
        var currentRail = this.rails[this.currentRail]
        var currentRailLen = currentRail.length();
        if(this.d > currentRailLen) {
            this.vecRailPos.add(this.vecRailPos, currentRail);
            this.d -= currentRailLen;
            this.currentRail += 1;
            currentRail = this.rails[this.currentRail]
            if(!currentRail) {
            	gameLayer.remove(this.enemyGroup);
                this.destroy(this);
                this.attack_player();
                return;
            }
        }

        var angle = Math.atan2(currentRail.y, currentRail.x);
        
        this.position = new Two.Vector(this.vecRailPos.x + this.d * Math.cos(angle), this.vecRailPos.y + this.d * Math.sin(angle));

        this.enemyGroup.translation.copy(this.position);
    }
	



    constructor(speed, spawn, rails, deathFunction, health, attack, svg) {
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
	    this.attack = attack;
    }


    attack(damage) {
	    this.health -= damage;
	    if (this.health <= 0) {
            gameLayer.remove(this.enemyGroup);
            this.destroy(this);
	    }
    }

	attack_player() {
		// if the player_was at max health before, reset the regen_time
		if (player_health == player_max_health) {
			regen_time = 0;
		}
		player_health -= this.attack;
		player_currency += this.attack;
	}

}
