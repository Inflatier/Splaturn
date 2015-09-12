// var text = body.append("p").style({
// 	color:"white",
// 	"font-size":"30px",
// 	position:"absolute",
// 	"margin-top":"70px",
// }).text("あなたは");

body.append("p").style({
	position: "absolute",
	"margin-top": "70px",
	"text-align": "center",
	width: "100%",
	color:function(){return player.color},
	"font-size":"40px",
}).text(function(){
	if(player.color=="red"){return "赤チーム"};
	if(player.color=="blue"){return "青チーム"};
});
// text.append("span").text("です。");

body.append("p").style({
	width: "100%",
	color:"white",
	"font-size":"30px",
	position:"absolute",
	"margin-top":"140px",
	"text-align": "center",
}).text(function(){
	return "マップ（残り："+Math.floor(lefttime/60) + ":" + lefttime%60 + "）";
});


var mapdiv = body.append("div");
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

var trapcounta=1;

function happenTrap(){
	var trapBoard = body.append("div").style({
		background:"black",
		position:"absolute",
		"margin-left":"0%",
		"margin-top":"0%",
		width:"100%",
		height:"100%",
	});
	var numbers = [];
	for(var i=15;i>=1;i--){
		numbers[i] = body.append("div").on("click",function(){

			var memo = this.innerHTML;
			if(trapcounta==memo){
				numbers[memo].remove();
				trapcounta++;
				if(memo==15){
					trapcounta=1;
					trapBoard.remove();
				}
			}

		}).style({
			"font-size":"40px",
			color:function(){
				switch(i%5){
					case 0:
						return "pink";
						break;
					case 1:
						return"green";
						break;
					case 2:
						return"skyblue";
						break;
					case 3:
						return"orange";
						break;
					case 4:
						return"red";
						break;
				}
			},
			position:"absolute",
			"margin-left":function(){return Math.floor(Math.random()*80)+10+"%"},
			"margin-top":function(){return Math.floor(Math.random()*80)+10+"%"},
		}).text(i);
	}
}