function Result(code, message) {
	this.code = code;
	this.message = message;
}
	
var SUCCESS = 1;
var FAILURE = -1;

module.exports = Result;