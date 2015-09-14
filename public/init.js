var request = window.superagent;

var Colors = {
	'none': 1,
	'red': 2,
	'blue': 3
};

var body = d3.select("body").style({
	"background":"black",
	width:"100%",
	height:"100%",
});

var mapdiv = body.append("div");

var timep = body.append("p");

function redisplay(){
	
	timep.style({
		width: "100%",
		color:"white",
		"font-size":"30px",
		position:"absolute",
		"margin-top":"140px",
		"text-align": "center",
	}).text(function(){
		return "マップ（残り "+Math.floor(lefttime/60) + "分" + Math.floor(lefttime%60) + "秒）";
	});
	
	mapdiv.selectAll("div").data(map).enter().append("div").on("click",function(d,i){

		boad.selectAll("div").remove();

		mapdiv.selectAll("div").style({
			color:"white",
			background:"gray",
		});
		boad.style({
			background:"white",
		})
		mapdiv.select("div:nth-of-type("+(i+1)+")").style({
			color:"black",
			background:"white",
		});

		boad.append("div").html(mapsvg[i]);
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
		"margin-top":function(d,i){return 160+40*(i+1)},
		"margin-left":"5%",
		background:"gray",
		"text-align":"center",
		"line-height":"40px",
	}).text(function(d,i){return "F"+(i+1)});

	var boad = mapdiv.append("div").style({
		background:"white",
		position:"absolute",
		"margin-left":"19%",
		"margin-top":"200px",
		width:"70%",
		height:"200px",
	});

	
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
	
	//map=res;
	
  });
request
  .get("/left")
  .end(function(err, res){
	
	lefttime = res.body/1000;
	
	redisplay();
	
  });



//data更新
setInterval(function(){
	
	request
  .get("/rooms")
  .end(function(err, res){
	
	//map=res;
	
  });
	
	request
  .get("/left")
  .end(function(err, res){
	
	lefttime = res.body/1000;
	
	redisplay();
	
  });
	
},1000);





