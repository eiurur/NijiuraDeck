const chalk = require('chalk');
const configs = require('konfig')();
const mongoose = require('mongoose');

const uri = process.env.MONGOLAB_URI || configs.app.MONGODB_URI;
const db = mongoose.connect(uri);

module.exports = class DBBaseProvider {
  constructor(Model) {
    this.Model = Model;
    logger.info(this.Model.modelName);
  }

  aggregate(query) {
    return new Promise((resolve, reject) => {
      logger.info(`\n============> ${this.Model.modelName} aggregate\n`);
      logger.info(query);
      console.time(`${this.Model.modelName} aggregate`);
      this.Model.aggregate(query).exec((err, result) => {
        console.timeEnd(`${this.Model.modelName} aggregate`);
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  }

  count(query) {
    return new Promise((resolve, reject) => {
      logger.info(`\n============> ${this.Model.modelName} count\n`);
      logger.info(query);
      console.time(`${this.Model.modelName} count`);
      this.Model.count(query).exec((err, count) => {
        console.timeEnd(`${this.Model.modelName} count`);
        if (err) {
          return reject(err);
        }
        return resolve({ count });
      });
    });
  }

  find(query, fields, options) {
    if (query == null) {
      query = {};
    }
    if (fields == null) {
      fields = {};
    }
    if (options == null) {
      options = {};
    }
    return new Promise((resolve, reject) => {
      logger.info(`\n============> ${this.Model.modelName} find\n`);
      logger.info(query);
      logger.info(fields);
      logger.info(options);
      console.time(`${this.Model.modelName} find`);
      this.Model.find(query, fileds, options, (err, result) => {
        console.timeEnd(`${this.Model.modelName} find`);
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  }

  findByIdAndUpdate(_id, data, options) {
    return new Promise((resolve, reject) => {
      logger.info(
        chalk.green(`DBBaseProvider ${this.Model.modelName} findByIdAndUpdate`),
      );
      logger.info(_id);
      logger.info(data);
      logger.info(options);
      console.time(`${this.Model.modelName} findByIdAndUpdate`);
      this.Model.findByIdAndUpdate(_id, data, options, (err, doc) => {
        console.timeEnd(`${this.Model.modelName} findByIdAndUpdate`);
        if (err) {
          return reject(err);
        }
        return resolve(doc);
      });
    });
  }

  findOneAndUpdate(query, data, options) {
    return new Promise((resolve, reject) => {
      logger.info(
        chalk.green(`DBBaseProvider ${this.Model.modelName} findOneAndUpdate`),
      );
      logger.info(query);
      logger.info(data);
      logger.info(options);
      console.time(`${this.Model.modelName} findOneAndUpdate`);
      this.Model.findOneAndUpdate(query, data, options, (err, doc) => {
        console.timeEnd(`${this.Model.modelName} findOneAndUpdate`);
        if (err) {
          return reject(err);
        }
        return resolve(doc);
      });
    });
  }

  save(data) {
    return new Promise((resolve, reject) => {
      logger.info(chalk.green(`DBBaseProvider ${this.Model.modelName} save`));
      console.time(`${this.Model.modelName} save`);
      return data.save((err, doc) => {
        console.timeEnd(`${this.Model.modelName} save`);
        if (err) {
          return reject(err);
        }
        return resolve(doc);
      });
    });
  }

  update(query, data, options) {
    return new Promise((resolve, reject) => {
      logger.info(chalk.green(`DBBaseProvider ${this.Model.modelName} update`));
      logger.info(query);
      logger.info(data);
      logger.info(options);
      console.time(`${this.Model.modelName} update`);
      this.Model.update(query, data, options, err => {
        console.timeEnd(`${this.Model.modelName} update`);
        if (err) {
          return reject(err);
        }
        return resolve('update ok');
      });
    });
  }

  remove(query, data, options) {
    return new Promise((resolve, reject) => {
      logger.info(chalk.green(`DBBaseProvider ${this.Model.modelName} remove`));
      logger.info(query);
      logger.info(data);
      logger.info(options);
      console.time(`${this.Model.modelName} remove`);
      this.Model.remove(query, err => {
        console.timeEnd(`${this.Model.modelName} remove`);
        if (err) {
          return reject(err);
        }
        return resolve('remove ok');
      });
    });
  }
};
