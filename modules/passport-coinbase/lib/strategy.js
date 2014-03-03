/**
 * Module dependencies.
 */
 var util = require('util'),
   OAuth2Strategy = require('passport-oauth').OAuth2Strategy,
   InternalOAuthError = require('passport-oauth').InternalOAuthError;


/**
 * `Strategy` constructor.
 */
function Strategy(options, verify) {
  options = options || {};
  options.authorizationURL = options.authorizationURL || 'https://coinbase.com/oauth/authorize';
  options.tokenURL = options.tokenURL || 'https://coinbase.com/oauth/token';
  options.scopeSeparator = options.scopeSeparator || ',';

  OAuth2Strategy.call(this, options, verify);
  this.name = 'coinbase';
  this._clientSecret = options.clientSecret;
  this._enableProof = options.enableProof;
  this._userProfileURL = options.userProfileURL || 'https://coinbase.com/api/v1/users';
  this._profileFields = options.profileFields || null;
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);


Strategy.prototype.userProfile = function(accessToken, done) {
  this._oauth2.get(this._userProfileURL, accessToken, function (err, body) {
    if (err) { return done(new InternalOAuthError('failed to fetch user profile', err)); }
    
    try {
      var json = JSON.parse(body);
      
      var profile = { provider: 'coinbase' };
      var user = json.users[0];

      profile.id = user.id;
      profile.displayName = user.name;
      profile.emails = [{ value: user.email }];

      profile._raw = body;
      profile._json = user;
      
      done(null, profile);
    } catch(e) {
      done(e);
    }
  });
};

/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
