function onLoad( event, ui ) {
  console.log("Page container loaded");
  var beerList = getBeerList();
  beerList.forEach(function(beer) {
    console.log("Beer checked:", beer.checked);
    $(beer.checkbox).prop('checked', beer.checked).checkboxradio('refresh');
  });
}
$(document).on("pagecreate", onLoad);

var Store = window.localStorage;

$(document).ready(function() {
  var showPasteDialog = 'showPasteDialog';

  $('input').change(function() {
    var beerName = $('label[for="' + this.id + '"]').html();
    if (this.checked) {
      console.log("Saving TRUE: ", beerName);
      Store.setItem(beerName, "true");
    } else {
      console.log("Saving FALSE: ", beerName);
      Store.setItem(beerName, "false");
    }

    var label = $(this).prev();
    var count = countPumpkins(label);
    if (this.checked == true && count == 0) {
      // noop
    } else if (count >= 3) {
      this.checked = false;
      $(label).children('img').remove();
    } else {
      this.checked = true;
      label.append('<img class="picture" src="images/Pumpkin-icon-24x24.png">');
    }
  });

  $('#export').click(function(e) {
    console.log("Exported");

    $('#pasteArea').val(getCheckedBeerNames());
    $('#pasteDialog').popup('open');
  });

  $('#exportLink').click(function(e) {
    generateLink(getCheckedBeerNames().join('\n'), function(err, url) {
      if (err) { return console.log("Error creating link:", err); }
      // TODO: maybe window.location
      popitup(url);
    });
  });

  $('#exportTweet').click(function(e) {
    console.log("Export tweet clicked");
    generateLink(getCheckedBeerNames().join('\n'), function (err, fileUrl) {
      var url = 'https://twitter.com/intent/tweet?url='+encodeURI(fileUrl)+'&text='+encodeURI('Check out the list of beers I tried @brewfesttlh');
      popitup(url);
    });
  }); // exportTweet
});


function generateLink(content, cb) {
  var content = {
    files : {
      "content.txt" : {
        content : content
      }
    }
  };
  $.ajax({
    type: "POST",
    async: false,
    dataType: "json",
    url: "https://api.github.com/gists", 
    crossDomain: true,
    data: JSON.stringify(content), 
    success: function(res) {
      console.log("Success!");
      cb(null, res.files['content.txt'].raw_url);
    },
    error: function(res, textStatus, errorThrown) {
      console.log("Fail!");
      cb(errorThrown);
    }
  });
}

function getBeerList() {
  var beerList = [];
  var checkboxes = $('input:checkbox');
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
      checked: checked,
      rating: 0
    });
  }

  return beerList;
}

function getCheckedBeerNames() {
  var beerNames = [];
  getBeerList().forEach(function(beer) {
    if (beer.checked) {
      beerNames.push(beer.name);
    }
  });
  return beerNames;
}

function popitup(url) {
  var width  = 575,
      height = 400,
      left   = ($(window).width()  - width)  / 2,
      top    = ($(window).height() - height) / 2,
      opts   = 'status=1' +
               ',width='  + width  +
               ',height=' + height +
               ',top='    + top    +
               ',left='   + left;
  newwindow=window.open(url,'_blank', opts);
  if (window.focus) {newwindow.focus()}
  return false;
}

function countPumpkins(element) {
  return $(element).children('img').length;
}

