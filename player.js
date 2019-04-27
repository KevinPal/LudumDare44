class Player {
	constructor(initHealth) {
		this.health = initHeath;
		this.setHealth = this.setHealth.bind(this)
		this.getHealth = this.getHealth.bind(this)
	}

	setHealth(health) {
		this.health = health;
	}

	getHealth() {
		return this.health
	}
}
