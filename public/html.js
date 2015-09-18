

/*
GETのとき
request
  .get(url)
  .end(function(err, res){
    console.log(res.text);//レスポンス
    //レスポンスがJSONの場合 
    console.log(res.body);//ここにparse済みのオブジェクトが入る
  });
*/
/*
POSTのとき
request
  .post(url)
  .send({name: name, text: text})
  .end(function(err, res){
    console.log(res.body);
  });
*/

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
            "margin-left": "0%",
            "margin-top": "0%",
            width: "100%",
            height: "170%",
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
            position:"absolute",
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
			position: "absolute",
			"margin-top": "20%",
			"margin-left": "10%",
			"margin-right": "10%",
			"margin-bottom": "5%",
			"font-size": 25,
			color: "white"
		}).html('このゲームは2〜4チームに分かれて<ruby><rb>校内</rb><rp>（</rp><rt>こうない</rt><rp>）</rp></ruby>の<ruby><rb>部屋</rb><rp>（</rp><rt>へや</rt><rp>）</rp></ruby>をチームでとっていく<ruby><rb>陣取</rb><rp>（</rp><rt>じんと</rt><rp>）</rp></ruby>りゲームです。<br><br><ruby><rb>各部屋</rb><rp>（</rp><rt>かくへや</rt><rp>）</rp></ruby>にある<ruby><rb>QR</rb><rp>（</rp><rt>キューアール</rt><rp>）</rp></ruby>コードを<ruby><rb>使</rb><rp>（</rp><rt>つか</rt><rp>）</rp></ruby>ってその<ruby><rb>部屋</rb><rp>（</rp><rt>へや</rt><rp>）</rp></ruby>をとっていきます。<img src="qrwhite.png" width="100%" height="40%"><br>また、<ruby><rb>部屋</rb><rp>（</rp><rt>へや</rt><rp>）</rp></ruby>をとったときアイテムを<ruby><rb>入手</rb><rp>（</rp><rt>にゅうしゅ</rt><rp>）</rp></ruby>することができます。うまく<ruby><rb>使用</rb><rp>（</rp><rt>しよう</rt><rp>）</rp></ruby>すると<ruby><rb>逆転</rb><rp>（</rp><rt>ぎゃくてん</rt><rp>）</rp></ruby>することも<ruby><rb>可能</rb><rp>（</rp><rt>かのう</rt><rp>）</rp></ruby>です。<br>説明は以上です。');

    },300);

}).style(temp).style({
	color:"white",
	background:"skyblue",
	"margin-left":"2.5%",
	"margin-top":"2%",
}).text("ルール");

