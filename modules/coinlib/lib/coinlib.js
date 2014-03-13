var request      = require('request');
var qs           = require('qs');

// private vars
var accessToken = null;
//var refreshToken = null;
//var appSecret = null;
var apiUrl = 'https://coinbase.com/api/v1';
//var oauthTokenUrl = 'https://coinbase.com/oauth/token';


var Client = function (method, url, postData, callback) {
    if (typeof callback === 'undefined') {
      callback  = postData;
      postData  = {};
    }

    this.options = {};
    this.options.method = method;

    this.options.uri = apiUrl + url;
    this.options.qs = {
        'access_token': accessToken
    };

    this.postData = postData;
    this.callback = callback;

    // actually execute the Client method
    // eg. Client.prototype.get()
    this[method.toLowerCase()]();

    return this;
};

Client.prototype.get = function () {
  var self = this;

  request.get(this.options, function(err, response, body) {
    if (err) {
        self.callback({
            message: 'Error processing https request',
            exception: err
        }, null);
      return;
    } else {
        self.callback(null, body);
    }
  });
};

Client.prototype.post = function () {
    var self = this;
    var postData = qs.stringify(this.postData);

    this.options.body = postData;

    request(this.options, function (err, res, body) {
      if (err) {
        self.callback({
            message: 'Error processing https request',
            exception: err
        }, null);

        return;
      } else {
          self.callback(null, body);
      }
    });
};

exports.get = function(url, params, callback) {
  return new Client('GET', url, callback);
};

exports.setAccessToken = function(token) {
  accessToken = token;
  return this;
};