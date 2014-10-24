var fs = require('fs');
var util = require('util');

var beerRaw = fs.readFileSync('../fixtures/beer.txt');

var beerList = beerRaw.toString().split('\n');
var beginsWith = '^(0 |0 |&|& )';
var re = new RegExp(beginsWith);
var titleRe = new RegExp('^(\\+ )(.*)');
var beerRe = new RegExp(beginsWith + '(.*)');

var obj = {
	titles : []
};
var entry = {

};

var titleEntry = null;
var categoryEntry = null;
for (var i=0; i < beerList.length; ++i) {
	var entry = beerList[i];
	var title;
	var res;
	var category;

	res = re.exec(entry);
	if (res) {
		res = beerRe.exec(entry);
		//console.log("\t\tBeer: ", res[2]);
		if (categoryEntry) {
			categoryEntry.beers.push(res[2].trim());
		} else {
			console.error("Not category for beer:", res[2]);
		}
	} else {
		res = titleRe.exec(entry);
		if (res) {
			title = res[2];
			/* new title, push the old one */
			if (titleEntry) {
				obj.titles.push(titleEntry);
				if (categoryEntry) {
					titleEntry.categories.push(categoryEntry);
					categoryEntry = null;
				}
			}
			titleEntry = {
				title : title,
				categories : []
			};
			//console.log("Title: ", title);
		} else {
			category = entry;
			if (categoryEntry) {
				titleEntry.categories.push(categoryEntry);
			}
			categoryEntry = {
				category: category.trim(),
				beers : []
			};
			//console.log("\tCategory: ", entry);
		}
	}
}

titleEntry.categories.push(categoryEntry);
obj.titles.push(titleEntry);
titleEntry = categoryEntry = null;

//console.log(JSON.stringify(obj, null, 2));

var tabs = '\t\t\t\t\t';
var HTML = ''
var checkboxCount = 0;
var elementHTML = '';
for (var i=0; i < obj.titles.length; ++i) {
	var titleEntry = obj.titles[i];
	elementHTML = util.format('%s<div class="ui-bar ui-bar-a">%s</div>\n', tabs, titleEntry.title);
	HTML += elementHTML;
	for (var j=0; j < titleEntry.categories.length; ++j) {
		var catEntry = titleEntry.categories[j];
		elementHTML = util.format('%s<div class="ui-bar ui-bar-a">%s</div>\n', tabs, catEntry.category);
		HTML += elementHTML;
		for (var k=0; k < catEntry.beers.length; ++k) {
			var beerEntry = catEntry.beers[k];
			elementHTML = util.format('%s<input type="checkbox" name="checkbox-%s" id="checkbox-%s"><label for="checkbox-%s" brewer="%s" beer="%s">%s</label>\n',
			tabs,
			checkboxCount,
			checkboxCount,
			checkboxCount,
			catEntry.category,
			beerEntry,
			beerEntry);

			HTML += elementHTML;
			checkboxCount++;
		}
	}
}
console.log(HTML);
//console.log(beerList);


