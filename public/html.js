
var temp = {
				"font-size":"30px",
				width:"30%",
				height:"50px",
				position:"absolute",
				"border-radius":"20px",
				"text-align":"center",
				"line-height":"50px",
		    };

var rule = body.append("div").on("click",function(){

    rule.transition().duration(300).style({
        opacity: 0,
    });
    setTimeout(function () {
        var rulemain = body.append("div").style({
            background:"skyblue",
            position:"absolute",
            "left": "1%",
            "z-index": 100,
            opacity: 0,
            "border-radius":"20px",
        });
        rulemain.transition().duration(300).ease('linear').style({
            opacity: 1,
        });

        rulemain.append("div").on("click",function(){
            rulemain.transition().duration(300).ease('linear').style({
                opacity: 0,
            });
            rule.style({opacity:1,});
            setTimeout(function (){
                rulemain.remove();
            },300);
        }).style({
            position:"static",
            "margin-top":"5%",
            "margin-left":"5%",
            width:"40",
            height:"30",
            "text-align": "center",
            "font-weight":"bold",
            "font-size":30,
        }).text("back");

        //
		rulemain.append("p").on("click", function(){
			rulemain.transition().duration(1000).ease('linear').style({
				opacity: 0,
			});
			rule.style({opacity:1,});
			setTimeout(function (){
				rulemain.remove();
			},1000);
		}).style({
			position: "static",
			"margin-top": "10%",
			"margin-left": "10%",
			"margin-right": "10%",
			"margin-bottom": "5%",
			"font-size": 25,
			color: "white"
		}).html('このゲームは2チームに分かれて<ruby><rb>校内</rb><rp>（</rp><rt>こうない</rt><rp>）</rp></ruby>の<ruby><rb>部屋</rb><rp>（</rp><rt>へや</rt><rp>）</rp></ruby>をチームでとっていく<ruby><rb>陣取</rb><rp>（</rp><rt>じんと</rt><rp>）</rp></ruby>りゲームです。<br><br><ruby><rb>各部屋</rb><rp>（</rp><rt>かくへや</rt><rp>）</rp></ruby>にある<ruby><rb>QR</rb><rp>（</rp><rt>キューアール</rt><rp>）</rp></ruby>コードを<ruby><rb>使</rb><rp>（</rp><rt>つか</rt><rp>）</rp></ruby>ってその<ruby><rb>部屋</rb><rp>（</rp><rt>へや</rt><rp>）</rp></ruby>をとっていきます。<img src="qrwhite.png" width="100%" height="40%"><br>また、いくつかの<ruby><rb>部屋</rb><rp>（</rp><rt>へや</rt><rp>）</rp></ruby>にはアイテムが<ruby><rb>隠</rb><rt>かく</rt></ruby>されており、そのQRコードを<ruby><rb>読</rb><rt>よ</rt></ruby>み<ruby><rb>込</rb><rt>こ</rt></ruby>むことでアイテムを<ruby><rb>入手</rb><rp>（</rp><rt>にゅうしゅ</rt><rp>）</rp></ruby>することができます。うまく<ruby><rb>使用</rb><rp>（</rp><rt>しよう</rt><rp>）</rp></ruby>すると<ruby><rb>逆転</rb><rp>（</rp><rt>ぎゃくてん</rt><rp>）</rp></ruby>することも<ruby><rb>可能</rb><rp>（</rp><rt>かのう</rt><rp>）</rp></ruby>です。');

    },300);

}).style(temp).style({
	color:"white",
	background:"hsl(197, 100%, 63%)",
	"margin-left":"2.5%",
	"margin-top":"2%",
	"box-shadow": "2px 2px 8px -3px hsla(0, 0%, 0%, .26)"
}).text("ルール");

var QR = body.append("form").attr({
		id: "foo",
		onsubmit: "return false;",
	});
	
QR.append("canvas").style({
	display: "none"
});

