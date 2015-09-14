/**
 * endpoints.js
 * ゲームの情報をクライアントとやり取りしたり、ゲームを操作したりするAPI
 * 
 * rooms [GET /rooms]
 *   全部屋の情報を表すJSONを返す。Roomオブジェクトの配列をJSONにシリアライズしたもの。
 * 
 * paint [POST /paint]
 *   任意の部屋をクライアントの色で染色し、Resultオブジェクトを返す。色はセッションに保持されたものを使うので指定する必要はない。
 *   パラメータ:
 *     roomid 塗る部屋のID
 * 
 * locker [POST /locker]
 *   任意の部屋にロックをかける。ロックの秒数はconfigにて指定。
 *   パラメータ:
 *     roomid ロックをかける部屋のID
 * 
 * nullPeinter [POST /nullPeinter]
 *   任意の部屋の色を消す。
 *   パラメータ:
 *     roomid 色を消す部屋のID
 * 
 * trap [POST /trap]
 *   任意の部屋にトラップを仕掛ける
 *   パラメータ:
 *     roomid トラップを仕掛ける部屋のID
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
		'myid': myid,
		'notifications': notifications,
		'myname': myname,
		'mycolor': mycolor,
		'state': state,
		'left': left,
		'rooms': rooms,
		'paint': paint,
		'locker': locker,
		'nullPeinter': nullPeinter,
		'trap': trap
	};
	return endpoints;
}

function respondJSON(res, json) {
	res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
	res.write(json.toString());
	res.end();
}

function notifications(req, res) {
	var player = util.getPlayer(req.session.playerid);
	if (player.notifications.length >= 1) {
		respondJSON(res, JSON.stringify(player.notifications[0]));
		player.notifications.unshift();
	} else {
		respondJSON(res, '{}');
	}
}

function myid(req, res) {
	respondJSON(res, req.session.playerid);
}

function myname(req, res) {
	respondJSON(res, req.session.playername);
}

function mycolor(req, res) {
	respondJSON(res, req.session.color);
}

function state(req, res) {
	respondJSON(res, res.app.locals.state.toString());
}

function left(req, res) {
	respondJSON(res, res.app.locals.left.toString());
}

function rooms(req, res) {
	respondJSON(res, JSON.stringify(res.app.locals.rooms));
}

function paint(req, res) {
	var roomid = req.body.roomid;
	var room = util.getRoom(roomid);
	var color = req.session.color;
	
	var result = room.turnColor(color);
	respondJSON(res, JSON.stringify(result));
}

function locker(req, res) {
	var roomid = req.body.roomid;
	var item = res.app.locals.items['locker'];
	var result = item.use(roomid);
	respondJSON(res, JSON.stringify(result));
}

function nullPeinter(req, res) {
	var roomid = req.body.roomid;
	var item = res.app.locals.items['nullPeinter'];
	var result = item.use(roomid);
	respondJSON(res, JSON.stringify(result));
}

function trap(req, res) {
	var roomid = req.body.roomid;
	var item = res.app.locals.items['trap'];
	var result = item.use(roomid);
	respondJSON(res, JSON.stringify(result));
}

module.exports = Endpoints;