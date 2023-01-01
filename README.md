# NijiuraDeck

<img src="media/columns.jpg" alt="columns" width="640" height="auto">

TweetDeck ライクに<a href="http://may.2chan.net/b/futaba.htm" target="_blank">二次元裏＠ふたば</a>を閲覧するためのビューアです。

<br>

# ステータス

[![Node.js CI](https://github.com/eiurur/NijiuraDeck/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/eiurur/NijiuraDeck/actions/workflows/node.js.yml)

<br>

# 機能

- [x] カタログ表示
- [x] スレ検索機能(タイトル検索、お気に入り検索)
- [x] スレッド表示
- [x] 自動更新
- [x] メディアフィルタ(画像)
- [ ] 設定変更(カタログ)
- [ ] ストリーミング
- [ ] 書き込み
- [ ] スレ立て
- [ ] そうだね

<br>

# 対応掲示板

- [x] may
- [x] img
- [ ] dat

<br>

# 使い方

以下の URL にアクセス。

- 国内サーバ：https://nijiuradeck.fly.dev/

<br>

# 開発

## 最初にやること

```bash
git clone https://github.com/eiurur/NijiuraDeck
cd NijiuraDeck
cd frontend && npm install && npm run build
cd ../
cd backend && npm install
```

## 開発

@cmd1

```
cd backend && npm run dev
```

@cmd2

```
cd frontend && npm run dev
```

and go to `http://127.0.0.1:9001`

## ビルド

```bash
cd frontend && npm run build

```

## Production Start

```bash
cd backend && npm run start
```
