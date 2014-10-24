var Store = window.localStorage;

function onLoad( event, ui ) {
  var beerList = getBeerList();
  for (var h=0; h < beerList.length; ++h) {
    var beer = beerList[h];
    for (var i=0; i < beer.rating; ++i) {
      appendPumpkin($(beer.checkbox).prev());
    }
    if (beer.checked) {
      console.log("Beer checked");
    }
    var element = $(beer.checkbox).attr('checked', beer.checked);
    element.checkboxradio('refresh');
  }
}

$(document).on('pagecreate', function(e) {
  if (e.target.id == "indexPage") {
    mixpanel.track("homepage loaded", { page : 'index' });
    onLoad();
  } else {
    console.log("Id: ", e.target.id);
  }
});

$(document).ready(function() {
  $(document).pagecontainer({ defaults: true });
  var showPasteDialog = 'showPasteDialog';

  $('input').change(function() {
    var beerName = getBeerNameFromLabel($('label[for="' + this.id + '"]'));

    var label = $(this).prev();
    var count = countPumpkins(label);
    if (this.checked == true && count == 0) {
      // noop
    } else if (count >= 3) {
      this.checked = false;
      $(label).children('img').remove();
    } else {
      this.checked = true;
      appendPumpkin(label);
    }
    count = countPumpkins(label);
    Store.setItem(beerName+'-rating', count);
    
    if (this.checked) { Store.setItem(beerName, "true"); }
    else { Store.setItem(beerName, "false"); }
  });

  $('#export').click(function(e) {
    mixpanel.track("Export Beer List, Click");
    var beerNames = generateFullBeerNames(getCheckedBeerList());
    if (!beerNames || beerNames.length == 0) {
      mixpanel.track("Export Beer List, No beer");
      $('#exportNothingDialog').popup('open');
      //$(document).pagecontainer('change', $('#exportNothingDialog'), { role: "dialog" });
    } else {
      mixpanel.track("Export Beer List");
      $('#pasteArea').val(beerNames.join('\n'));
      $('#exportDialog').popup('open');
    }
  });

  $('#exportLink').click(function(e) {
    mixpanel.track("Export Beer List Link, Click");
    var beerNames = generateFullBeerNames(getCheckedBeerList());
    generateLink(beerNames.join('\n'), function(err, url) {
      if (err) { return console.log("Error creating link:", err); }
      mixpanel.track("Export Beer List Link", { url: url } );
      // TODO: maybe window.location
      popitup(url);
    });
  });

  $('#exportTweet').click(function(e) {
    mixpanel.track("Tweet Beer List, Click");
    var beerNames = generateFullBeerNames(getCheckedBeerList());
    if (!beerNames || beerNames.length == 0) {
      mixpanel.track("Tweet Beer List, No beer to tweet");
      $('#exportNothingDialog').popup('open');
      return;
    }
    generateLink(beerNames.join('\n'), function (err, fileUrl) {
      var url = 'https://twitter.com/intent/tweet?url='+encodeURI(fileUrl)+'&text='+encodeURI('Check out my beer from @brewfesttlh')+'&hashtags=brewcard,brewfesttlh2014';
      mixpanel.track("Tweet Beer List", { url: url } );
      popitup(url);
    });
  }); // exportTweet

  $('#fullscreen').click(function(e) {
    mixpanel.track("Fullscreen, Click");
    toggleFullScreen();
  });

  $('#refresh').click(function(e) {
    mixpanel.track("Refresh, Click");
    window.location.reload();
  });

  $('#clear').click(function(e) {
    mixpanel.track("Clear Beer List, Click");
    $('#clearDialog').popup('open');
  });

  $('#clear-yes').click(function(e) {
    mixpanel.track("Clear Beer List, Yes");
    resetAllBeer();
    $('#navPanel').panel('toggle');
    return true;
  });

  $('#clear-no').click(function(e) {
    mixpanel.track("Clear Beer List, No");
  });

  $(document).on('panelclose', function() {
    mixpanel.track("nav panel interaction", { page : 'navpanel', action : 'close'  });
  });
  $(document).on('panelopen', function() {
    mixpanel.track("nav panel interaction", { page : 'navpanel', action : 'open'  });
  });
}); // ready()

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
      cb(null, res.files['content.txt'].raw_url);
    },
    error: function(res, textStatus, errorThrown) {
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
    var beerName = getBeerNameFromLabel(label);
    var brewer = getBrewerFromLabel(label);

    var checked = Store.getItem(beerName);
    var rating = Store.getItem(beerName+'-rating');
    if (checked === undefined || checked === null || checked === "false") {
      checked = false;
    } else {
      checked = true;
    }
    beerList.push({
      checkbox: checkbox,
      name: beerName,
      brewer: brewer,
      checked: checked,
      rating: rating
    });
  }

  return beerList;
}

function getCheckedBeerList() {
  var beerList = [];
  getBeerList().forEach(function(beer) {
    if (beer.checked) {
      beerList.push(beer);
    }
  });
  return beerList;
}

function generateFullBeerNames(beerList) {
  var beerNames = [];
  for (var i=0; i < beerList.length; ++i) {
    beerNames.push(beerList[i].brewer + ' - ' + beerList[i].name);
  }
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
  var elements = $(element).children('img');
  return elements.length;
}

function appendPumpkin(element) {
  element.append('<img class="rating-pic" src="images/Pumpkin-icon-24x24.png">');
}

function getBeerNameFromLabel(label) {
  return $(label).attr('beer');
}

function getBrewerFromLabel(label) {
  return $(label).attr('brewer');
}

function toggleFullScreen() {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  }
  else {
    cancelFullScreen.call(doc);
  }
}

function resetAllBeer() {
  var checkboxes = $('input:checkbox');
  localStorage.clear();
  for (var i=0; i < checkboxes.length; ++i) {
    var checkbox = checkboxes[i];
    $(checkbox).prop('checked', false).checkboxradio('refresh');
  }
  var ratings = $('.rating-pic');
  for (var i=0; i < ratings.length; ++i) {
    var rating = ratings[i];
    $(rating).remove();
  }
}