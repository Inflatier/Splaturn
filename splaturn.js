var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var port = process.env.PORT || 1337;

var app = express();

app.use(cookieParser());
app.use(session({secret: 'YSFH情報工学部'}));
app.use(express.static(__dirname + '/public'));

(function initializeRooms() {
	
})();

app.get('/', function (req, res) {
	res.end('Hello World');
});

app.listen(port);