var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var Colors = require('./modules/colors');
var Player = require('./modules/player');

var app = express();

app.use(cookieParser());
app.use(session({secret: 'YSFH情報工学部'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.locals.rooms = [];
app.locals.items = [];
app.locals.players = [];

app.post('/configure', function gameConfiguration(req, res) {
	
});

app.post('/entry', function entryUser(req, res) {
	var name = req.body.playername;
	var color = req.body.color;
	
	console.log(req.body);
	res.end(name + '\n' + color);
	
	var player = new Player(name, color);
	res.app.locals.players.push(player);
});

app.get('/rooms', function provideRooms(req, res) {
	 res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
	 res.write(JSON.stringify(rooms));
	 res.end();
});

app.post('/start', function gameStart(req, res) {
});


app.listen(14514);