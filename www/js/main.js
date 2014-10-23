$(document).ready(function() {
  var Store = window.localStorage;
  var showPasteDialog = 'showPasteDialog';

  ZeroClipboard.config( { swfPath: "http://cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.1.6/ZeroClipboard.swf" } );
  var client = new ZeroClipboard($('#export'));

/*
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
  */
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

  $('#agitated').click(function() {
    sessionStorage.setItem('showPasteDialog', false);
  });

  client.on('copy', function() {
    console.log("Exported");
    var beerList = getBeerList();
    var beerNames = [];
    beerList.forEach(function(beer) {
      if (beer.checked) {
        beerNames.push(beer.name);
      }
    });

    //client.setText(beerNames);
    client.setText(beerNames.toString());

    //.popup( "option", "dismissible", true );
    if (sessionStorage.getItem('showPasteDialog') !== "false") {
      $('#pasteDialog').popup('open');
    }
  });

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

