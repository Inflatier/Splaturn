function Player(name, color) {
	this.name = name;
	this.id = 0;
	this.items = [];
	this.color = color;
	this.paintedRooms = [];
}

module.exports = Player;