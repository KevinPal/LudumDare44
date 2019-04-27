class Tower {
	constructor(damage_radius, damage_value, fire_rate, tower_svg, projectile_svg, position) {
		this.damage_radius = damage_radius;
		this.damage_value = damage_value;
		this.fire_rate = fire_rate;
		this.tower_svg = tower_svg;
		this.projectile_svg = projectile_svg;
		this.position = position;
		this.draw = this.draw.bind(this);
	}

	draw(enemies){
		for (var i = 0; i < enemies.length; i++) {
			dx = this.position.x - enemies[i].x;
			dy = this.position.y - enemies[i].y;
			r = Math.sqrt(dx * dx + dy * dy);
			if (r <= this.damage_radius) {
				enemies[i].die();
			}
		}
	}
	
}
