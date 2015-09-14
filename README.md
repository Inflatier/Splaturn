# Splaturn
文化祭の催し物

## ゲームの流れ(予定)
1. サーバー起動・初期化
2. クライアントが/entryにアクセスしてエントリー画面へ
3. クライアントがエントリー情報を入力し送信ボタンを押す。すると/joinにPOSTされるのでそのPOSTに含まれる情報ををサーバーが処理する。それが完了するとクライアントは/gameにリダイレクトされる。
4. マスタークライアント(ゲームの開始・終了・途中経過を管理するクライアント。アクセスは/masterの予定)がゲームを開始させる。
5. クライアントがゲームを進めていく。
6. 終了については今考えているところだゾ。

#### Resultオブジェクト
    {
        "code": 1,
        "message": "S46教室にトラップを仕掛けた!"
    }
code: APIの実行結果を表す整数。成功の場合は正の整数。失敗の場合は負の整数。  
message: 実行結果に関するメッセージ

#### Colors列挙体
    {
        "none": 1,
	    "red": 2,
	    "blue": 3
    }
色はここから指定してくださいね。

### GameStatus列挙体
    {
        "wating_entry": 1,
        "game_started": 2,
        "game_finished": 3
    }
ゲームの状態がわかるゾ

#### Roomオブジェクト
    {  
        "id": 810,
        "name": "S46教室",
        "lockExpire": 0,
        "color": 1,
        "isTrapped": false
    }
id: (int) その部屋の一意なID。マップのSVGのIDと対応する。  
name: (String) その部屋の名称。  
lockExpiration: (int) その部屋のロックの有効期限。ミリ秒表記。0のときロックは解除された状態。  
color: (Color) その部屋の色。Color列挙体の色を指定。  
isTrapped: (boolean) その部屋にトラップが仕掛けられている(true)か否(false)か。  

## クライアント用API

#### GET /myname
自分の名前を売る(至言)

#### GET /mycolor 
自分の名前をColors列挙隊の整数で返すゾ

#### GET /state
ゲームの状態(エントリー中・ゲーム中・ゲーム終了済み)をGameStatus列挙体の数値で返す。クライアント側で if (State.wating_entry)みたいに使うことを想定してます。  

#### GET /left
残り時間をミリ秒の整数で返す。

#### GET /rooms
全部屋の情報を表すRoomオブジェクトの配列を返す。  

#### POST /paint
任意の部屋をクライアントの色で染色する。戻り値はResultオブジェクト。色はセッションに保持されたものを使うので指定する必要はない。  
パラメータ:  
roomid 塗る部屋のID

#### POST /locker
任意の部屋にロックをかける。戻り値はResultオブジェクト。ロックの秒数はサーバーのconfig.jsonにて指定。  
パラメータ:  
roomid ロックをかける部屋のID

#### POST /nullPeinter
任意の部屋の色を消す。戻り値はResultオブジェクト。
パラメータ:  
roomid 色を消す部屋のID

#### POST /trap
任意の部屋にトラップを仕掛ける。戻り値はResultオブジェクト。  
パラメータ:  
roomid トラップを仕掛ける部屋のID  
  
## マスタークライアント用エンドポイント/API

#### GET /control/login
ログイン画面。パスワードはmodules/master.js内にあります。

#### GET /control/start
ゲームを開始する。

#### GET /control/stop
ゲームを終了する。

#### POST /control/logout
マスタークライアントからログアウト。