var request = require('request');
var _ = require('underscore');
var coinlib = require('../modules/coinlib');

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

// TODO: Figure this out.
exports.sendMoney = function(params, cb) {
  var accessToken = getCoinbaseAccessToken(params.user);
  if (!accessToken) {
    cb(new Error('No Coinbase access token provided.'));
  }
};

// TODO: Figure this out.
exports.getBalance = function(params, cb) {
  var accessToken = getCoinbaseAccessToken(params.user);
  if (!accessToken) {
    cb(new Error('No Coinbase access token provided.'));
  }
  coinlib.setAccessToken(accessToken);
  coinlib.get("/account/balance", {}, function (error, response) {
    cb(error, response);
  });
};
