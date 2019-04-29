class Enemy {
    update(deltaTime) {

        var healthColor = HSVtoRGB(this.health/10, 1, 1);
        this.enemyGroup.fill = 'rgb(' + healthColor.r + ', ' + healthColor.g + ', ' + healthColor.b + ')';

        this.d += this.speed * (deltaTime / 1000);
        var currentRail = this.rails[this.currentRail]
        var currentRailLen = currentRail.length();
        if(this.d > currentRailLen) {
            this.vecRailPos.add(this.vecRailPos, currentRail);
            this.d -= currentRailLen;
            this.currentRail += 1;
            currentRail = this.rails[this.currentRail]
            if(!currentRail) {
                var dmg_sound = new Audio('./res/dmg_sound.mp3');
                dmg_sound.play();
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
	



    constructor(speed, spawn, rails, deathFunction, health, attack_value, svg) {
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
	    this.attack_value = attack_value;
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
		player_health -= this.attack_value;
		player_currency += this.attack_value;
		if (player_health <= 0) {
			console.log("You Lose!");
			window.alert("You Lose!");
			window.location.replace("./index.html");
		}
	}

}
