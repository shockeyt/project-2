var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Search = require('./search');

var User = mongoose.Schema({
  local : {
    email        : String,
    password     : String,
  },
  searchHistory: [ Search.schema ]
});

//hashes password and saves as encrypted
  User.methods.encrypt = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

User.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', User);