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
				function (target) {
					var room = util.getRoom(target);
					if (room.isLocked()) {
						return new Result(FAILURE, room.name + 'にはロックを掛けることができない!この部屋には既にロックがかかっているようだ。');
					}
					
					room.lockExpire = config.items.locker.expire;
					return new Result(SUCCESS, room.name + 'に' + parseInt(room.lockExpire / 1000) + '秒間のロックを掛けた。');
				}
			),
		
		// nullPeinter 任意の部屋の色を消す(none色にする)
		'nullPeinter':
			new Item('nullPeinter',
				function (target) {
					var room = util.getRoom(target);
					if (room.isLocked()) {
						return new Result(FAILURE, room.name + 'の色を消すことができない!この部屋にはロックがかかっているようだ。'); 
					}
					
					room.color = Colors.none;
					return new Result(SUCCESS, room.name + 'の色を消した!');
				}
			),
		
		// jammer 任意の部屋にトラップを仕掛ける
		'trap':
			new Item('trap',
				function (target) {
					var room = util.getRoom(target);
					if (room.isLocked()) {
						return new Result(FAILURE, room.name + 'にトラップを仕掛けることができない!この部屋はロックがかかっているようだ。');
					}
					
					room.isTrapped = true;
					return new Result(SUCCESS, room.name + 'にトラップを仕掛けた!');
				}
			)
			
	};
	return items;
}

module.exports = Items;