var labelForButtonDesign = QR.append('label')
	.attr({
		'for': 'file'
	})
	.text('QR')
	.style({
			display:"block",
			position: "absolute",
			"text-align": "center",
			"font-size":"30px",
			width:"30%",
			height:"50px",
			"border-radius":"20px",
			"line-height":"50px",
			color:"white",
			background:"hsl(46, 98%, 60%)",
			"margin-left":"35%",
			"margin-top":"2%",
			"box-shadow": "2px 2px 8px -3px hsla(0, 0%, 0%, .26)"
		});

var memo64;
var formsubmit = labelForButtonDesign.append("input")
		.attr({
			type: "file",
			name: "file",
			accept: "image/*;capture=camera",
			id:"file",
		})
		.style({
			'visibility': 'hidden'
		});
		
(function () {
	var captureForm = document.querySelector('#file'),
	canvas = document.querySelector('canvas'),
	ctx = canvas.getContext('2d');
	canvas.width = canvas.height = 0;
	
	captureForm.addEventListener('change', function() {
		var file = this.files[0],
			image = new Image(),
			reader = new FileReader(),
			size = 500;
		if (file.type.match(/image.*/)) {
			reader.onloadend = function() {
				image.onload = function() { // 画像が読み込めた時の処理
					ctx.clearRect(0, 0, canvas.width, canvas.height);
		
					var w = size, h = image.height * (size/image.width);
		
					console.log("元々のサイズ:" + image.width + "×" + image.height);
					console.log("縮小後のサイズ:" + w + "×" + h);
		
					canvas.width = w;
					canvas.height = h;
					ctx.drawImage(image, 0, 0, w, h);
					
					memo64 = canvas.toDataURL();
					memo64 = memo64.split(',')[1];
					
					postQRCode();
				}
				image.src = reader.result;
			}
			reader.readAsDataURL(file);
		}
	}, false);
	
	function postQRCode() {
		console.log(memo64);
				
		request
			.post("/qr")
			.type('form')
			.send({'data': memo64})
			.end(function(err, res){
				if (!res.body) {
					// APIのエラー
					console.log(res);
					message('[失敗] もう一度読み込んでみてください。')
				} else if (res.body[0].symbol[0].data == null) {
					// QRうまく読み込めなかった
					console.log(res.body[0].symbol[0].error);
					message('[失敗] もう一度読み込んでみてください。');
				} else {
					// QRの部屋を塗る
					console.log(res.body[0].symbol[0].data);
					var param = res.body[0].symbol[0].data.substring(1);
				
					switch(res.body[0].symbol[0].data[0]){	
						case "S":
							request
								.post("/paint")
								.type('form')
								.send({"roomid": param})
								.end(function(err1, res1){
									console.log(res1.body);
									message(res1.body.message);
								});
						break;
						
						case "I":
							request
								.post("/getitem")
								.type('form')
								.send({"itemname": param})
								.end(function(err1, res1){
									console.log(res1.body);
									message(res1.body.message);
								});	
						break;
						
						case "N":
							message('残念、ハズレのQRコードだ!');
						break;
					}	
				}
			});
	}
	
})();

