# Project:SKcDiscord-Servant
by Project.Appbird

Discordのための多機能botを作るためのフレームワーク(?)です。
このbotは、とあるサーバーのために作成されたため、一般用途には向いていないと考えられます。
ここには使用方法と振り返りの二つを書いています。

基本的な仕様については以下にどうぞ
https://scrapbox.io/minimumAppbirdlications/SKcDiscordServant

開発には
* Node.js/npm
	* discord.js
	* node-fetch
	* typescript
	* @types
		* node
		* node-fetch
* Visual Studio Code
* Heroku

を用いました。

## feature:ファイル分離による機能ごとの関心分離
このbotは、機能ごとに関心を分離してプログラミングが出来るよう設計されています。

追加できる機能を以下の二種類に分類します。
* command

その名の通りコマンド機能。プレフィックス`>`から始まる構文をとるメッセージを受け取った時に発生するコールバック関数を指定します。

* react

その他すべての、特定のイベントの発生時に発火するような機能。たとえば、サーバーに入った時のコールバック関数や、プレフィックス`>`をとらない普通のメッセージを受け取ったときなどに発火するコールバック関数を定義することが出来ます。
これらの機能を、一つのグループ(機能群)としてまとめ、ソースファイルを分離してプログラミングすることが可能になります。機能群に直接対応する型(インターフェース)は`IFunctionBase`になります。

たとえば、2020/06/14現在で実装されている機能群としては以下の3つがあります。
* BallonBurier

省略形で`babu`。特定の単語を含むメッセージが投稿されたとき、そのメッセージを削除する機能を保有します。
このページ上では一例としてbabuの動作状況のスクリーンショットが挙げられています。
* CmdChannelManager

コマンドを受け付けるチャンネルを設定する機能を保有します。
* Ready

コマンドを受け取った時、特定の文字列を返す機能を保有します。
これらはそれぞれ複数のcommandとreactを所持しており、それぞれ関心ごとにファイルが分離されて定義されています。
新たに機能群としてまとめ上げたときには、src/FunctionGroup/functionSet.ts内で定義されているエクスポート変数(`IFunctionBase[]`型)である`functionSet`に機能群(`IFunctionBase`)を追加することを忘れずに。そうしないと認識されません。
## feature:コマンドの定義方法
編集すべきフォルダは、src/FunctionGroupになります。
この中に機能群ごとにフォルダを作って、その中のファイルでcommandやreactを定義します。
### command
commandに直接対応するのは`ICommandBase`になります。
	* `commandTitle:string`
	コマンド名
	* `allowedFlags:ICmdFlag[]`
	定義されたフラグ(後述)
	* `numberOfTokenRequired:number`
	このコマンドがとる最小の単語数。
	* `description:string`
	説明
	* `argsForDescription:string[]`
	説明時に表示される引数名
	* `process:(msg:Message,tokenArray:string[])=>void`
	コマンドが打ち込まれた時に呼び出されるようなコールバック関数。
