const path = require('path');
const configs = require('konfig')();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');
const compression = require('compression');
const MongoStore = require('connect-mongo')(session);
const ejs = require('ejs');

const env = process.env.NODE_ENV || 'development';

// application
module.exports = () => {
  const options = {
    secret: process.env.COOKIE_SECRET || configs.app.COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 2 * 60 * 60 * 1000,
    },
    store: new MongoStore({
      url: process.env.MONGOLAB_URI || configs.app.MONGODB_URI,
      collection: 'sessions',
      clear_interval: 60 * 60 * 24 * 3,
      auto_reconnect: true,
    }),
  };

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
  app.use(session(options));
  app.use(compression({ level: 9 }));
  app.use(passport.initialize());
  app.use(passport.session());

  if (env === 'development') {
    require('./config/development')(app);
  }

  if (env === 'production') {
    require('./config/production')(app);
  }

  return app;
};
