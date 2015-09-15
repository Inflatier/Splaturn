# Splaturn
文化祭の催し物

## ゲームの流れ(予定)
1. サーバー起動・初期化
2. クライアントが/entryにアクセスしてエントリー画面へ
3. クライアントがエントリー情報を入力し送信ボタンを押す。すると/joinにPOSTされるのでそのPOSTに含まれる情報ををサーバーが処理する。それが完了するとクライアントは/gameにリダイレクトされる。
4. マスタークライアント(ゲームの開始・終了・途中経過を管理するクライアント。アクセスは/masterの予定)がゲームを開始させる。
5. クライアントがゲームを進めていく。
6. 終了については今考えているところだゾ。

#### Events列挙体
    {
        "started": 10,
        "finished": 11,
        "painted": 12,
        "locked": 13,
        "unpeinted": 14,
        "trapped": 15
    }
イベントの一覧だゾ。読んで字のごとし。でも一応説明しておこうか。  
started ゲームが開始した  
finished ゲームが終了した  
painted 部屋が塗り替えられた  
locked 部屋がロックされた  
unpeinted 部屋の色が消された  
trapped 部屋にトラップが仕掛けられた  

#### Eventオブジェクト
    {
        "event": 11
        "emitter": 114514
        "target": 38
        "message": "YJSNPIがS38教室を赤色に塗り替えた!"
    }
発生したイベントを表現する。  
event イベントID。Events列挙体から選んでくださいね。  
emitter イベントを起こした人のID。  
target 対象の部屋のID。  
message メッセージ(直球)

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

#### GET /myitems
自分の持っているアイテムの名前の配列。

#### POST /getitem
アイテムを取得するゾ。ガバガバなのでどんな値を入れてもその名前のアイテムを手に入れられるので、スペルミスに注意。
パラメータ:  
itemname 取得するアイテムの名前(locker, nullPeinter, trap)

#### GET /myid
自分のIDが分かるゾ。クライアントにとってほとんど意味は無いゾ。

#### GET /notifications
通知。Eventオブジェクトの配列が返る。一度このAPIにアクセスするとその通知は消える。

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
任意の部屋をクライアントの色で染色する。戻り値はResultオブジェクト。色はセッションに保持されたものを使うので指定する必要はない。成功時はcode: 1を返す。部屋がロックされているとcode: -1、トラップが仕掛けられているとcode: -2を返し失敗する。    
パラメータ:  
roomid 塗る部屋のID

#### POST /部屋ロック
任意の部屋にロックをかける。戻り値はResultオブジェクト。ロックの秒数はサーバーのconfig.jsonにて指定。成功時はcode: 1を返す。部屋がロックされているとcode: -1を返し失敗する。    
パラメータ:  
roomid ロックをかける部屋のID

#### POST /色消し
任意の部屋の色を消す。戻り値はResultオブジェクト。成功時はcode: 1を返す。部屋がロックされているとcode: -1を返し失敗する。  
パラメータ:  
roomid 色を消す部屋のID

#### POST /トラップ
任意の部屋にトラップを仕掛ける。戻り値はResultオブジェクト。成功時はcode: 1を返す。部屋がロックされているとcode: -1を返し失敗する。  
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