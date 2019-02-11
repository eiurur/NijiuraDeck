const util = require('util');
const crypto = require('crypto');

const my = function () {
  // module.exports = class My

  return {
    c(desciption, str) {
      desciption = desciption || '';
      str = str || '';
      return console.log(`${desciption}: ${str}`);
    },

    e(desciption, str) {
      desciption = desciption || '';
      str = str || '';
      return console.error(`${desciption}: ${str}`);
    },

    dump(obj) {
      return console.log(util.inspect(obj, false, null));
    },

    include(array, str) {
      return !array.every((elem, idx, array) => str.indexOf(elem) === -1);
    },

    createParams(params) {
      const result = [];
      for (const k in params) {
        const v = params[k];
        result.push(`${k}=${v}`);
      }
      return result.join('&');
    },
    // => 'key=apikey&code=01234&start=0&rows=0'

    // 開始時刻と終了時刻が同じ日かどうか判定
    isSameDay(startTimeYMD, endTimeYMD) {
      if (startTimeYMD === endTimeYMD) {
        return true;
      }
      return false;
    },

    // ハッシュ化
    createHash(key, algorithm) {
      algorithm = algorithm || 'sha256';
      return crypto
        .createHash(algorithm)
        .update(key)
        .digest('hex');
    },

    // 指定された文字列と生成したいサイズ数でユニークIDを生成
    // http://blog.fkei.me/2012/03/nodejs-uid.html
    createUID(size, base) {
      size = size || 32;
      base = base || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const len = base.length;
      const buf = [];
      let i = 0;

      while (i < size) {
        buf.push(base[Math.floor(Math.random() * len)]);
        ++i;
      }
      return buf.join('');
    },

    random(array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    randomByLimitNum(array, num) {
      let result = [];

      if (array.length < num) {
        result = [].concat(array);
        console.log(`\
num =  ${num} array = ${array.length}, result = ${result.length}\
`);
        return result;
      }

      while (result.length < num) {
        const pluckedVal = this.random(array);
        if (_.contains(result, pluckedVal)) {
          continue;
        }
        result.push(pluckedVal);
      }
      // HACK: 上の2行は 下の1行でいいんじゃね？
      // result = _.uniq result
      return result;
    },
  };
};

exports.my = my();
