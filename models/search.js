var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SearchSchema = new Schema({
	name: String,
	trackId: String,
	genres: [ String ]
});

var Search = mongoose.model('Search', SearchSchema);

module.exports = Search;