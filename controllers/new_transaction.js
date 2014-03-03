var secrets = require('../config/secrets');

/**
 * GET /new_transaction
 * Contact form page.
 */

exports.getNewTransaction = function(req, res) {
  res.render('new_transaction', {
    title: 'New Transaction'
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
  //req.assert('amount', 'Amount is not valid').isAmount();
  req.assert('comment', 'Comment cannot be blank').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/new_transaction');
  }
};
