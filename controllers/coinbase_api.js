var request = require('request');
var User = require('../models/User');

var BASE_URI = "https://coinbase.com/api/v1";

exports.getExchangeRates = function(params, cb) {
  request.get({ url: BASE_URI + "/currencies/exchange_rates" }, function (error, response, rates) {
    cb(error, rates);
  });
};

exports.sendMoney = function(params, cb) {
  if (!params.user) {
    cb(new Error('Missing or Invalid User Id'));
  }
  User.findById(params.user, function(err, user) {
    cb(err, user);
  });
};

exports.getBalance = function(params, cb) {
  if (!params.user) {
    cb(new Error('Missing or Invalid User Id'));
  }
  User.findById(params.user, function(err, user) {
    console.log(user);
    request.get({ url: BASE_URI + '/account/balance'}, function(err, response, balance) {
      cb(err, user);
    });

  });
};
