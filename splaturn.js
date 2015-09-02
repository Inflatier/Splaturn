var express = require('express');
var session = require('express-session');

var Colors = require('./modules/colors');

var app = express();

app.get('');

app.use(session);
app.use(express.static(__dirname + '/public'));

var rooms = [];
var items = [];
var players = [];

(function initialize() {
	
})();



app.listen(14514);