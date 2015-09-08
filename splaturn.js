var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 設定画面を提供するルーター
var endpoints = require('./routes/endpoints');

// Colors列挙体
var Colors = require('./modules/colors');




// サーバー本体(expressのインスタンス)
var app = express();

// テンプレートエンジンの指定
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// express-sessionを使うために必要
app.use(cookieParser());

// req.session.XXXでセッションを確立
app.use(session({secret: 'YSFH情報工学部'}));

// POSTで受け取ったデータにreq.body.XXXでアクセスできるようになるモジュール
app.use(bodyParser.urlencoded({extended: true}));

// 静的なファイルを提供するモジュール
app.use(express.static(__dirname + '/public'));




// ゲームの残り時間
app.locals.left = 0;

// 全部屋のオブジェクトの配列
app.locals.rooms = [];

// プレイヤーオブジェクトの配列
app.locals.players = [];

// ゲームコンフィグ
app.locals.config = {
	// 残り時間(ms)
	left: 10 * 60 * 1000
};


// GET, POSTされたときのルーティング
app.get('/', endpoints.index);
app.get('/configure', endpoints.configure);
app.post('/entry', endpoints.entry);
app.get('/rooms', endpoints.rooms);
app.get('/destroy', endpoints.destroy);

app.get('/game', function (req, res) {
	res.send(JSON.stringify(req.session));
});


// 接続を受け付ける
app.listen(14514);