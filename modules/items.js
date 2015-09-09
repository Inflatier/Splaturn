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
var config = require('../config.json');
var app;
var util;

function Items(instance) {
	app = instance;
	util = require('./utilities')(app);
	
	var items = {
		// locker 任意の部屋を一定時間(configで設定された値)操作不能にする
		'locker':
			new Item('locker',
				function (target) {
					var room = util.getRoom(target);
					var result = room.lock(config.items.locker.expire);
				}
			),
		
		// nullPeinter 任意の部屋の色を消す(none色にする)
		'nullPeinter':
			new Item('nullPeinter',
				function (target) {
					var room = util.getRoom(target);
					var result = room.turn(Colors.none);
				}
			),
		
		// jammer 任意の部屋にトラップを仕掛ける
		'jammer':
			new Item('jammer',
				function (target) {
					var room = util.getRoom(target);
					var result = room.setTrap();
				}
			)
			
	};
	return items;
}

module.exports = Items;