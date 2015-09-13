var request = window.superagent;

request
  .get("localhost:14514/rooms")
  .end(function(err, res){
    console.log(res);//レスポンス
    //レスポンスがJSONの場合 
    console.log(res.body);//ここにparse済みのオブジェクトが入る
  });