のプロパティを取ります。
[https://i.gyazo.com/d3937a8bab9b938c861c5317bc8e88b1.png]
これらのデータは、`>[機能群名] -h`コマンドが打ち込まれたときに表示されるヘルプ表示にも活かされます。
### commandのフラグ
また、コマンドはフラグ(`-`から始まる引数)を取ることが出来ます。
これを用いると、ユーザーによるコマンドの細やかな挙動の操作が可能になります。フラグに直接対応するような型は`ICmdFlag`(`./src/helper/cmdFlags`)になります。

型`cmdFlagManager`のインスタンスオブジェクトとして`ICmdFlag[]`を定義するとより便利です。[

フラグとされる入力文字列を受け取ってそのうちフラグとして適切な文字列だけを出力しつつ、`ICmdFlag#state`のフラグの状態を変更させる`cmdFlagManager`のメソッド`turnOn(cmdFlagsChar:String[],channel:TextChannel|DMChannel|NewsChannel):string[]`を用いることができるためです。

`cmdFlagManager`を継承して`cmdFlagManager#definedCmdFlags:ICmdFlag[]`を改めて定義する手法がおすすめです。(ここの設計はあんまりよくないと思うので、ここの設計はいつか変えたい。)

`ICmdFlag`は以下のプロパティを取ります。
	* `flagTitle:string`
	フラグ名
	* `flagOnDescription:string`
	フラグが立つ時の挙動の説明
	* `flagOffDescription:string`
	フラグが立たないときの挙動の説明
	* `cmdForFlag:string`
	コマンド上でこのフラグを表す文字列
	* `state:boolean`
	フラグが立っているか否か
この`ICmdFlag#state`はメソッド`cmdFlagManager#turnOn`を発火させた後だとユーザーのフラグの入力状況にそっているため、フラグの入力状況に応じて挙動を変更させることが可能になります。

![IcommandFlag](https://i.gyazo.com/f7d74142f74bcecfae1bc9ac98e479cd.png)
### react
直接ユーザーのメッセージに反応したいときなどはこちらを用います。

`IReactBase<K extends keyof ClientEvents>`のプロパティは以下の通りです。
	* `eventType:K`
	ここで指定したイベントが発生したときに、processは呼び出されます。
	* `reactName:string`
	このreactの正式名称
	* `process:(...args:ClientEvents[K]): void`
	呼び出されるコールバック関数。

なお、型の仕様上、reactを定義するときは、eventTypeごとにジェネリックを分けてreactを定義することを推奨します。ここは自動的に型推論されるようにしたかったのだがどうにもわからなかった。

[https://i.gyazo.com/c1ebb66cd3be8d6698eae76f75c2ccb5.png]
### IFunctionBase
この型が直接機能群に対応します。新たに機能群としてまとめ上げたときには、src/FunctionGroup/functionSet.ts内で定義されているエクスポート変数(`IFunctionBase[]`型)である`functionSet`に機能群(`IFunctionBase`)を追加することを忘れずに。そうしないと認識されません。
	* `commands:ICommandBase[]`
	定義されたcommand。
	* `react:IReactBase<keyof  ClientEvents>[]`
	定義されたreact。(ここの型の定義をどうにかしたいところ。(Promise.allの型定義が参考になる？))
	* `functionName:string`
	コマンドなどで使われる省略形の名前。
	* `realFuncName:string`
	実際の機能群の名前。
	* `description:string`
	機能群の説明。

ここまで定義してようやく一つの機能群として利用可能になります。

また、ここの実装のためにコンパイラには型の双変性を許容させています。

reactに代入されるのは`IReactBase<K>[]``(K extends keyof ClientEvents)`である一方、代入先は`IReactBase<keyof ClientEvents>[]`という複合型であるため、型の双変性を許容しないと代入ができず、コードが難解になる可能性が考えられたため、今回はこのまま許容することにしました。

## help機能
また、`>help`コマンドを用いて機能群の説明、`>[機能群] -h`フラグ付きコマンドを用いてその機能群内のcommandの説明を出力させることが可能です。
以上のデータで入力されたdescriptionなどをもとにしてhelpを自動生成するため、helpの書式についてはあまり気にせずに開発することが出来ます。

![](https://i.gyazo.com/184dd5b1fc12673fadc1bbb4674b02e6.png)
![](https://i.gyazo.com/82481ad2d3b216a6da3fc3136465ead2.png)

## データの保存について
このbotは、サービスHeroku上で動作することを想定して作成しています。

そのため、データベースの機能を利用して保存する手法も考えられましたが、今回はDiscord上の特定のテキストチャンネルを保管庫とする手法を取りました。

テキストチャンネルとして`filevault`チャンネルを作成することで、そのテキストチャンネル中にjsonデータを添付したメッセージを保有します。
こういった、データの読み込み書き込みについては`./src/helper/programHelperFunctions/helperAboutFile.ts`にて定義を行っています。

discord.jsには2020/6/14現在メッセージの添付ファイルを直接書き換えるような手法が存在しないとみたため、メッセージを削除してはまた新たにメッセージを投稿するという手法を取っています。そのため、反応速度がかなり遅くなります。

なお、テキストチャンネル名の衝突を防ぐため、`filevalut`チャンネルの模索範囲は一つのサーバーのみとしています。プログラムの利用者はこのサーバーを指定しなければなりません。(後述)
## 環境変数について
このプログラムを動かすためには、以下の環境変数が定義されていなければなりません。
* `BOT_TOKEN`をキーとしたDiscordのBotのトークン
* `guildId`をキーとした`filevault`テキストチャンネルが存在するサーバーのid
* `botId`をキーとしたbotのユーザーid
ただし、`./envVariables.json`が存在した場合には、プログラムはこのjsonファイルを解釈してそれを環境変数として扱います。

環境変数を扱うような操作をする際は、`./src/helper/programHelperFunctions/helperAboutVariables.ts`の`getEnvVariable(name:string):string`関数を用いると楽です。
## エラーを投げる
エラーが発生したとき、ユーザー側に知らせる際には`./src/helper/programHelperFunctions/helperAboutError.ts`の`helperAboutError.throwErrorToDiscord(targetChannel:TextChannel|DMChannel|NewsChannel,content:string,description?:string,fields?:IEmbedMessageField[])`関数を用いると楽です。

## 内部仕様
* commandは実は内部仕様上では、`message`イベントに反応するreactに変換されています。
	* どのreactよりも早く実行されます。
	* この統合作業及び、reactのコールバック関数を並べた配列を作る処理は`src\helper\reactToEvents.ts`にて定義されています。
* `help`コマンドや`-h`フラグは、一見一つの機能群のように振る舞っていますが、実際のところ実行時にトークンの文字列を確認して真っ先に実行されます。
	* 本当は機能群として確立したいというのが本音ですが、全ての機能群に一つ一つ`-h`フラグを定義するのは保守性に欠けるためこの様に設計しました。
	* なお、こういったコマンドを受け取った時の文字列の解析等は
		* `./src/helper/cmdExecutor.ts`の`executeCmd`関数で定義されています。
* Herokuで動くように設計はしましたが、恐らくきちんと環境変数を設定すればどのサーバーでもきちんと動くと思います。
	* そのサーバーでデータ保存が可能であれば、HelperAboutFile.tsを書き換えるべきです。
* `EmbedMessageMaker`(`./src/helper/embedMessageMaker.ts`)という関数を使えば、比較的簡単にMessageEmbedを持つメッセージを作成することが出来ます。
	* `src\helper\giveArgsOfHelpEmbedMsg.ts`は、Helpを表示させる際に使用しています。
	* この中にある関数は、EmbedMessageMakerを実行するための引数の配列を返します。

## 今後の展望
* `helperAboutFiles.ts` - バイナリとしてのファイル保存を試みる
	* その手法のデメリットを掴む
* `help`コマンドを一つの機能群として独立させる。
* `filevault`の添付ファイルを直接書き換えできないか試みる。
	* ファイル保存場所をデータベースに移行する。
* 型の双変性を許容しない状態でプログラムを完成させる。
	* `IReactBase<K>#eventType`を用いてKを推論できないか。
	* たとえば`client.on(event,callback)`だと、`event`の文字列型の指定によって関数のジェネリック型が推論される。これと同じようなことが出来ないか。
* 機能群の追加/拡張。
