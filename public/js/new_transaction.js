function usdToBtc(usd) {
  return (Number(usd) * Number(window.cf.dump.rates.usd_to_btc));
}

function btcToUsd(btc) {
  return (Number(btc) / Number(window.cf.dump.rates.usd_to_btc));
}

cf.apps.new_transaction = function() {
  this.initializeForm();
};

cf.apps.new_transaction.prototype.initializeForm = function() {
  var $transactionRecipient = $('.transactionRecipient');
  if ($transactionRecipient.length) {
    var names = new Bloodhound({
      datumTokenizer: function(d) {
        return Bloodhound.tokenizers.whitespace(d.name);
      },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: window.cf.dump.friends
    });

    names.initialize();

    $transactionRecipient.typeahead(null, {
      displayKey: 'name',
      source: names.ttAdapter()
    });
  }

  $(".currency-btns label").on('click', function(event) {
    var $target = $(event.target);
    var $amount = $('.amount');
    var $currencyLabel = $('.currencyLabel');

    // TODO: Check if valid currency format
    // TODO: If you click fast enough, the conversion will be incorrect
    if ($target.is(".optionBTC:not(.active)")) {
      $currencyLabel.html('<i class="fa fa-btc"></i>');
      $amount.val(usdToBtc($amount.val()));
    } else if ($target.is(".optionUSD:not(.active)")) {
      $currencyLabel.html('<i class="fa fa-usd"></i>');
      $amount.val(btcToUsd($amount.val()));
    }
  });
};