var item = body.append("div").on("click",function(){

    item.transition().duration(300).style({
        opacity: 0,
    });
	request
	  .get("/myitems")
	  .end(function(err, res){
		console.log(res.text);//レスポンス
		//レスポンスがJSONの場合 
		console.log(res.body);//ここにparse済みのオブジェクトが入る
		player.item=res.body;
	  });
    setTimeout(function () {
        var itemmain = body.append("div").style({
            background:"pink",
            position:"absolute",
			left: "1%",
            width: "100%",
            height: "100%",
            "z-index": 100,
            opacity: 0,
            "border-radius":"20px",
        });
        itemmain.transition().duration(300).ease('linear').style({
            opacity: 1,
        });

        itemmain.append("div").on("click",function(){
            itemmain.transition().duration(300).ease('linear').style({
                opacity: 0,
            });
            item.style({opacity:1,});
            setTimeout(function (){
                itemmain.remove();
            },300);
        }).style({
            position: "absolute",
            "margin-top": "5%",
            "margin-left": "5%",
            width: "40",
            height: "30",
            "text-align": "center",
            "font-weight": "bold",
            "font-size": 30,
        }).text("back");



        var list = itemmain.append("div").style({
            position: "absolute",
            "margin-top": "30%",
            "margin-left": "10%",
            width: "80%",
			"border-radius": "5",
			"line-height": "90px"
        });

		for(var i = 0; i < player.item.length; i++){
			list.append('img')
			.style({
				'border-radius': '7px'
			})
			.attr({
					'src'   : function(){return player.item[i] + '.png';},
					'width' : 50,
					'height': 50,
				});
            list.append("p").on("click",function(){
				list.remove();
				
				//player.item[this.id]によって使うアイテムを認識
				//アイテムによって、対象の部屋のIDとともサーバーに送信for(var i=3;i<=5;i++){
					
				var mapFitem = itemmain.append("div");
				for(var i=3;i<=5;i++){
					mapFitem.append("div").on("click",function(d,i){

						scopefloor=this.id;

						mapFitem.selectAll("div").style({
							color:"white",
							background:"gray",
						});
						boadFitem.style({
							background:"white",
						})
						mapFitem.select("div:nth-of-type("+(scopefloor-2)+")").style({
							color:"black",
							background:"white",
						});
						boadFitemReset();


						}).style({
							color:"white",
							"font-size":"20px",
							position:"absolute",
							height:"40px",
							width:"15%",
							"margin-top":function(){return 60+40*(i-2)},
							"margin-left":"5%",
							background:"gray",
							"text-align":"center",
							"line-height":"40px",
						}).attr({
							id:i,
						}).text(function(){return "F"+(i)});
				}
				boadFitem = mapFitem.append("div").style({
					background:"white",
					position:"absolute",
					"margin-left":"19%",
					"margin-top":"100px",
					width:"70%",
					height:"200px",
				});
				mapFitem.select("div:nth-of-type("+(scopefloor-2)+")").style({
					color:"black",
					background:"white",
				});
				
				// 苦肉の策
				var itemTarget = "38";
				
				itemTargetSelect = true;
				
				boadFitemReset();
				
				
				itemmain.append("select").on("change", function () {
					itemTarget = this.options[this.selectedIndex].text.substring(1);
				})
				.on('load', function () {
					itemTarget = this.options[this.selectedIndex].text.substring(1);
				})
				.style({
					position:"absolute",
					"margin-top":"330px",
					"margin-left":"45%",
				}).selectAll("option").data(map.body).enter().append("option").text(function(d){
					return "S"+d.id;
				});
				
				var tmpFitem = this.id;
				itemmain.append("button").on("click", function(){
					console.log(itemTarget);
					switch ( player.item[tmpFitem] ){
						case 'locker':
							request
							  .post("/locker")
							  .type('form')
							  .send({roomid:itemTarget})
							  .end(function(err, res){
								console.log(res.body);
								message(res.body.message);
							  });
						break;
						
						case 'nullPeinter':
							request
							  .post("/nullPeinter")
							  .type('form')
							  .send({roomid:itemTarget})
							  .end(function(err, res){
								console.log(res.body);
								message(res.body.message);
							  });
						break;
						
						case 'trap':
							request
							  .post("/trap")
							  .type('form')
							  .send({roomid:itemTarget})
							  .end(function(err, res){
								console.log(res.body);
								message(res.body.message);
							  });
						break;	
					}
					
					
					itemmain.transition().duration(300).ease('linear').style({
						opacity: 0,
					});
					item.style({opacity: 1});
					setTimeout(function (){
						itemmain.remove();
					},300);
					
					
				}).style({
					position:"absolute",
					"margin-top":"350px",
					"margin-left":"45%",
				}).text("決定");
				
			}).style({
				display: "inline",
				"margin-left": "5",
				"font-size": "30",
				position: 'relative',
				top: '-10px',
				width:"100%"
            }).attr({
				id:i,
			}).text(player.item[i]);

			list.append('br');
        };
		
    },300);

}).style(temp).style({
	color:"white",
	background:"rgb(253, 136, 156)",
	"font-size": "150%",
	"margin-left":"67.5%",
	"margin-top":"2%",
	"box-shadow": "2px 2px 8px -3px hsla(0, 0%, 0%, .26)"
}).text("アイテム");
