$(document).ready(function() {
  var $transactionRecipient = $('#transactionRecipient');
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
});
