$(document).ready(function() {
  var Store = window.localStorage;

  var checkboxes = $('input');
  for (var i=0; i < checkboxes.length; ++i) {
    var checkbox = checkboxes[i];
    var label = $('label[for="' + checkbox.id + '"]');
    var beerName = $(label).html();

    var checked = Store.getItem(beerName);
    if (checked === undefined || checked === null || checked === "false") {
      checked = false;
      console.log("UNCHECK ", beerName);
    } else {
      checked = true;
      console.log("CHECK ", beerName);
    }

    $(checkbox).prop('checked', checked).checkboxradio('refresh');
  }



  $('input').change(function() {
    var beerName = $('label[for="' + this.id + '"]').html();
    if (this.checked) {
      console.log("Saving TRUE: ", beerName);
      Store.setItem(beerName, "true");
    } else {
      console.log("Saving FALSE: ", beerName);
      Store.setItem(beerName, "false");
    }
  });
});

