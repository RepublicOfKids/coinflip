var request = require('request');

exports.getExchangeRates = function(params, cb) {
  request.get({ url: "https://coinbase.com/api/v1/currencies/exchange_rates" }, function (error, response, rates) {
    cb(error, rates);
  });
};
