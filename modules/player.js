function Player(id, name, color) {
	this.name = name;
	this.id = id;
	this.items = ["色消し"];
	this.color = color;
	this.paintedRooms = [];
	this.notifications = [];
}

module.exports = Player;