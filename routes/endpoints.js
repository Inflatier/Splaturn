/**
 * endpoints.js
 * ゲームの情報をクライアントとやり取りしたり、ゲームを操作したりするAPI
 * 
 * configure [GET /configure]
 *   ゲームの設定画面を表示する。
 * 
 * entry [POST /entry]
 *   参加者としてエントリーする。
 *   パラメータ:
 *     playername プレイヤーの名前
 *     color プレイヤーの所属する色。Colorsオブジェクトから選んで、どうぞ。
 * 
 * destroy [GET /destroy]
 *   セッションを破棄する。ゲームが終了したら破棄してあげて。
 * 
 * rooms [GET /rooms]
 *   全部屋の情報を表すJSONを返す。Roomオブジェクトの配列をJSONにシリアライズしたもの。
 * 
 * paint [POST /paint]
 *   任意の部屋をクライアントの色で染色する。色はセッションに保持されたものを使うので指定する必要はない。
 *   パラメータ:
 *     roomid 部屋のID
 * 
 */


// Playerクラス
var Player = require('../modules/player');
var app = {};
var util = {};

function Endpoints(instance) {
	app = instance;
	util = require('../modules/utilities')(app);
	var endpoints = {
		'configure': configure,
		'entry': entry,
		'destroy': destroy,
		'rooms': rooms,
		'paint': paint
	};
	return endpoints;
}

function configure(req, res) {
	res.render('configure', {config: res.app.locals.config});
};

function entry(req, res) {
	if (req.session.entried == true) {
		// 既にエントリー済みだった場合はgameにリダイレクト
		res.redirect('/game');
		return;
	}
	
	// エントリーが済んでいない場合はエントリー
	var name = req.body.playername;
	var color = req.body.color;
	var player = new Player(name, color);
	
	res.app.locals.players.push(player);
	req.session.playername = name;
	req.session.color = color;
	// ユーザーをエントリー済みに
	req.session.entried = true;
	
	res.redirect('/game');
}

function destroy(req, res) {
	req.session.destroy();
	res.redirect('/');
	console.log(res.app.locals.players);
}

function rooms(req, res) {
	res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
	 res.write(JSON.stringify(res.app.locals.rooms));
	 res.end();
}

function paint(req, res) {
	var roomid = req.body.roomid;
	var room = util.getRoom(roomid);
	var color = req.session.color;
	
	// 染色
	room.color = color;
}

function takeItem(req, res) {
	var itemId = req.body.itemId;
}

function use(req, res) {
	var item = req.body.item;
}

module.exports = Endpoints;