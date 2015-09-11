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
 *     トラップを仕掛ける部屋のID
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
		'rooms': rooms,
		'paint': paint,
		'locker': locker,
		'nullPeinter': nullPeinter,
		'trap': trap
	};
	return endpoints;
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
	
	var result = room.turnColor(color);
	res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
	res.write(JSON.stringify(result));
	res.end();
}

function locker(req, res) {
	var roomid = req.body.roomid;
	var item = res.app.locals.items['locker'];
	var result = item.use(roomid);
	res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
	res.write(JSON.stringify(result));
	res.end();
}

function nullPeinter(req, res) {
	var roomid = req.body.roomid;
	var item = res.app.locals.items['nullPeinter'];
	var result = item.use(roomid);
	res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
	res.write(JSON.stringify(result));
	res.end();
}

function trap(req, res) {
	var roomid = req.body.roomid;
	var item = res.app.locals.items['trap'];
	var result = item.use(roomid);
	res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
	res.write(JSON.stringify(result));
	res.end();
}

module.exports = Endpoints;