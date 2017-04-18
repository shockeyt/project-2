//setting up Express
var express = require('express');
var app = express();
var db = require('./models');
//setting up bodyparser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//hardcode test data

// var test = [
// {
// 	artist: "Spoon",
// 	track: "Fitted Shirt",
// 	album: "Kill the Moonlight"
// },
// {
// 	artist: "Autlux",
// 	track: "Sugarless",
// 	album: "Future Perfect"
// },
// {
// 	artist: "Pixies",
// 	track: "Wave of Mutilation",
// 	album: "Doolittle"
// },
// {
// 	artist: "Interpol",
// 	track: "PDA",
// 	album: "Turn on the Bright Lights"
// },
// ];



app.get('/', function (req, res) {
	res.json({message: 'hello world'});
});

//*****REST ROUTES******

//show all artists
app.get('/api/artists', function (req, res) {
	db.Artist.find()
	.exec(function (err, artists) {
		if (err) { return console.log("index error: " + err); }
		res.json(artists);
	});
});

//show one artist
app.get('/api/artists/:id', function (req, res) {
	db.Artist.findOne({_id: req.params.id}, function(err, artist) {
		res.json(artist);
	});
});

//create new artist
app.post('/api/artists', function (req, res) {
	var newArtist = new db.Artist({
		artist: req.body.artist,
		track: req.body.track,
		album: req.body.album
	});
	newArtist.save(function(err, artist) {
		if (err) {
			return console.log("save error: " + err);
		}
		console.log("saved ", artist.artist);
		res.json(artist);
	});
});

//update artist
app.put('/api/artists/:id', function (req, res) {

	var id = req.params.id;

	db.Artist.findOne({_id: id}, function(err, artist) {
		if (err) res.json({message: 'find error: ' + err});
		if (req.body.name) artist.artist = req.body.artist;
		if (req.body.track) artist.track = req.body.track;
		if (req.body.album) artist.album = req.body.album;

		artist.save(function(err) {
			if (err) res.json({message: 'could not update'});
			res.json({message: 'artist updated'});
		});
	});
});

//delete artist
app.delete('/api/artists/:id', function (req, res) {
	var id = req.params.id;
	db.Artist.findOneAndRemove({_id: id}, function(err, deletedArtist) {
		console.log("deleted ", id);
		res.json(deletedArtist);
	});
});





//HARD CODED TESTS
//show index

// app.get('/api/artists', function artistIndex(req, res) {
// 	res.json({test : test});
// });


//SERVER
//Listening on port 3000
app.listen(process.env.PORT || 3000, function () {
	console.log('Express server running on http://localhost:3000/');
});