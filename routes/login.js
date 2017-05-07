var express = require('express');
var router = express.Router();
var unirest = require('unirest');

router.get('/', function(req, res, next) {
	var model = {
		title: 'Proftracker'
	}

	res.render('login', model);
});

router.post('/authenticate', function(req, res, next) {
	var user = {
		userType: req.body.type, 
		email: req.body.email, 
		password: req.body.password
	}

	unirest
		.post('https://stormy-sea-93132.herokuapp.com/authentication/login')
		.headers({'Content-Type': 'application/json'})
		.send(user)
		.end(function (response) {
			if (response.body.status == 'SUCCESS') {
				console.log('success');
				req.session.user = req.body.email;
				res.redirect('/');
			} else {
				res.redirect('/login?failed');
			}
		});
});

module.exports = router;
