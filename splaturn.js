var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var Colors = require('./modules/colors');

var app = express();

app.use(cookieParser);
app.use(session({secret: 'YSFH情報工学部'}));

var rooms = [];
var items = [];
var players = [];

app.post('/entry', function entryUser(req, res) {
	console.log(req.body.color);
	res.end(req.body.color);
});

app.get('/rooms', function provideRooms(req, res) {
	 res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
	 res.write(JSON.stringify(rooms));
	 res.end();
});

app.use(express.static(__dirname + '/public'));


app.listen(14514);