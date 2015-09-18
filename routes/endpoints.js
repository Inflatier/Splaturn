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
var Event = require('../modules/event');
var Events = require('../modules/events');
var Colors = require('../modules/colors');
var app = {};
var util = {};

function Endpoints(instance) {
	app = instance;
	util = require('../modules/utilities')(app);
	var endpoints = {
		'myitems': myitems,
		'getitem': getItem,
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
	res.write(json);
	res.end();
}

function notifications(req, res) {
	var player = util.getPlayer(req.session.playerid);
	respondJSON(res, JSON.stringify(player.notifications));
	player.notifications = [];
}

function myitems(req, res) {
	var playerid = req.session.playerid;
	var player = util.getPlayer(parseInt(playerid));
	respondJSON(res, JSON.stringify(player.items));
}

function getItem(req, res) {
	var playerid = req.session.playerid;
	var itemname = req.body.itemname;
	var player = util.getPlayer(parseInt(playerid));
	// 追加して重複は削除
	player.items.push(itemname);
	player.items = player.items.filter(function (x, i, self) {
            return self.indexOf(x) === i;
        });
	
	respondJSON(res, JSON.stringify( {code: 1, message: itemname + "を手に入れた!" } ));
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
	var roomid = parseInt(req.body.roomid);
	var room = util.getRoom(roomid);
	var playerid = parseInt(req.session.playerid);
	var player = util.getPlayer(playerid);
	var color = parseInt(req.session.color);
	var colorString = (function () {
		switch (color) {
			case Colors.red:
				return '赤色';
			case Colors.blue:
				return '青色';
			default:
				return '無色';
		}
	})();
	
	var result = room.turnColor(color);
	if (result.code >= 1) {
		util.broadcast(new Event(Events.painted, playerid, roomid, player.name + 'が' + room.name + 'を' + colorString + 'に塗り替えた!'));
	}
	respondJSON(res, JSON.stringify(result));
	console.log(result);
}

function locker(req, res) {
	var roomid = req.body.roomid;
	var playerid = req.session.playerid;
	var item = res.app.locals.items['locker'];
	var result = item.use(parseInt(roomid), parseInt(playerid));
	respondJSON(res, JSON.stringify(result));
	console.log(result);
}

function nullPeinter(req, res) {
	var roomid = req.body.roomid;
	var playerid = req.session.playerid;
	var item = res.app.locals.items['nullPeinter'];
	var result = item.use(parseInt(roomid), parseInt(playerid));
	respondJSON(res, JSON.stringify(result));
	console.log(result);
}

function trap(req, res) {
	var roomid = req.body.roomid;
	var playerid = req.session.playerid;
	var item = res.app.locals.items['trap'];
	var result = item.use(parseInt(roomid), parseInt(playerid));
	respondJSON(res, JSON.stringify(result));
	console.log(result);
}

module.exports = Endpoints;