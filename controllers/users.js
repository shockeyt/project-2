var passport = require("passport");

// GET /signup
  function getSignup(request, response, next) {
    response.render('signup.ejs', { message: request.flash('signupMessage') });
  }

// POST /signup
  function postSignup(request, response, next) {
    var signupStrategy = passport.authenticate('local-signup', {
      successRedirect : '/',
      failureRedirect : '/signup',
      failureFlash : true
    });

    return signupStrategy(request, response, next);
  }

// GET /login
function getLogin(request, response, next) { 
	response.render('login.ejs', {message: request.flash('loginMessage')});
}

// POST /login 
function postLogin(request, response, next) {
	var loginStrategy = passport.authenticate('local-loggins', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	});
	return loginStrategy(request, response, next);
}

// GET /logout
function getLogout(request, response, next) {
	request.logout();
	response.redirect('/');
}

// Restricted page
function secret(request, response, next){
	response.json("secrets sink ships...");
}

module.exports = {
  getLogin: getLogin,
  postLogin: postLogin ,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
  secret: secret
};