var express = require('express');
var router = express.Router();
var unirest = require('unirest');

var auth = function(req, res, next) {
	if (req.session && isUserAuthorised(req.session)) {
		return next();
	} else {
		res.redirect('/login');
	}
};

router.get('/', auth, function(req, res, next) {
	showProfessors(res);
});

module.exports = router;

function isUserAuthorised(session) {
	return session.user
}

function showProfessors(res) {
	var title = 'Proftracker';
	unirest
		.get('https://stormy-sea-93132.herokuapp.com/professors/schedules')
		.end(function (response) {
			var model = {
				title: 'Proftracker',
				professors: []
			};

			if(response.body.status == 'SUCCESS') {
				var professors = response.body.payload;
				professors.forEach(function(professor) {
					model.professors.push({
						name: professor.firstName + ' ' + professor.middleName + ' ' + professor.lastName, 
						department: professor.department, 
						profile: professor.profilePictureUrl,
						schedules: professor.schedules
					});
				});
			}

			res.render('index', model);
		});
}
