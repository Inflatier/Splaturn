/**
 * entry.js
 * ゲーム開始・終了のためのルーター。
 * AJAXじゃなくて普通にアクセスしてくださいね。
 * 
 * entry [GET /entry]
 * エントリー画面(名前入力, 色指定など)を返す。
 * (サーバーはpublic/entry.htmlを返すだけなのでpublicにentry.htmlを入れましょう)
 * 
 * join [POST /join]
 *   参加者としてエントリーする。
 *   (エントリーが完了すると/gameに自動的にリダイレクトされる。)
 *   パラメータ:
 *     playername プレイヤーの名前
 *     color プレイヤーの所属する色。Colorsオブジェクトから選んで、どうぞ。
 * 
 * game [GET /game]
 *   ゲーム画面を返す。(public/game.html)
 * 
 * quit [GET /destroy]
 *   セッションを破棄する。ゲームが終了したら破棄してあげて。
 * 
 */


var Player = require('../modules/player');

var unique_id = 931;

function join(req, res) {
	if (req.session.entried == true) {
		// 既にエントリー済みだった場合はgameにリダイレクト
		res.redirect('/game');
		return;
	}
	
	unique_id += 810
	
	// エントリーが済んでいない場合はエントリー
	var name = req.body.playername;
	var color = req.body.color;
	var player = new Player(unique_id, name, color);
	
	res.app.locals.players.push(player);
	req.session.playername = name;
	req.session.color = color;
	req.session.playerid = unique_id;
	
	// ユーザーをエントリー済みに
	req.session.entried = true;
	
	res.redirect('/game');
}

function quit(req, res) {
	req.session.destroy();
	res.redirect('/');
	console.log(res.app.locals.players);
}

var endpoints = {
	'join': join,
	'quit': quit
};
	
module.exports = endpoints;