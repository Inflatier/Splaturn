var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



// サーバー本体(expressのインスタンス)
var app = express();

// テンプレートエンジンの指定
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// express-sessionを使うために必要
app.use(cookieParser());

// req.session.XXXでセッションを確立できるようになるモジュール
app.use(session({
	key: 'Splaturn',
	secret: 'YSFH情報工学部',
	cookie: {
		path: '/',
		maxAge: 3600 * 1000
	}
}));

// POSTで受け取ったデータにreq.body.XXXでアクセスできるようになるモジュール
app.use(bodyParser.urlencoded({extended: true}));




// Colors列挙体
var Colors = require('./modules/colors');

// ゲームの残り時間
app.locals.left = 0;

// 全部屋の配列
app.locals.rooms = require('./modules/rooms');

// アイテムの配列
app.locals.items = require('./modules/items')(app);

// プレイヤーの配列
app.locals.players = [];

// ゲームコンフィグ
app.locals.config = require('./config.json');




// 設定画面を提供するルーター
var endpoints = require('./routes/endpoints')(app);

// APIのエンドポイントたち
app.get('/configure', endpoints.configure);
app.post('/entry', endpoints.entry);
app.get('/destroy', endpoints.destroy);
app.get('/rooms', endpoints.rooms);
app.post('/paint', endpoints.paint);


app.get('/', function index(req, res) {
	if (req.session.entried == true) res.redirect('/game');
	else res.render('index');
});

app.get('/game', function game(req, res) {
	res.send(JSON.stringify(req.session));
});

app.get('/paint', function paint(req, res) {
	res.render('paint');
});

// 静的なファイルを提供するモジュール
app.use(express.static(__dirname + '/public'));


// 接続を受け付ける
app.listen(14514);