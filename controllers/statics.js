function home(req, res) {  
  res.render('index');
}

function appPage(req, res) {
	res.render('app');
}

function userPage(req, res, next) {
	res.render('userpage');
}

module.exports = {
  home: home,
  appPage: appPage,
  userPage: userPage
};
