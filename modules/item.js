 /**
  * item.js
  * 名前と動作を設定されたアイテムのクラス
  * 
  * 引数
  *   name (string) アイテムの名前。
  *   action (function) アイテムの動作。
  */
 
 function Item(name, action) {
	 this.name = name;
	 this.use = action;
 }
 
 module.exports = Item;