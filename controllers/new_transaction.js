var async = require('async');
var _ = require('underscore');
var graph = require('fbgraph');

/**
 * GET /new_transaction
 * Contact form page.
 */

exports.getNewTransaction = function(req, res, next) {
  var token = _.findWhere(req.user.tokens, { kind: 'facebook' });
  graph.setAccessToken(token.accessToken);
  async.parallel({
     getMyFriends: function(done) {
        graph.get(req.user.facebook + '/friends', function(err, friends) {
          done(err, friends.data);
	});
     }
  },
  function(err, results) {
    if (err) return next(err);
    var friends = results.getMyFriends;
    var friendsLength = Object.keys(friends).length;
    var friendsJson = [];
    for (var i = 0; i < friendsLength; i++) {
      friendsJson.push( { name : friends[i].name } );
    }
    res.render('new_transaction', {
      title: 'New Transaction',
      dump: {
        friends: friendsJson
      }
    });
  });
};

/**
 * POST /new_transaction
 * Send a contact form via Nodemailer.
 * @param name
 * @param amount
 * @param comment
 */

exports.postNewTransaction = function(req, res) {
  req.assert('name', 'Name cannot be blank').notEmpty();
  req.assert('comment', 'Comment cannot be blank').notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/new_transaction');
  }
};
