var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArtistSchema = new Schema({
	artist: String,
	track: String,
	album: String
});

var Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;