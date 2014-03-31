var _ = require('underscore');
var coinlib = require('../modules/coinlib');
var User = require('../models/User');

var getCoinbaseAccessToken = function (user) {
  if (!user || !user.tokens || !user.tokens.length) {
    return undefined;
  }
  var accessToken = _.findWhere(user.tokens, {'kind': 'coinbase'}).accessToken;
  return accessToken;
};


var token_getter = function(user, which_token) {
    return function () {
        if (!user || !user.tokens || !user.tokens.length || !_.contains(['access_token', 'refresh_token'], which_token)) {
          return undefined;
        }

        // TODO: maybe just store the tokens as 'access_token' or 'refresh_token' in the database
        var token_names = {
            access_token: 'accessToken',
            refresh_token: 'refreshToken',
        };
        var coinbase_tokens = _.findWhere(user.tokens, {'kind': 'coinbase'});
        return coinbase_tokens[token_names[which_token]];
    };
};

var tokens_setter = function(user) {
    return function (new_access_token, new_refresh_token, callback) {
        if (!user || !user.tokens || !user.tokens.length) {
          return;
        }
        User.findById(user.id, function (err, u) {
            // remove the old coinbase tokens first
            u.tokens = _.filter(u.tokens, function (t) {
              return t.kind !== 'coinbase';
            });

            // now insert the new token
            u.tokens.push({
              kind: 'coinbase',
              accessToken: new_access_token,
              refreshToken: new_refresh_token
            });

            // save to the db
            u.save(function(err) {
              callback(err);
            });
        });
    };
};

exports.getExchangeRates = function(params, cb) {
  var api_client = coinlib.new_api_client(
    token_getter(params.user, 'access_token'),
    token_getter(params.user, 'refresh_token'),
    tokens_setter(params.user)
  );

  api_client.get('/currencies/exchange_rates', {}, function (error, response) {
    cb(error, response);
  });
};

exports.getBalance = function(params, cb) {
  var api_client = coinlib.new_api_client(
    token_getter(params.user, 'access_token'),
    token_getter(params.user, 'refresh_token'),
    tokens_setter(params.user)
  );

  api_client.get("/account/balance", {}, function (error, response) {
    cb(error, response);
  });
};

// TODO: Figure this out.
exports.sendMoney = function(params, cb) {
  var accessToken = getCoinbaseAccessToken(params.user);
  if (!accessToken) {
    cb(new Error('No Coinbase access token provided.'));
  }
};
