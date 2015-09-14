/**
 * utilities.js
 * サーバーでよく使う関数をまとめた汎用モジュール。
 * 
 * 引数:
 *   instance expressのインスタンス
 * 
 * 関数:
 *   getRoom(roomId) 与えられたidに対応する部屋のオブジェクトを返す
 *   getItem(itemId) 与えられた名前に対応するアイテムのオブジェクトを返す
 */

var app;

function Utilities(instance) {
	app = instance;
	var utilities = {
		'getRoom': getRoom,
		'getItem': getItem,
		'getPlayer': getPlayer
	}
	return utilities;
};

function getRoom(roomId) {
	var rooms = app.locals.rooms;
	for (var i = 0; i < rooms.length; i++) {
		var room = rooms[i];
		if (room.id == roomId) return room;
	}
}

function getItem(itemHash) {
	var item = app.locals.items[itemHash];
	if (!item) throw Error('アイテムの名前が間違っていますね〜');
	return item;
}

function getPlayer(playerid) {
	for (var i = 0; i < app.locals.players.length; i++) {
		if (app.locals.players[i].id == playerid) {
			return app.locals.players[i];
		}
	}
}

module.exports = Utilities;