var mongoose = require("mongoose");
mongoose.connect( //process.env.MONGODB_URI ||
				  //process.env.MONGOLAB_URI ||
				  //process.env.MONGOHQ_URL ||
				 "mongodb://localhost/songify");

module.exports.Artist = require("./artist.js");