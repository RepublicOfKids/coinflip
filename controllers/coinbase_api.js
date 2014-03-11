var request = require('request');
var _ = require('underscore');

var BASE_URI = "https://coinbase.com/api/v1";

var getCoinbaseAccessToken = function (user) {
  if (!user || !user.tokens || !user.tokens.length) {
    return undefined;
  }
  var accessToken = _.findWhere(user.tokens, {'kind': 'coinbase'}).accessToken;
  return accessToken;
};

exports.getExchangeRates = function(params, cb) {
  request.get({ url: BASE_URI + "/currencies/exchange_rates" }, function (error, response, rates) {
    cb(error, rates);
  });
};

// @Todo: Figure this out.
exports.sendMoney = function(params, cb) {
  var accessToken = getCoinbaseAccessToken(params.user);
  if (!accessToken) {
    cb(new Error('No Coinbase access token provided.'));
  }
};

exports.getBalance = function(params, cb) {
  var accessToken = getCoinbaseAccessToken(params.user);
  if (!accessToken) {
    cb(new Error('No Coinbase access token provided.'));
  }
  var options = {
    url: BASE_URI + "/account/balance",
    qs: {
      access_token: accessToken
    }
  };
  request.get(options, function (error, response, result) {
    cb(error, result);
  });
};
