const path = require('path');
const configs = require('konfig')();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const methodOverride = require('method-override');
const compression = require('compression');

const env = process.env.NODE_ENV || 'development';

// application
module.exports = () => {
  const app = express();
  app.disable('x-powered-by');
  app.set('port', process.env.PORT || configs.app.PORT);
  app.use(cookieParser());
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
  app.use(methodOverride());
  app.use(compression({ level: 9 }));
  app.use(cors());

  if (env === 'development') {
    require('./config/development')(app);
  }

  if (env === 'production') {
    require('./config/production')(app);
  }

  return app;
};
