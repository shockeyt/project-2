//setting up Express
var express = require('express');
var app = express();
var db = require('./models');
//setting up bodyparser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ exteded: true}));



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