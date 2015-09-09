/**
 * room.js
 * 部屋のクラス
 * 
 * 引数
 *     id (int) その部屋の一意なID。マップのSVGのIDと対応する。
 *     name (String) その部屋の名称。
 *     color (Color) その部屋の初期の色。Color列挙体の色を指定。
 * 
 * プロパティ
 *     id (int) その部屋の一意なID。マップのSVGのIDと対応する。
 *     name (String) その部屋の名称。
 *     lockExpiration (int) その部屋のロックの有効期限。ミリ秒表記。0のときロックは解除された状態。
 *     color (Color) その部屋の色。Color列挙体の色を指定。
 *     isTrapped (boolean) その部屋にトラップが仕掛けられている(true)か否(false)か。
 * 
 */
 
 function Room(id, name, color) {
	 this.id = id;
	 this.name = name;
	 this.lockExpire = 0;
	 this.color = color;
	 this.isTrapped = false;
 }
 Room.prototype.isLocked = function () {
	if (this.lockExpire > 0)
		return true;
	else
		return false; 
 };
 Room.prototype.lock = function (expire) {
	 if (!this.isLocked) {
		 this.lockExpire = expire;
	 } else {
		 
	 }
 };
 Room.prototype.turnColor = function (color) {
	 if (!this.isLocked) {
		 this.color = color;
	 } else {
		 
	 }
 };
 Room.prototype.setTrap = function () {
	 if (!this.isLocked) {
		 this.isTrapped = true;
	 } else {
		 
	 }
 };
 
 module.exports = Room;