const path = require('path');
const configs = require('konfig')();
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

const { UserProvider } = require(path.resolve('models', 'repository'));

module.exports = app => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TW_CK || configs.app.TW_CK,
        consumerSecret: process.env.TW_CS || configs.app.TW_CS,
        callbackURL: process.env.CALLBACK_URL || configs.app.CALLBACK_URL,
      },
      (token, tokenSecret, profile, done) => {
        logger.info('User profile = ', profile);
        profile.twitter_token = token;
        profile.twitter_token_secret = tokenSecret;

        const user = {
          id_str: profile._json.id_str,
          name: profile.username,
          screen_name: profile.displayName,
          icon: profile._json.profile_image_url_https,
          url: profile._json.url,
          description: profile._json.description,
          access_token: token,
          access_token_secret: tokenSecret,
        };

        UserProvider.findOneAndUpdate({ user })
          .then(userInDb => {
            logger.info(userInDb);
            return done(null, profile);
          })
          .catch(err => {
            if (err) {
              return logger.info(err);
            }
          });
      },
    ),
  );

  app.get('/auth/twitter', passport.authenticate('twitter'));

  app.get(
    '/auth/twitter/callback',
    passport.authenticate('twitter', {
      successRedirect: '/',
      failureRedirect: '/',
    }),
  );
};
