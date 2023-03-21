const passport = require("passport");
const SalesforceStrategy = require("passport-salesforce").Strategy;

const SALESFORCE_CONSUMER_KEY = process.env.SALESFORCE_CLIENT_ID;
const SALESFORCE_CONSUMER_SECRET = process.env.SALESFORCE_CLIENT_SECRET;
const CALLBACK_URL = "http://localhost:3000/api/callback";

passport.use(
  new SalesforceStrategy(
    {
      clientID: SALESFORCE_CONSUMER_KEY,
      clientSecret: SALESFORCE_CONSUMER_SECRET,
      callbackURL: CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, { profile, accessToken, refreshToken });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
