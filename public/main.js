// var text = body.append("p").style({
// 	color:"white",
// 	"font-size":"30px",
// 	position:"absolute",
// 	"margin-top":"70px",
// }).text("あなたは");


// text.append("span").text("です。");



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
//result通知用関数
function message(text){
	var m1 = body.append("div").style({
		position:"absolute",
		"background-color":"black",
		"margin-left":0,
		"margin-top":0,
		width:"100%",
		height:"100%",
		height:"100%",
		opacity:0.5,
		"z-index":100001,
	})
	var m2 = body.append("div").style({
		position:"absolute",
		color:"white",
		"background-color":"skyblue",
		"margin-left":0,
		"margin-top":"30%",
		width:"100%",
		height:"50%",
		"z-index":100002,
	});
	m2.append("p").style({
		color:"white",
		width:"100%",
		"margin-top":"120",
		"text-align": "center",
	}).text(text);
	setTimeout(function(){
		m1.transition().duration(500).style({
			opacity:0,
		});
		m2.transition().duration(500).style({
			opacity:0,
		});
	},500)
	setTimeout(function(){
		m1.remove();
		m2.remove();
	},1000)
}