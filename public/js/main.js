$(document).ready(function() {
  var names = new Bloodhound({
    datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.name); },
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: #{friends}
  });
    names.initialize();
    $('.typeahead').typeahead(null, {
      displayKey: 'name',
      source: names.ttAdapter()
    });
});
