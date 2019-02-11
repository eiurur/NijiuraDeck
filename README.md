# Syasei-Senkyo

## 要件定義

- キャラ別、作品別の射精状況管理、コンプリート状況も含め。
- socket.io でリアルタイム更新
- ツイート機能
  - OGP 生成機能
- ランキング機能(月別、年別)
- インターバル機能
- URL 投稿(OGP 取得)
  - URL のみなのでストレージを圧迫しない利点
- 検索機能(キャラ名、作品名)
- オリキャラは対象外、三次元も対応外？

## 対象

- ソシャゲ
- vtuber
- アニメ

### 画面一覧

- ランディングページ
- ログイン画面
- マイページ画面
- ユーザ画面
- 検索画面(作品、キャラ、ユーザ)
- 作品別画面

## スケジュール(タスク)

- 収集対象の作品羅列
  - 有名所だけに絞る
- 収集対象のメタ情報を決定
- データベース設計
- 画像、メタ情報を収集
- 画像の加工(顔抽出)

画像を使わず、イメージカラー+名前で表現すれば著作権や同一性保持権に抵触せずに済むか？工数も省ける。

- 画面の作成
- ログイン機能
- API の作成
  - マスタの取得
  - 射精状況の登録
- スレッド作成
  - URL 登録
  - OGP 取得、貼り付け
  - 過去ログ参照
- 可視化機能
  - 射精状況(dotinstall っぽく一覧でパーセント表示(自分用))
  - 線グラフで遷移
  - twitter のメタ情報から(性別？年齢？取れる？)棒グラフ？

##

## Build Setup

```bash
# install dependencies
npm install

npm start

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## development

```bash
npm start
```
