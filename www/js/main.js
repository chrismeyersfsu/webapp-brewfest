var Store = window.localStorage;
var beerListUrl = 'https://gist.githubusercontent.com/chrismeyersfsu/180ba7e0d96ef6170927/raw/2014_brewfest_beer_list.json';

var Dialogs = {
  notes: null,
  exportNothing: null,
  export: null,
  clear: null,
};

function onLoad( event, ui ) {
  /*
  Dialogs.notes = $('#notesDialog').popup({
    afteropen: function( event, ui ) {
      $('#notesArea').focus();
    },
    afterclose: function(event,ui) {

    }
  });
*/
  Dialogs.exportNothing = $('#exportNothingDialog').popup();
  Dialogs.export = $('#exportDialog').popup();
  Dialogs.clear = $('#clearDialog').popup();

  refreshBeerList(function(err, html) {
    html = '<fieldset data-role="controlgroup">' + html + '</fieldset>';
    $('#beerListview').html(html).trigger('create');
    //$('#beerListview').listview().listview('refresh');

    var beerList = getBeerList();
    for (var h=0; h < beerList.length; ++h) {
      var beer = beerList[h];
      for (var i=0; i < beer.rating; ++i) {
        appendPumpkin($(beer.checkbox).prev());
      }
      var element = $(beer.checkbox).attr('checked', beer.checked);
      element.checkboxradio('refresh');
    }

/*
    $('.ui-checkbox').on('taphold', function() {
      Dialogs.notes.popup('open');
    });
*/

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

  });
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

  $('#export').click(function(e) {
    mixpanel.track("Export Beer List, Click");
    var beerNames = generateFullBeerNames(getCheckedBeerList());
    if (!beerNames || beerNames.length == 0) {
      mixpanel.track("Export Beer List, No beer");
      Dialogs.exportNothing.popup('open');
      //$(document).pagecontainer('change', $('#exportNothingDialog'), { role: "dialog" });
    } else {
      mixpanel.track("Export Beer List");
      $('#pasteArea').val(beerNames.join('\n'));
      Dialogs.export.popup('open');
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
      Dialogs.exportNothing.popup('open');
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
    Dialogs.clear.popup('open');
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
    beerNames.push([beerList[i].brewer, beerList[i].name, beerList[i].rating].join(', '));
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

function refreshBeerList(cb) {
  var count = 0;
  $.get(beerListUrl, function (data) {
    var html = '';
    data = JSON.parse(data);
    for (var key in data) {
      html += '<div class="ui-bar ui-bar-a">' + key + "</div>\n";

      for (var i=0; i < data[key].length; ++i) {
        var entry = data[key][i];
        html += '<div class="ui-bar ui-bar-a">' + entry.brewer + "</div>\n";
        for (var j=0; j < entry.beers.length; ++j) {
          var beer = entry.beers[j];
          html += '<input type="checkbox" name="checkbox-'+count+'" id="checkbox-'+count+'">';
          html += '<label for="checkbox-'+count+'" brewer="'+entry.brewer+'" beer="'+beer+'">'+beer+'</label>\n';
          count++;
        }
      }
    }
    cb && cb(null, html);
  });
}
