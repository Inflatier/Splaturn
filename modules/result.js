function Result(code, description) {
	this.code = code;
	this.description = description;
}
	
var SUCCESS = 1;
var FAILURE = -1;

module.exports = Result;