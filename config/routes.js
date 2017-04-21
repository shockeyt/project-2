var db = require('../models');
var express = require('express');
var router = express.Router();
// Parses information from POST
var bodyParser = require('body-parser');
// Used to manipulate POST methods
var methodOverride = require('method-override');
var passport = require("passport");
var usersController = require('../controllers/users');
var staticsController = require('../controllers/statics');
var artistsController = require('../controllers/artists');

function authenticatedUser(req, res, next) {
	//if user is authenticated, we continue
	if (req.isAuthenticated()) return next();
	//otherwise req is redirected to home
	res.redirect('/');
}

router.route('/')
  .get(staticsController.home);

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup)

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin)

router.route('/secret')
  .get(authenticatedUser, usersController.secret)  

router.route("/logout")
  .get(usersController.getLogout)


router.route('/songify')
  .get(staticsController.appPage);
  //login to access this page
  //.get(authenticatedUser, staticsController.appPage);

router.route('/userpage')
  .get(staticsController.userPage)
router.route('/userpage/searches')
  .get(authenticatedUser, artistsController.userSearchData)

router.route('/songify/:artist')
  .get(artistsController.getArtistIds)
  //.post(artistsController.postArtistIds)

router.route('/searches')
  .get(authenticatedUser, artistsController.getSearches)
  //.post(authenticatedUser, artistsController.postSearch)
  .post(artistsController.postSearch)

router.route('/searches/:id')
  .get(artistsController.getOneSearch)
  .delete(artistsController.deleteSearch)

 router.route('/user')
   .get(usersController.userData)

 router.route('/mysearches')
   //.get(authenticatedUser, artistsController.userSearchData)

// router.get('/', function (req, res) {
// 	res.json({message: 'hello world'});
// });

//*****REST ROUTES******

//show all artists
router.get('/api/artists', function (req, res) {
	db.Artist.find()
	.exec(function (err, artists) {
		if (err) { return console.log("index error: " + err); }
		res.json(artists);
	});
});

//show one artist
router.get('/api/artists/:id', function (req, res) {
	db.Artist.findOne({_id: req.params.id}, function(err, artist) {
		res.json(artist);
	});
});

//create new artist
router.post('/api/artists', function (req, res) {
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
router.put('/api/artists/:id', function (req, res) {

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
router.delete('/api/artists/:id', function (req, res) {
	var id = req.params.id;
	db.Artist.findOneAndRemove({_id: id}, function(err, deletedArtist) {
		console.log("deleted ", id);
		res.json(deletedArtist);
	});
});



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

//HARD CODED TESTS
//show index

// app.get('/api/artists', function artistIndex(req, res) {
// 	res.json({test : test});
// });





//export routes
module.exports = router;