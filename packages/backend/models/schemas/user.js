const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// #
// Schemaインタフェースを通してモデルの定義を行う
// #
const UserSchema = new Schema({
  id_str: {
    type: String,
    unique: true,
    index: true,
  },
  name: String,
  screen_name: String,
  icon: String,
  url: String,
  description: String,
  access_token: String,
  access_token_secret: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

// #
// モデルへのアクセス
// mongoose.model 'モデル名', 定義したスキーマクラス
// を通して一度モデルを定義すると、同じ関数を通してアクセスすることができる
// #
mongoose.model('User', UserSchema);

// #
// 定義した時の登録名で呼び出し
// #
const User = mongoose.model('User');

module.exports = User;
