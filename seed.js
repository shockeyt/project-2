

var db = require('./models');

db.Artist.remove({}, function(err, artists) {
	if (err) {
		console.log("Error: ", err);
		}
	console.log('removed all artists');
});

var test = [
{
	artist: "Spoon",
	track: "Fitted Shirt",
	album: "Kill the Moonlight"
},
{
	artist: "Autlux",
	track: "Sugarless",
	album: "Future Perfect"
},
{
	artist: "Pixies",
	track: "Wave of Mutilation",
	album: "Doolittle"
},
{
	artist: "Interpol",
	track: "PDA",
	album: "Turn on the Bright Lights"
},
];


db.Artist.create(test, function(err, artists) {
	if (err) {
		console.log("Error:", err);
	} else {
	console.log("Created new artists", artists);
	process.exit();
	}
});