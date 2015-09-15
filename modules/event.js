function Event(event, emitter, target, message) {
	this.event = event;
	this.emitter = emitter;
	this.target = target;
	this.message = message;
}

module.exports = Event;