var request = window.superagent;

var body = d3.select("body").style({
	"background":"hsl(0, 0%, 91%)",
	width:"100%",
	height:"100%",}).append("div");

var boadFitem;

var itemTargetSelect = false;

var mapdiv = body.append("div");

var timep = body.append("p");

var broadcastMessages = body.append("div").style({
	"position": "absolute",
	"top": "415px",
	"height": "160px",
	"overflow": "scroll"
});

var scopefloor = 3;

var me;
	
request
  .get("/myname")
  .end(function(err, res){

	console.log(res);
	me = res;

  });

function tick() {
	//時間描画
	timep.style({
		width: "100%",
		color:"hsl(0, 0%, 43%)",
		"font-size":"30px",
		position:"absolute",
		"left": "0",
		"margin-top":"140px",
		"text-align": "center",
	}).text(function(){
		return "（残り "+Math.floor(lefttime/60) + "分" + Math.floor(lefttime%60) + "秒）";
	});
}

function redisplay(){
	
	tick();
	
	//マップ描画（スコープに応じたものを再描画）
	
	boadreset();
	
	if(itemTargetSelect){
		boadFitemReset();
	}
	
	
}


//preinit
request
  .get("/mycolor")
  .end(function(err, res){
	
	if (res.body == Colors.red) {
		player.color="red";
	} else
	if (res.body == Colors.blue) {
		player.color="blue";
	}
	
	
	body.append("p").style({
		position: "absolute",
		"margin-top": "70px",
		"left": "0",
		"text-align": "center",
		width: "100%",
		color: function() {
			if (player.color == "red") return "hsl(0, 100%, 63%)"
			else if (player.color == "blue") return "hsl(220, 100%, 63%)";
		},
		"font-size":"40px",
	}).text(function(){
		// 赤色
		if (player.color == "red"){ return "赤チーム" };
		
		// 青色
		if (player.color == "blue"){ return "青チーム" };
	});
	
  });
request
  .get("/rooms")
  .end(function(err, res){
	
	map=res;
	
  });
request
  .get("/left")
  .end(function(err, res){
	
	lefttime = res.body/1000;
	
	redisplay();
	
  });




//map作成
for(var i=3;i<=5;i++){
	mapdiv.append("div").on("click",function(){

		scopefloor=this.id;

		mapdiv.selectAll("div").style({
			color:"white",
			background:"gray",
		});
		boad.style({
			background:"white",
		})
		mapdiv.select("div:nth-of-type("+(scopefloor-2)+")").style({
			color:"black",
			background:"white",
		});
		boadreset();
		
		/*selectAll("div").data(map[i]).enter().append("div").style({
			position:"absolute",
			"margin-left":function(e,n){return 10+n%3*90+"px";},
			"margin-top":function(e,n){return 7+Math.floor(n/3)*87+"px";},
			width:"80px",
			height:"80px",
			border: "2px solid black",
			background:function(e,n){return e.color;},
			"text-align":"center",
			"line-height":"80px",
			color:function(e,n){
				if(e.color=='')return "black";
			},
		}).text(function(e,n){
			return e.name;
		});*/

		}).style({
			color:"white",
			"font-size":"20px",
			position:"absolute",
			height:"40px",
			width:"15%",
			"margin-top":function(){return 160+40*(i-2)},
			"margin-left":"5%",
			background:"gray",
			"text-align":"center",
			"line-height":"40px",
		}).attr({
			id:i,
		}).text(function(){return "F"+(i)});
}
var boad = mapdiv.append("div").style({
	background:"white",
	position:"absolute",
	"margin-left":"19%",
	"margin-top":"200px",
	width:"70%",
	height:"200px",
}).append("div");
mapdiv.select("div:nth-of-type("+(scopefloor-2)+")").style({
	color:"black",
	background:"white",
});


//map描画更新
function boadreset(){
	boad.html(" ");
	boad.html(mapsvg[scopefloor]);
	var roomsFfill = boad.select("svg").select("g");
	
	for(var i=1;i<=8;i++){
		var idpre = "" + scopefloor + i  ;
		var judgeRoomColor = map.body[(scopefloor-3)*8+i-1].color;
		switch(judgeRoomColor){
				case 1:
					document.getElementById( idpre ).setAttribute('fill','white');
					break;
				case 2:
					document.getElementById( idpre ).setAttribute('fill','red');
					break;
				case 3:
					document.getElementById( idpre ).setAttribute('fill','blue');
					break;
		}
	}
}

//アイテム対象選択用map描画更新
function boadFitemReset(){
	boadFitem.html(" ");
	boadFitem.html(mapsvg[scopefloor]);
	var roomsFfill = boadFitem.select("svg").select("g");
	
	for(var i=1;i<=8;i++){
		var idpre = "" + scopefloor + i  ;
		var judgeRoomColor = map.body[(scopefloor-3)*8+i-1].color;
		switch(judgeRoomColor){
				case 1:
					document.getElementById( idpre ).setAttribute('fill','white');
					break;
				case 2:
					document.getElementById( idpre ).setAttribute('fill','red');
					break;
				case 3:
					document.getElementById( idpre ).setAttribute('fill','blue');
					break;
		}
	}
}

// マップの更新
function updateMapdata() {
	request.get('/rooms').end(function (err, res) {
		map = res;
		boadreset();
	});
}

function fingame(mes){
	
	if(me!="masterFthisgame"){
		body.remove();

		d3.select("body").style({
			"background-color":"gray",
		}).append("div").style({
			position:"absolute",
			"background-color":"gray",
			"margin-left":0,
			"margin-top":0,
			width:"100%",
			height:"100%",
			"z-index":100001,
		}).append("p").style({
			color:"white",
			width:"100%",
			"margin-top":"40%",
			"text-align": "center",
			"font-size":"40px",
		}).html(mes+"<br/>最初の教室（情報教室１）に戻ってください。");
	}
}

//data更新
setInterval(function () {
	
	request
		.get("/notifications")
		.end(function(err, res) {
			if (!err) var notifications = res.body;
				
			 for (var i = 0; i < notifications.length; i++) {
				var notification = notifications[i];
				if (i == notifications.length - 1) updateMapdata();
								
				var eventCode = notification.event;
				var mes = notification.message;
				
				switch (eventCode) {
					case Events.started:
						message(mes);
					break;
					
					case Events.finished:
						fingame(mes);
					break;
					
					case Events.painted:
						broadcastMessage(mes);
					break;
					
					case Events.locked:
						broadcastMessage(mes);
					break;
					
					case Events.unpeinted:
						broadcastMessage(mes);
					break;
					
					case Events.trapped:
						broadcastMessage(mes);
					break;
					
					default:
					break; 
				}
			}
		});
	
	request
  		.get("/left")
  		.end(function(err, res){
			lefttime = res.body / 1000;
			if(lefttime==0){
				fingame("終了です。");
			}
			tick();
		});
	
},1000);



