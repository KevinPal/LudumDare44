class Tower {
	constructor(damage_radius, damage_value, fire_rate, tower_svg, type, position) {
		this.damage_radius = damage_radius;
        this.type = type;
		this.damage_value = damage_value;
		this.fire_rate = fire_rate;
		this.tower_svg = tower_svg;
		this.position = position;
		this.draw = this.draw.bind(this);
        this.turretType1Fire = this.turretType1Fire.bind(this);
        this.turretType2Fire = this.turretType2Fire.bind(this);
        this.turretType3Fire = this.turretType3Fire.bind(this);
		this.time = 0;
		//var newRect = two.makeRectangle(0, 0, 100, 100);
		//newRect.fill= '#00FFFF';
		//this.tower_group = two.makeGroup(newRect);
		this.tower_group = two.interpret(this.tower_svg);
        this.tower_group.corner();
        gameLayer.add(this.tower_group);
		this.tower_group.translation = new Two.Vector(position.x-50, position.y-50);
		this.projectiles = []
	}

	draw(enemies, deltaTime){
		this.time += deltaTime;
		if (this.time > this.fire_rate){

            if(this.type == 1) {
                this.turretType1Fire(enemies);
            } else if(this.type == 2) {
                this.turretType2Fire(enemies);
            } else if(this.type == 3) {
                this.turretType3Fire(enemies);
            }
        }
	}



    turretType1Fire(enemies) {

        var enemy;
        var longestPathLen = 0;
        for (var i = 0; i < enemies.length; i++) {
            var dx = enemies[i].position.x - this.position.x;
            var dy = enemies[i].position.y - this.position.y;
            var r = Math.sqrt(dx * dx + dy * dy);
            if (r <= this.damage_radius) {

                var pathLen = enemies[i].currentRail * this.damage_radius * 2 + enemies[i].d;
                if(pathLen > longestPathLen) {
                    enemy = enemies[i];
                    longestPathLen = pathLen;
                }

            }
        }
        if(enemy) {

            var dmg_sound = new Audio('./res/shoot.mp3');
            dmg_sound.play();
            var dx = enemy.position.x - this.position.x;
            var dy = enemy.position.y - this.position.y;

            enemy.attack(this.damage_value);
            var angle = Math.atan2(dy,dx);
            var laser = two.makeRectangle(this.position.x + Math.cos(angle)*r/2, this.position.y + Math.sin(angle)*r/2, r , 10);
			laser.fill = "#FF0000";
            laser.rotation = angle;
			laser.noStroke()
            gameLayer.add(laser);
            

            setTimeout( () => {
                gameLayer.remove(laser);
            }, 100/gameSpeed);
            this.time = 0;
        }
    }

    turretType2Fire(enemies) {
        var lasers = []
        for (var i = 0; i < enemies.length; i++) {
            var dx = enemies[i].position.x - this.position.x;
            var dy = enemies[i].position.y - this.position.y;
            var r = Math.sqrt(dx * dx + dy * dy);
            if (r <= this.damage_radius) {

                var dmg_sound = new Audio('./res/shoot.mp3');
                dmg_sound.play();
                enemies[i].attack(this.damage_value);
                var angle = Math.atan2(dy,dx);
                var laser = two.makeRectangle(this.position.x + Math.cos(angle)*r/2, this.position.y + Math.sin(angle)*r/2, r , 10);
                laser.rotation = angle;
                gameLayer.add(laser);
                lasers.push(laser)
            }

        }
        setTimeout( () => {
            for (var i = 0; i < lasers.length; i++) {
                gameLayer.remove(lasers[i]);
            }
        }, 100/gameSpeed);
        this.time -= this.fire_rate;
    }


    turretType3Fire(enemies) {
        var lasers = [];
        var affected = [];
        for (var i = 0; i < enemies.length; i++) {
            var dx = enemies[i].position.x - this.position.x;
            var dy = enemies[i].position.y - this.position.y;
            var r = Math.sqrt(dx * dx + dy * dy);
            if (r <= this.damage_radius) {
                var dmg_sound = new Audio('./res/shoot.mp3');
                dmg_sound.play();

                enemies[i].speed /= 2;
                affected.push(enemies[i]);
                var angle = Math.atan2(dy,dx);
                var laser = two.makeRectangle(this.position.x + Math.cos(angle)*r/2, this.position.y + Math.sin(angle)*r/2, r , 10);
                laser.rotation = angle;
                gameLayer.add(laser);
                lasers.push(laser)
            }

        }

        setTimeout( () => {
            for (var i = 0; i < affected.length; i++) {
                affected[i].speed *= 2;
            }
        }, this.fire_rate/2/gameSpeed);

        setTimeout( () => {
            for (var i = 0; i < lasers.length; i++) {
                gameLayer.remove(lasers[i]);
            }
        }, 100/gameSpeed);
        this.time -= this.fire_rate;
    }

}
