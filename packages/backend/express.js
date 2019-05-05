const path = require('path');
const configs = require('konfig')();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const compression = require('compression');
const ejs = require('ejs');

const env = process.env.NODE_ENV || 'development';

// application
module.exports = () => {
  const app = express();
  app.disable('x-powered-by');
  app.set('port', process.env.PORT || configs.app.PORT);
  // app.set('views', path.resolve('../frontend/public'));
  // app.engine('html', ejs.renderFile);
  // app.set('view engine', 'html');
  // app.set('views', path.join(__dirname, 'views'));
  // app.set('view engine', 'jade');
  app.use(cookieParser());
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
  app.use(methodOverride());
  app.use(compression({ level: 9 }));

  if (env === 'development') {
    require('./config/development')(app);
  }

  if (env === 'production') {
    require('./config/production')(app);
  }

  return app;
};
