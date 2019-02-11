const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const DBBaseProvider = require('./base');
const { User } = require('../schemas');

module.exports = class UserProvider extends DBBaseProvider {
  constructor() {
    super(User);
  }

  findByIdStr(params) {
    return new Promise((resolve, reject) => {
      logger.info('\n============> User findByid_str\n');
      logger.info(params);
      return User.findOne({ id_str: params.id_str }, (err, user) => {
        if (err) {
          return reject(err);
        }
        return resolve(user);
      });
    });
  }

  findByName(params) {
    return new Promise((resolve, reject) => {
      logger.info('\n============> User findByName\n');
      logger.info(params);
      User.findOne({ name: params.name }, { access_token: 0 }, (err, user) => {
        if (err) {
          return reject(err);
        }
        return resolve(user);
      });
    });
  }

  findByAccessToken(params) {
    return new Promise((resolve, reject) => {
      logger.info('\n============> User findByaccess_token\n');
      logger.info(params);
      User.findOne(
        { access_token: params.access_token },
        { access_token: 0 },
        (err, user) => {
          if (err) {
            return reject(err);
          }
          return resolve(user);
        },
      );
    });
  }

  findAll(params) {
    return new Promise((resolve, reject) => {
      logger.info('\n============> User findAllUser\n');
      logger.info(params);
      User.find({}, { access_token: 0 }, (err, users) => {
        if (err) {
          return reject(err);
        }
        return resolve(users);
      });
    });
  }

  upsert(params) {
    return new Promise((resolve, reject) => {
      logger.info('\n============> User upsert\n');
      logger.info(params);
      const query = { id_str: params.user.id_str };
      const data = Object.assign(
        {
          updated_at: Date.now(),
          created_at: Date.now(),
        },
        params.user,
      );
      const options = { upsert: true };
      return resolve(this.update(query, data, options));
    });
  }

  // TODO: access_tokenも一緒に取ってきてるから除外する処理書いてね
  findOneAndUpdate(params) {
    return new Promise((resolve, reject) => {
      logger.info('\n============> User findOneAndUpdate\n');
      logger.info(params);
      const query = { id_str: params.user.id_str };
      const data = params.user;
      const options = { new: true, upsert: true };
      return resolve(
        UserProvider.prototype.__proto__.findOneAndUpdate.call(
          this,
          query,
          data,
          options,
        ),
      );
    });
  }
};
