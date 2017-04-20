var request = require('request');
var db = require('../models');
// app.getArtist = function(artist, type) {
// 	$.ajax({
// 		url: "https://api.spotify.com/v1/search",
// 		method: "GET",
// 		dataType: "json",
// 		data: {
// 			type: 'artist',
// 			q: artist
// 		},
// 		success: handleSuccess,
// 		error: handleError
// 	});
// };



function getArtistIds (req, res) {
	//var artistId = req.body;
	console.log(req.params.artist);
	var artist = req.params.artist;
	request("https://api.spotify.com/v1/search?q=" + artist + "&type=artist", function(error, response, body) {
		console.log('error: ', error);
		console.log('statusCode:', response && response.statusCode);
		var parseBody = JSON.parse(body);

		var newSearch = new db.Search({
			name: parseBody.artists.items[0].name,
			id: parseBody.artists.items[0].id,
			genres: parseBody.artists.items[0].genres
		});
		newSearch.save(function (err, search){
			if (err) {
				return console.log("save error: ", err);
			}
			console.log("saved", search);
			//res.json(search);
		});

		console.log(parseBody.artists.items[0]);
		id = {artistId: parseBody.artists.items[0].id};
		console.log(parseBody.artists.items[0].id);
		console.log(id);
		res.json(id);


	});
}

// function postArtistIds (req, res) {
// 	var artist = req.params.artist;
// 	request("https://api.spotify.com/v1/search?q=" + artist + "&type=artist", function(error, response, body) {
// 		console.log('error: ', error);
// 		console.log('statusCode:', response && response.statusCode);
// 		var parseBody = JSON.parse(body);
// 		var newSearch = new db.Search({
// 			name: parseBody.artists.items[0].name,
// 			id: parseBody.artists.items[0].id,
// 			genres: parseBody.artists.items[0].genres
// 		});
// 		newSearch.save(function (err, search){
// 			if (err) {
// 				return console.log("save error: ", err);
// 			}
// 			console.log("saved", search);
// 			res.json(search);
// 		});

// 	});
	
// }

function getSearches (req, res) {
	db.Search.find()
	.exec(function (err, searches) {
		if (err) { return console.log("index error: " + err); }
		res.json(searches);
	});
}

function getOneSearch (req, res) {
	db.Search.findOne({_id: req.params.id}, function(err, search) {
		res.json(search);
	});
}





module.exports = {
  getArtistIds: getArtistIds,
  //postArtistIds: postArtistIds,
  getSearches: getSearches,
  getOneSearch: getOneSearch
};


