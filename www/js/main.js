$(document).ready(function() {
	for (var i=0; i < data.titles.length; ++i) {
		var checkboxHTML = '<input type="checkbox" name="checkbox-mini-0" id="checkbox-mini-0" data-mini="true"><label for="checkbox-mini-0">' + data.titles[i].title + '</label>';
		$('#list').append('<li> ' + checkboxHTML + '</li>');
	}
});


var data = {
  "titles": [
    {
      "title": "General Admission",
      "categories": [
        {
          "category": "Abita",
          "beers": [
            "Purple Haze",
            "Pecan",
            "Jockamo",
            "Amber"
          ]
        },
        {
          "category": "Angry Orchard ",
          "beers": [
            "Crisp Apple",
            "Traditional Dry ",
            "Apple Ginger"
          ]
        },
        {
          "category": "Anheuser-Busch",
          "beers": [
            "Stella ",
            "Leffe ",
            "Hoegaarden",
            "Beck's",
            "Beck's Octoberfest ",
            "Quilmes",
            "Pacena ",
            "Pilsen",
            "Medalla Light",
            "Budweiser",
            "Project 12"
          ]
        },
        {
          "category": "Bells",
          "beers": [
            "Kalamazoo Stout ",
            "Two Hearted",
            "Oberon"
          ]
        },
        {
          "category": "Blue Moon",
          "beers": [
            "Blue Moon ",
            "Pale Ale",
            "Winter Abbey"
          ]
        },
        {
          "category": "Blue Point Brewing ",
          "beers": [
            "Toasted Lager",
            "Hoptical Illusion ",
            "RastafaRye",
            "White IPA"
          ]
        },
        {
          "category": "Boulder",
          "beers": []
        },
        {
          "category": "Mojo",
          "beers": [
            "Hazed and Infused ",
            "Seasonal"
          ]
        },
        {
          "category": "Brooklyn",
          "beers": [
            "Lager",
            "Pennant Ale",
            "Oktoberfest",
            "Black Choc. Stout ",
            "Pumpkin Ale"
          ]
        },
        {
          "category": "Capital Brewing",
          "beers": [
            "Wisconsin Amber ",
            "Supper Club"
          ]
        },
        {
          "category": "Cigar City ",
          "beers": [
            "Jai Alai ",
            "Maduro"
          ]
        },
        {
          "category": "Crazy Mountain",
          "beers": [
            "Mountain Livin",
            "Lava Lake",
            "Amber Ale"
          ]
        },
        {
          "category": "Crispin",
          "beers": [
            "Natural Original ",
            "Honey Crisp"
          ]
        },
        {
          "category": "Dogfish Head ",
          "beers": [
            "My Antonia ",
            "Burton Baton"
          ]
        },
        {
          "category": "Eerie",
          "beers": [
            "Railbender",
            "DeRailed",
            "Misery Bay IPA",
            "Engine 15"
          ]
        },
        {
          "category": "Florida Beer Co. ",
          "beers": [
            "Florida Lager",
            "K. W. Sunset Ale "
          ]
        },
        {
          "category": "OK. W.",
          "beers": []
        },
        {
          "category": "Southernmost Wheat ",
          "beers": [
            "Swamp Ape IPA"
          ]
        },
        {
          "category": "Foxbarrel Cider ",
          "beers": [
            "Pacific pear",
            "Blackberry"
          ]
        },
        {
          "category": "Green Flash",
          "beers": [
            "West Coast IPA ",
            "Rayon Vert",
            "Hop Head Red ",
            "Double Stout",
            "Le Freak",
            "Imperial IPA",
            "Trippel",
            "San Diego Saison"
          ]
        },
        {
          "category": "Green Room",
          "beers": [
            "Pablo Bch Pale Ale"
          ]
        },
        {
          "category": "Guiness",
          "beers": [
            "Harp",
            "Guine ss",
            "Black Lager ",
            "Foreign Extra"
          ]
        },
        {
          "category": "Henry Weinhards ",
          "beers": [
            "Private Reserve ",
            "Amber Lager ",
            "IPA"
          ]
        },
        {
          "category": "Highland",
          "beers": [
            "Thunderstruck "
          ]
        },
        {
          "category": "Coffee Porter",
          "beers": [
            "Black Mocha",
            "Kashmir IPA"
          ]
        },
        {
          "category": "JW Dundee",
          "beers": []
        },
        {
          "category": "OEnglish Style Ale ",
          "beers": [
            "Porter",
            "Pale Ale",
            "IPA"
          ]
        },
        {
          "category": "Kona",
          "beers": [
            "Longboard"
          ]
        },
        {
          "category": "OPipeline Porter ",
          "beers": [
            "Big Wave"
          ]
        },
        {
          "category": "Lazy Magnolia ",
          "beers": [
            "Southern Pecan ",
            "Deep South"
          ]
        },
        {
          "category": "Leinkugels",
          "beers": [
            "Lemon Berry "
          ]
        },
        {
          "category": "Shandy",
          "beers": [
            "Snow Drift Vanilla ",
            "Porter"
          ]
        },
        {
          "category": "Magic Hat",
          "beers": [
            "#9",
            "Winter: Encore",
            "Heart of Darkness",
            "Mangers"
          ]
        },
        {
          "category": "Merchant du Vin ",
          "beers": [
            "Samuel Smith "
          ]
        },
        {
          "category": "Choc. Stout",
          "beers": [
            "Samuel Smith "
          ]
        },
        {
          "category": "Organic Cider",
          "beers": [
            "Lindemans "
          ]
        },
        {
          "category": "Framboise",
          "beers": []
        },
        {
          "category": "Momos",
          "beers": [
            "Hopnosis Dbl. IPA ",
            "Big Papa Porter ",
            "011ie's Irish Red ",
            "Hop Harvest Fresh "
          ]
        },
        {
          "category": "Hop IPA",
          "beers": []
        },
        {
          "category": "Narragansett ",
          "beers": [
            "Lager",
            "Cream"
          ]
        },
        {
          "category": "Native",
          "beers": [
            "Eleven Brown ",
            "Native Lager",
            "Newcastle"
          ]
        },
        {
          "category": "Oskar Blues",
          "beers": [
            "Dales Pale Ale ",
            "Mammas Little "
          ]
        },
        {
          "category": "Yellow Pils",
          "beers": [
            "G'night",
            "Palm",
            "Peroni"
          ]
        },
        {
          "category": "Pilsner Urquell",
          "beers": []
        },
        {
          "category": "Proof Brewing ",
          "beers": [
            "Rye Ale",
            "IPA",
            "Pale Ale",
            "Oatmeal Stout"
          ]
        },
        {
          "category": "Red Brick ",
          "beers": [
            "Hoplanta ",
            "Blonde",
            "Redds Apple Ale"
          ]
        },
        {
          "category": "Redhook",
          "beers": [
            "ESB",
            "IPA",
            "Winterhook"
          ]
        },
        {
          "category": "Sam Adams",
          "beers": [
            "Black and Brew ",
            "Chocolate Bock ",
            "Tasman Red",
            "Oaked Porter",
            "Boston Lager"
          ]
        },
        {
          "category": "Sea Dog ",
          "beers": [
            "Blue"
          ]
        },
        {
          "category": "Shiner Bock",
          "beers": [
            "Shiner Bock",
            "Shiner Black",
            "Seasonal Winter "
          ]
        },
        {
          "category": "Shipyard",
          "beers": [
            "Monkey Fist IPA ",
            "Prelude"
          ]
        },
        {
          "category": "Shocktop",
          "beers": [
            "Shocktop",
            "Raspberry",
            "End of the World ",
            "Pumpkin"
          ]
        },
        {
          "category": "Sierra Nevada",
          "beers": [
            "Pale Ale ",
            "Torpedo ",
            "Celebration",
            "Bigfoot ",
            "Tumbler"
          ]
        },
        {
          "category": "Southern Tier ",
          "beers": [
            "IPA",
            "2xIPA",
            "Unearthly ",
            "Iniquity ",
            "Phin and Matt's",
            "2XStout ",
            "Porter",
            "Krampus",
            "Pumking"
          ]
        },
        {
          "category": "Stone",
          "beers": [
            "IPA",
            "Levitation",
            "Arrogant Bastard"
          ]
        },
        {
          "category": "Summit",
          "beers": [
            "Extra Pale Ale ",
            "Horizon Red ",
            "Saga IPA"
          ]
        },
        {
          "category": "Swamphead",
          "beers": [
            "Cottonmouth ",
            "Midnight Oil ",
            "Stump Knocker ",
            "Big Nose",
            "Wild Night"
          ]
        },
        {
          "category": "Sweetwater",
          "beers": []
        },
        {
          "category": "420",
          "beers": [
            "IPA ",
            "Blue ",
            "Low\"Rye\"der"
          ]
        },
        {
          "category": "Terrapin",
          "beers": [
            "Easy Rider",
            "Monks Revenge ",
            "Hopsecutioner",
            "Golden Ale"
          ]
        },
        {
          "category": "Three Palms",
          "beers": [
            "Ruby Pogo Red "
          ]
        },
        {
          "category": "Twisted Pine",
          "beers": [
            "Billie Chillies",
            "Hoppy Boy",
            "Big Shot Espresso"
          ]
        },
        {
          "category": "Victory",
          "beers": [
            "Golden Monkey",
            "Prima Pils ",
            "Storm King ",
            "Hop Wallop",
            "Warsteiner"
          ]
        },
        {
          "category": "Well's",
          "beers": [
            "Banana Bread",
            "Dbl. Choc. Stout"
          ]
        },
        {
          "category": "Widmer Brothers ",
          "beers": [
            "Drifter",
            "Hefeweizen",
            "Rotator IPA",
            "Omission Lager",
            "Omission Pale Ale ",
            "Brrr"
          ]
        }
      ]
    },
    {
      "title": "VIP Beers",
      "categories": [
        {
          "category": "Woodchuck Cider ",
          "beers": [
            "Amber",
            "Pear",
            "Granny",
            "Fall",
            "Pumpkin"
          ]
        }
      ]
    },
    {
      "title": "VIP Local Brew",
      "categories": [
        {
          "category": "VIP",
          "beers": [
            "Abita Double Vanilla Dog",
            "Brooklyn Local 1 ",
            "Brooklyn Local 2 ",
            "Capital Brewing Autumnal Fire",
            "Dogfish Head Namaste",
            "Dogfish Head Theobroma",
            "Proof Vanilla Bean & Bourbon Oak Treated Oatmeal Stout ",
            "Sam Adams Imperial White",
            "Sam Adams Wee Heavy",
            "Sam Adams Norse Legend",
            "Siera Nevada Ovila ",
            "Terrapin So Fresh and So Green",
            "Terrapin Big Hoppy Monster",
            "Widmer Brothers Brrbon",
            "Widmer Brothers MarionBerry Gose ",
            "Widmer Brothers Old Embalmer",
            "Widmer Brothers SouthXNW",
            "Woodchuck Farmhouse"
          ]
        },
        {
          "category": "Beerd",
          "beers": [
            "Graff-tastic Voyage ",
            "\"3 Nines\" Cherry Bourbon Stout"
          ]
        },
        {
          "category": "Broken Cog",
          "beers": [
            "Bier Van Huis Belgian Pale",
            "Potted Prince ESB"
          ]
        },
        {
          "category": "GrassLands",
          "beers": [
            "LeeRoy the Red Imperial Amber",
            "DC Honey Blonde ",
            "Secale Cereale (Rye) Saison",
            "Captain Quint's Hard Cider"
          ]
        },
        {
          "category": "Hamerhead's Homebrew",
          "beers": [
            "Thunderstorm "
          ]
        },
        {
          "category": "American IPA",
          "beers": [
            "Rainwater Rye"
          ]
        },
        {
          "category": "Pimlico Brewery ",
          "beers": [
            "Over the Line Belgian IPA",
            "Fine Fraulein Hefeweizen"
          ]
        },
        {
          "category": "TDO Brewing",
          "beers": [
            "Sukie's IPA",
            "Bella's American Amber"
          ]
        },
        {
          "category": "Zenoz",
          "beers": [
            "Imperial Stout ",
            "Spiced Cider"
          ]
        }
      ]
    }
  ]
}