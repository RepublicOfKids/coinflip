module.exports = {
  db: 'mongodb://localhost:27017/test',

  sessionSecret: "Your Session Secret goes here",

  localAuth: false,

  sendgrid: {
    user: 'Your SendGrid Username',
    password: 'Your SendGrid Password'
  },

  facebookAuth: true,
  facebook: {
    clientID: 'Your Client ID',
    clientSecret: 'Your Client Secret',
    callbackURL: '/auth/facebook/callback',
    passReqToCallback: true
  },

  coinbaseAuth: true,
  coinbase: {
    clientID: 'Your Client ID',
    clientSecret: 'Your Client Secret',
    callbackURL: '/auth/coinbase/callback',
    passReqToCallback: true
  }
};
