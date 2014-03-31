var request = require('request');
var _ = require('underscore');

var oauth_token_url = 'https://coinbase.com/oauth/token';
var api_base_url = "https://coinbase.com/api/v1";

var api_client = function () {
    var access_token;
    var refresh_token;

    // consumer supplies these functions

    // getter methods should be like this:
    // function () {return myAccessToken;}

    // setter method should be like this:
    // function (newAccessToken, newRefreshToken, callback) { setTokens(...).done(function (err) {callback(err);})}
    var access_token_getter;
    var refresh_token_getter;
    var tokens_setter;

    var update_access_token_getter = function (fn) {
        access_token_getter = fn;
    };

    var update_refresh_token_getter = function (fn) {
        refresh_token_getter = fn;
    };

    var update_tokens_setter = function (fn) {
        tokens_setter = fn;
    };

    var do_refresh_token = function (callback) {
        if (!refresh_token) {
            refresh_token = refresh_token_getter();
        }
        var data = {
            uri: oauth_token_url,
            qs: {
                grant_type: 'refresh_token',
                refresh_token: refresh_token
            }
        };
        request.post(data, function (err, response, body) {
            if (err) {
                callback(err);
                return;
            } else {
                if (!body) {
                    callback('no body in refresh token POST');
                    return;
                }
                if (response.statusCode !== 200) {
                    callback('statusCode from refresh token request was not 200');
                    return;
                }
                var body_obj = JSON.parse(body);

                var new_access_token = body_obj.access_token;
                var new_refresh_token = body_obj.refresh_token;

                // set the new tokens
                access_token = new_access_token;
                refresh_token = new_refresh_token;
                tokens_setter(new_access_token, new_refresh_token, function () {
                    callback();
                });
            }
        });
    };

    var get = function (url, qs_params, user_callback, dont_refresh_tokens) {
        if (!access_token) {
            access_token = access_token_getter();
        }
        var options = {
            uri: api_base_url + url,
            qs: _.extend({access_token: access_token}, qs_params)
        };
        request.get(options, function (err, response, body) {
            if (err) {
                user_callback({
                    message: 'Error processing https request',
                    exception: err
                }, null);
            } else {
                var status_code = response.statusCode;
                if (status_code === 200) {
                    user_callback(null, body);
                    return;
                }
                if (status_code === 401 || status_code === 403) {
                    // unauthorized - let's try refreshing the access token
                    if (!dont_refresh_tokens) {
                        do_refresh_token(function (err) {
                            if (err) {
                                user_callback({
                                    message: 'Error with access token',
                                    exception: err
                                }, null);
                            } else {
                                // re-try the original request,
                                // but set dont_refresh_tokens=true to avoid infinite loop
                                get(url, qs_params, user_callback, true);
                            }
                        });
                    } else {
                        user_callback({
                            message: 'Error with access token',
                            exception: 'already tried and failed, had dont_refresh_token = true'
                        }, null);
                    }
                }
            }
        });
    };

    return {
        update_access_token_getter: update_access_token_getter,
        update_refresh_token_getter: update_refresh_token_getter,
        update_tokens_setter: update_tokens_setter,
        get: get
    };
};

exports.new_api_client = function (access_token_getter, refresh_token_getter, tokens_setter) {
    var client = api_client();
    client.update_access_token_getter(access_token_getter);
    client.update_refresh_token_getter(refresh_token_getter);
    client.update_tokens_setter(tokens_setter);
    return client;
    // call like this: coinlib.new_api_client(fn1, fn2, fn3)
};
