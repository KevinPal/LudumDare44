class Tower {
	constructor(damage_radius, damage_value, fire_rate, tower_svg, projectile_svg, position) {
		this.damage_radius = damage_radius;
		this.damage_value = damage_value;
		this.fire_rate = fire_rate;
		this.tower_svg = tower_svg;
		this.projectile_svg = projectile_svg;
		this.position = position;
		this.draw = this.draw.bind(this);
		this.time = 0;
		//this.tower_group = two.interpret(this.tower_svg);
		var newRect = two.makeRectangle(0, 0, 100, 100);
		newRect.fill= '#00FFFF';
		this.tower_group = two.makeGroup(newRect);
		this.tower_group.translation = new Two.Vector(this.position.x, this.position.y);
		gameLayer.add(this.tower_group);
		this.projectiles = []
	}

	draw(enemies, deltaTime){
		this.time += deltaTime;
		if (this.time > this.fire_rate){
			for (var i = 0; i < enemies.length; i++) {
				var dx = enemies[i].position.x - this.position.x;
				var dy = enemies[i].position.y - this.position.y;
				var r = Math.sqrt(dx * dx + dy * dy);
				if (r <= this.damage_radius) {
					enemies[i].attack(this.damage_value);
					//var projectile = two.interpret(this.projectile_svg);
					//projectile.translation.copy(this.position);
					//this.projectiles.push(projectile)
					//projectile.trajectory = new Two.Vector(dx, dy)
					var angle = Math.atan2(dy,dx);
					var laser = two.makeRectangle(this.position.x + Math.cos(angle)*r/2, this.position.y + Math.sin(angle)*r/2, r , 10);
					laser.rotation = angle;
					gameLayer.add(laser);
					setTimeout( () => {gameLayer.remove(laser);}, 100);

				}

			}
			this.time -= this.fire_rate;
		}
	}

}
