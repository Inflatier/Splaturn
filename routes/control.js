/**
 * control.js
 * ゲームの開始・終了の管理と途中経過の監視用API
 * 
 * 
 * 
 */
 
 var express = require('express');
 var router = express.Router();
 
 var GameStatus = require('../modules/gamestatus');
 
 var MASTER_KEY = 'YSFHCSC';
 
 function authorize(req, res, next) {
    if (req.session.isMaster == true) {
		next();
	} else {
		res.redirect('/control/login');
	}
 }
 
 function provideLoginForm(req, res) {
	 res.render('login');
 }
 
 function authorizeLogin(req, res) {
	 if (req.body.pass == MASTER_KEY) {
		 req.session.isMaster = true;
		 res.redirect('/control');
	 } else {
		 res.render('deny');
	 }
 }
 
 function logout(req, res) {
	 req.session.destroy();
	 res.redirect('/control');
 }
 
 function provideControl(req, res) {
	 res.render('control');
 }
 
 function startGame(req, res) {
	 if (res.app.locals.state == GameStatus.game_started) {
		 res.end('THE GAME HAS ALREADY BEEN STARTED.');
		 return;
	 }
	 
	 res.app.locals.started = new Date().getTime();
	 res.app.locals.timerId = setInterval(function gameTimer() {
		 var left = res.app.locals.config.left - (new Date().getTime() - res.app.locals.started);
		 if (left > 0) {
			 res.app.locals.left = left;
		 } else {
			 stop(res);
		 }
		 console.log(res.app.locals.left);
	 }, 16);
	 res.app.locals.state = GameStatus.game_started;
	 res.end('THE GAME HAS STARTED.');
 }
 
 function stop(res) {
	 if (res.app.locals.state != GameStatus.game_started) {
		 return;
	 }
	 
	clearInterval(res.app.locals.timerId);
	res.app.locals.left = 0;
	res.app.locals.state = GameStatus.game_finished;
 }
 
 function stopGame(req, res) {
	 if (res.app.locals.state != GameStatus.game_started) {
		 res.end('THE GAME HAS ALREADY BEEN STOPPED.');
		 return;
	 }
	
	stop(res);
	res.end('THE GAME HAS STOPPED.');
 }
 
 router.get('/login', provideLoginForm);
 router.post('/login', authorizeLogin);
 router.all('*', authorize);
 router.post('/logout', logout);
 router.get('/', provideControl);
 router.get('/start', startGame);
 router.get('/stop', stopGame);
 
 module.exports = router;