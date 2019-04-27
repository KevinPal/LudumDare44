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
		this.tower_group = two.interpret(this.tower_svg);
		this.tower_group.translation.copy(this.position);
		this.projectiles = []
	}

	draw(enemies, deltaTime){
		this.time += deltaTime;
		if (this.time > this.fire_rate){
			for (var i = 0; i < enemies.length; i++) {
				var dx = enemies[i].position.x - this.position.x;
				var dy = enemies[i].position.y - this.position.y;
				var r = Math.sqrt(dx * dx + dy * dy);
				console.log("distance: " + r);
				if (r <= this.damage_radius) {
					enemies[i].attack(this.damage_value);
					var projectile = two.interpret(this.projectile_svg);
					projectile.translation.copy(this.position);
					this.projectiles.push(projectile)
					projectile.trajectory = new Two.Vector(dx, dy)
					var laser = two.makeRectangle(this.position.x, this.position.y, 2 * Math.sqrt(dx*dx + dy*dy), 10);
					laser.rotation = Math.atan(dy/dx);
					setTimeout( () => {two.remove(laser)}, 100);
				}

			}
			this.time -= this.fire_rate;
		}
	}

}
