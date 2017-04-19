function home(req, res) {  
  res.render('index');
}

function appPage(req, res) {
	res.render('app');
}

module.exports = {
  home: home,
  appPage: appPage
};
