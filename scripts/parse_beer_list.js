var fs = require('fs');

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
			categoryEntry.beers.push(res[2]);
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
				category: category,
				beers : []
			};
			//console.log("\tCategory: ", entry);
		}
	}
}

titleEntry.categories.push(categoryEntry);
obj.titles.push(titleEntry);
titleEntry = categoryEntry = null;

console.log(JSON.stringify(obj, null, 2));
//console.log(beerList);


