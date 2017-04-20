var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SearchSchema = new Schema({
	name: String,
	id: String,
	genres: [ String ]
});

var Search = mongoose.model('Search', SearchSchema);

module.exports = Search;