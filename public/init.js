var request = window.superagent;

var body = d3.select("body").style({
	"background":"black",
	width:"100%",
	height:"100%",
});

var boadFitem;

var itemTargetSelect = false;

var mapdiv = body.append("div");

var timep = body.append("p");

var scopefloor = 3;

function redisplay(){
	
	//時間描画
	timep.style({
		width: "100%",
		color:"white",
		"font-size":"30px",
		position:"absolute",
		"margin-top":"140px",
		"text-align": "center",
	}).text(function(){
		return "（残り "+Math.floor(lefttime/60) + "分" + Math.floor(lefttime%60) + "秒）";
	});
	
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
		"text-align": "center",
		width: "100%",
		color: function() { return player.color },
		"font-size":"40px",
	}).text(function(){
		if (player.color == "red"){ return "赤チーム" };
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

//data更新
setInterval(function(){
	
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
	
},1000);




