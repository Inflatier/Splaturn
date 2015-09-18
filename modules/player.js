function Player(id, name, color) {
	this.name = name;
	this.id = id;
	this.items = ["trap","nullPeinter","locker"];
	this.color = color;
	this.paintedRooms = [];
	this.notifications = [];
}

module.exports = Player;