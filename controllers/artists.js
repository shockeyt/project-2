var request = require('request');
var db = require('../models');



//GET ids and send to front end
function getArtistIds (req, res, next) {
	var userId = req.user._id;
	console.log("user id is:", userId);
	console.log(req.params.artist);
	var artist = req.params.artist;
	request("https://api.spotify.com/v1/search?q=" + artist + "&type=artist", function(error, response, body) {
		console.log('error: ', error);
		console.log('statusCode:', response && response.statusCode);
		var parseBody = JSON.parse(body);
		//create new search
		var newSearch = new db.Search({
			name: parseBody.artists.items[0].name,
			trackId: parseBody.artists.items[0].id,
			genres: parseBody.artists.items[0].genres
		});
		//save search to overall search DB
		newSearch.save(function (err, search){
			if (err) {
				return console.log("save error: ", err);
			}
			console.log("saved", search);
			//res.json(search);
		});
		//find current user
		db.User.findOne({ _id: userId }, function (err, user) {
			user.searchHistory.push(newSearch);
			//save new search to current user DB
			user.save(function (err, savedSearch) {
				if (err) {
					return console.log(err);
				}
				console.log('saved ' + savedSearch);
			});
		});
		

		console.log(parseBody.artists.items[0]);
		id = {artistId: parseBody.artists.items[0].id};
		console.log(parseBody.artists.items[0].id);
		console.log(id);
		res.json(id);


	});
}

//finds single user data search history
function userSearchData (req, res, next) {
	var userId = req.user._id;

	db.User.findOne({ _id: userId }, function (err, user) {
		console.log(user.searchHistory);
		res.json(user.searchHistory);
	});
}

//removes specific search data for user
function deleteSearchData (req, res, next) {
	var userId = req.user._id;
	var songId = req.params.searchId;
	console.log("params are: ", songId);

	var searchHist = req.user.searchHistory;
	var searchArray = [];
	searchHist.forEach(function (tracks) {
		searchArray.push(tracks.trackId);
	});
	console.log("user track ids are: ", searchArray);
	//console.log(req.body);


	db.User.findOne({ _id: userId }, function (err, user) {
		//if (user.searchHistory._id === res.
		user.searchHistory.forEach(function(track, index) {
			if (track.trackId === songId) {
				console.log("match found");
				user.searchHistory.splice(index, 1);
				user.save();

			} else {
				console.log("not a match");
			}
		});

		
		
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

//****REST ROUTES FOR SEARCH DATA****

//GET INDEX
function getSearches (req, res) {
	db.Search.find()
	.exec(function (err, searches) {
		if (err) { return console.log("index error: " + err); }
		res.json(searches);
	});
}

//GET ONE
function getOneSearch (req, res) {
	db.Search.findOne({_id: req.params.id}, function(err, search) {
		res.json(search);
	});
}

//POST SEARCH
function postSearch (req, res) {
	var newSearch = new db.Search({
		name: req.body.name,
		trackId: req.body.id,
		genres: req.body.genres
	});
	newSearch.save(function(err, search) {
		if (err) {
			return console.log("save error: " + err);
		}
		console.log("saved ", search);
		res.json(search);
	});
}

//PUT SEARCH
function editOneSearch (req, res) {
	var id = req.params.id;

	db.Search.findOne({_id: id}, function(err, search) {
		if (err) res.json({message: 'find error: ' + err});
		if (req.body.name) search.name = req.body.name;
		if (req.body.trackId) search.trackId = req.body.trackId;
		if (req.body.genres) search.genres = req.body.genres;

		search.save(function(err) {
			if (err) res.json({message: 'could not update'});
			res.json({message: 'search updated'});
		});
	});

}

//DELETE SEARCH
function deleteSearch (req, res) {
	var searchId = req.params.id;
	console.log(searchId);
	db.Search.findOneAndRemove({ _id: searchId }, function(err, deletedSearch) {
		if (err) {
			return console.log("delete error: " + err);
		}
		console.log("deleted ", searchId);
		res.json(deletedSearch);
	});
}


module.exports = {
  getArtistIds: getArtistIds,
  //postArtistIds: postArtistIds,
  getSearches: getSearches,
  userSearchData: userSearchData,
  deleteSearchData: deleteSearchData,
  getOneSearch: getOneSearch,
  postSearch: postSearch,
  editOneSearch: editOneSearch,
  deleteSearch: deleteSearch
};


