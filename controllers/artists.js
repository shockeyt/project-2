var request = require('request');

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
		id = {artistId: parseBody.artists.items[0].id};
		console.log(parseBody.artists.items[0].id);
		console.log(id);
		res.json(id);
	});
}








module.exports = {
  getArtistIds: getArtistIds

};