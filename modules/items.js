/**
 * items.js
 * アイテムオブジェクトを生成してそれらの配列を返す
 * 
 * 引数:
 *   instance expressのインスタンス。appのことね。
 *     アイテムはゲームの内部をいじるのでサーバー本体にアクセスする必要があるのだ。
 * 
 */

var Item = require('./item');
var Colors = require('./colors');
var Result = require('./result')
var config = require('../config.json');
var Event = require('../modules/event');
var Events = require('../modules/events');
var app;
var util;

var SUCCESS = 1;
var FAILURE = -1;

function Items(instance) {
	app = instance;
	util = require('./utilities')(app);
	
	var items = {
		// locker 任意の部屋を一定時間(configで設定された値)操作不能にする
		'locker':
			new Item('locker',
				function (target, playerid) {
					var room = util.getRoom(target);
					var player = util.getPlayer(playerid);
					if (!room) return new Result(FAILURE, "そんな部屋はないです。");
					if (room.isLocked()) {
						return new Result(FAILURE, room.name + 'にはロックを掛けることができない!この部屋には既にロックがかかっているようだ。');
					}
					
					// アイテム一覧から削除
					player.items.splice(player.items.indexOf('locker'), 1);
					room.lockExpire = config.items.locker.expire;
					util.broadcast(new Event(Events.locked, parseInt(playerid), parseInt(target), player.name + 'が' + room.name + 'に' + parseInt(room.lockExpire / 1000) + '秒間のロックを掛けた。'));
					return new Result(SUCCESS, room.name + 'に' + parseInt(room.lockExpire / 1000) + '秒間のロックを掛けた。');
				}
			),
		
		// nullPeinter 任意の部屋の色を消す(none色にする)
		'nullPeinter':
			new Item('nullPeinter',
				function (target, playerid) {
					var room = util.getRoom(target);
					var player = util.getPlayer(playerid);
					if (!room) return new Result(FAILURE, "そんな部屋はないです。");
					if (room.isLocked()) {
						return new Result(FAILURE, room.name + 'の色を消すことができない!この部屋にはロックがかかっているようだ。'); 
					}
					
					// アイテム一覧から削除
					player.items.splice(player.items.indexOf('nullPeinter'), 1);
					room.color = Colors.none;
					util.broadcast(new Event(Events.unpeinted, parseInt(playerid), parseInt(target), player.name + 'が' + room.name + 'の色を消した!'));
					return new Result(SUCCESS, room.name + 'の色を消した!');
				}
			),
		
		// jammer 任意の部屋にトラップを仕掛ける
		'trap':
			new Item('trap',
				function (target, playerid) {
					var room = util.getRoom(target);
					var player = util.getPlayer(playerid);
					if (!room) return new Result(FAILURE, "そんな部屋はないです。");
					if (room.isLocked()) {
						return new Result(FAILURE, room.name + 'にトラップを仕掛けることができない!この部屋はロックがかかっているようだ。');
					}
					
					// アイテム一覧から削除
					player.items.splice(player.items.indexOf('trap'), 1);
					room.isTrapped = true;
					util.broadcast(new Event(Events.trapped, playerid, target, player.name + 'がどこかにトラップを仕掛けた!'));
					return new Result(SUCCESS, room.name + 'にトラップを仕掛けた!');
				}
			)
			
	};
	return items;
}

module.exports = Items;