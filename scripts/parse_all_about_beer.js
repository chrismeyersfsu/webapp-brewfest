var fs = require('fs');
var util = require('util');
var request = require('request');

function getDataRaw(cb) {
    request.get('http://allaboutbeer.com/gather-for-beer/world-beer-festival/durham-nc/beer-line-up/', function(e, r, body) {
        cb(body);
    });
}

function parseBeerList(data) {
    //var tableRe = new RegExp('<table(.*?)>([\s\S]*?)</table>');
    var tableRe = /<table(.*?)>([\s\S]*?)<\/table>/;
    var list = {
        "General": []
    };


    var res = tableRe.exec(data);
    var tableData = res[2];

    var rows = tableData.split('\n');
    var tds = [];
    for (var i=0; i < rows.length; ++i) {
        var row = rows[i];
        var res = /<td(.*?)>(.*)/.exec(row);
        if (res) {
            tds.push(res[2]);
        }
    }

    var rows = [];
    for (var i=0; i < tds.length; ++i) {
        var td = tds[i];
        td = td.replace(/^(.*?)<\/td>/, '$1');
        td = td.replace(/<td(.*?)>(.*?)<\/td>/g, '\t$2');
        rows.push(td);
    }

    for (var i=0; i < rows.length; ++i) {
        var row = rows[i];
        var entry = row.split('\t');
        var brewer = entry.shift();
        var beer = [];

        // remove emtpy beer
        for (var j=0; j < entry.length; ++j) {
            if (entry[j] !== "") {
                beer.push(entry[j]);
            }
        }

        var brewerEntry = {
            'brewer': brewer,
            'beers': beer
        };
        list['General'].push(brewerEntry);
    }

    var list_str = JSON.stringify(list, null, 2);
    console.log(list_str);
}

getDataRaw(function(data) {
    parseBeerList(data);
});
