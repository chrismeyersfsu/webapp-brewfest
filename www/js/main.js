$(document).ready(function() {
  var Store = window.localStorage;
  var showPasteDialog = 'showPasteDialog';

  var beerList = getBeerList();
  beerList.forEach(function(beer) {
    $(beer.checkbox).prop('checked', beer.checked).checkboxradio('refresh');
  });


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

  $('#export').click(function(e) {
    console.log("Exported");
    var beerList = getBeerList();
    var beerNames = [];
    beerList.forEach(function(beer) {
      if (beer.checked) {
        beerNames.push(beer.name);
      }
    });

    $('#pasteArea').val(beerNames);
    $('#pasteDialog').popup('open');
  });
/*
  $('#pasteArea').focus(function() {
      var $this = $(this);
      $this.select();

      // Work around Chrome's little problem
      $this.mouseup(function() {
          // Prevent further mouseup intervention
          $this.unbind("mouseup");
          return false;
      });
  });
*/

  function getBeerList() {
    var beerList = [];
    var checkboxes = $('input');
    for (var i=0; i < checkboxes.length; ++i) {
      var checkbox = checkboxes[i];
      var label = $('label[for="' + checkbox.id + '"]');
      var beerName = $(label).html();

      var checked = Store.getItem(beerName);
      if (checked === undefined || checked === null || checked === "false") {
        checked = false;
      } else {
        checked = true;
      }
      beerList.push({
        checkbox: checkbox,
        name: beerName,
        checked: checked
      });
    }

    return beerList;
  }
});

