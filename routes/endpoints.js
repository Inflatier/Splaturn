// Playerクラス
var Player = require('../modules/player');

function index(req, res) {
	if (req.session.entried == true) {
		res.redirect('/game');
	} else {
		res.redirect('/entry');
	}
}

function configure(req, res) {
	res.render('configure', {config: res.app.locals.config});
};

function entry(req, res) {
	if (req.session.entried == true) {
		// 既にエントリー済みだった場合はgameにリダイレクト
		res.redirect('/game');
	} else {	
		// エントリーが済んでいない場合はエントリー
		var name = req.body.playername;
		var color = req.body.color;
		var player = new Player(name, color);
		res.app.locals.players.push(player);
		req.session.entried = true;
		console.log(res.app.locals.players);
		res.redirect('/game');
	}
}

function rooms(req, res) {
	res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
	 res.write(JSON.stringify(res.app.locals.rooms));
	 res.end();	
}

function destroy(req, res) {
	req.session.destroy();
	res.redirect('/');
	console.log(res.app.locals.players);
}

module.exports = {
	'configure': configure,
	'index': index,
	'entry': entry,
	'rooms': rooms,
	'destroy': destroy
};