var QR = body.append("div").on("click", function () {

		var memo64;
        QR.transition().duration(300).style({
            opacity: 0,
        });
        setTimeout(function () {
			var QRmain = body.append("div").style({
				position:"absolute",
				"margin-left": "0%",
				"margin-top": "0%",
				width: "100%",
				height: "100%",
				"z-index": 100000,
				opacity: 0,
				color: "white",
				background: "orange",
				"border-radius":"20px",
			});
			QRmain.transition().duration(300).ease('linear').style({
				opacity: 1,
			});
			QRmain.append("p").style({
				position: "absolute",
				"margin-top": "15%",
				"font-size": "30",
				"text-align": "center",
				width:"100%",
			}).text("QRコードを撮る");
			QRmain.append("div").on("click",function(){
				QRmain.transition().duration(300).ease('linear').style({
					opacity: 0,
				});
				QR.style({opacity:1,});
				setTimeout(function (){
					QRmain.remove();
				},300);
			}).style({
				position:"absolute",
				"margin-top":"5%",
				"margin-left":"5%",
				width:"40",
				height:"30",
				"text-align": "center",
				"font-weight":"bold",
				"font-size":30,
			}).text("back");
			
			var form = QRmain.append("form").attr({
				id: "foo",
				onsubmit: "return false;",
			});
			form.append("input").attr({
				type: "file",
				name: "file",
				accept: "image/*;capture=camera",
				id:"file",
			}).style({
				display:"block",
				position: "absolute",
				// width: "80%",
				//height: "20%",
				"margin-top": "45%",
				"margin-left": "10%",
				"font-size": "15",
				"text-align": "center",
				width: "100%",
				// background: "rgb(255, 238, 80)",
				// "border-radius": "20%",
			});
			var formsubmit = form.append("input").on("click",function(){
				formsubmit.style({
					"margin-top":"200%",
				});
				
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
			}).attr({
				id: "send",
				type: "submit",
			}).style({
				display: "block",
				width: "30%",
				height: "15%",
				position: "absolute",
				"margin-top": "55%",
				"margin-left": "35%",
				background: "rgb(255, 238, 80)",
				"border-radius": "20%",
			});
			
			/*
			$(function () {
				$('#foo').submit(function () {
					console.log("ok");
					var fd = new FormData($('#foo').get()[0]);
					$.ajax({
						url: "qr",
						method: "POST",
						data: ,
						processData: false,
						contentType: false,
						dataType: 'json'
					})
					.done(function (data) {
						//サーバーに送る。
						console.log(data[0].symbol[0].data);
						
						switch(data[0].symbol[0].data[0]){
								
							case "S":
								var id = data[0].symbol[0].data.substring(1);
								request
								  .post("/paint")
								  .type('form')
								  .send({"roomid": id})
								  .end(function(err, res){
									console.log(res.body);
									message(res.body.message);
								  });
								break;
							case "I":
								break;
							case "N":
								break;
								
						}
						
						
					});
					return false;
				});
			});*/
			
			QRmain.append("canvas").style({
				display: "none",
			})
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

						// 縮小画像を表示
						/*var img = document.createElement('img');
						img.src = canvas.toDataURL();
						document.querySelector('body').appendChild(img);*/
						/*QRmain.append("img").attr({
							src:function(){return canvas.toDataURL();},
								  "z-index":0,
						});*/

						//サーバへbase64をPOSTするためメモ。
						
						memo64 = canvas.toDataURL();
						memo64 = memo64.split(',')[1];
					}
				image.src = reader.result;
			  }
			  reader.readAsDataURL(file);
			}
			}, false);
			
			//ここで行われる流れ
			
			//とったQR画像をサーバーに送って解析データ（テキスト）をもらう
			//もらったデータが部屋のIDかアイテムのIDかを判別する
			//部屋なら、そのIDをサーバーに送信する
			//アイテムならそれに対応したアイテムを手持ちに追加する
    },300);
}).style(temp).style({
	color:"white",
	background:"orange",
	"margin-left":"35%",
	"margin-top":"2%",
}).text("QR");

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
            "margin-left": "0%",
            "margin-top": "0%",
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
            position:"absolute",
            "margin-top":"5%",
            "margin-left":"5%",
            width:"40",
            height:"30",
            "text-align": "center",
            "font-weight":"bold",
            "font-size":30,
        }).text("back");



        var list = itemmain.append("div").style({
            position:"absolute",
            "margin-top":"20%",
            "margin-left":"20%",
            width:"60%",
            height:"380",
            background: "white",
			"border-radius": "5",
        });
        // for(var i=0;i<player.item.length;i++){
		// 	list.append('img').attr({
        //             'src'   : function(){return player.item[i] + '.png';},
        //             'width' : 50,
        //             'height': 50,
		// 		});
        //     list.append("p").style({
		// 		display: "inline",
		// 		"margin-left": "5",
        //         "font-size": "30",
        //         width:"100%",
		// 		//position: "absolute",
        //         //"margin-top": ,
		// 		//"line-height": "30",
        //         //"text-align": "center",
        //     }).text(player.item[i]);
        // };

		for(var i=0;i<player.item.length;i++){
			list.append('img').attr({
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

						//boadFitem.append("div").html(mapsvg[i]);
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
				var itemTarget ;
				
				itemTargetSelect = true;
				
				boadFitemReset();
			
				itemmain.append("select").on("change",function(){
					itemTarget = this.options[this.selectedIndex].text.substring(1);
				}).style({
					position:"absolute",
					"margin-top":"330px",
					"margin-left":"45%",
				}).selectAll("option").data(map.body).enter().append("option").text(function(d){
					return "S"+d.id;
				});
				var tmpFitem = this.id;
				itemmain.append("button").on("click",function(){
					console.log(itemTarget);
					switch(player.item[tmpFitem]){
						case '部屋ロック':
							request
							  .post("/locker")
							  .type('form')
							  .send({roomid:itemTarget})
							  .end(function(err, res){
								console.log(res.body);
								message(res.body.message);
							  });
							break;
						case '色消し':
							request
							  .post("/nullPeinter")
							  .type('form')
							  .send({roomid:itemTarget})
							  .end(function(err, res){
								console.log(res.body);
								message(res.body.message);
							  });
							break;
						case 'トラップ':
							request
							  .post("/trap")
							  .type('form')
							  .send({roomid:itemTarget})
							  .end(function(err, res){
								console.log(res.body);
								message(res.body.message);
							  });

							//ここでサーバーにplayer.item[this.id]と部屋IDを送信

							break;
					}
				}).style({
					position:"absolute",
					"margin-top":"350px",
					"margin-left":"45%",
				}).text("決定");
				
			}).style({
				display: "inline",
				"margin-left": "5",
				"font-size": "30",
				width:"100%",

                // "margin-top": "5%",
                // "font-size": "30",
                // "text-align": "center",
                // width:"100%",
            }).attr({
				id:i,
			}).text(player.item[i]);

			list.append('br');
        };

    },300);

}).style(temp).style({
	color:"white",
	background:"pink",
	"font-size": "150%",
	"margin-left":"67.5%",
	"margin-top":"2%",
}).text("アイテム");
