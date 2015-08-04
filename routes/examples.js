var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('examples', { title: 'Examples' });
});

router.get('/hello', function(req, res, next) {
	res.render('hello', { title: 'Hello World' });
});

router.get('/hello-2', function(req, res, next) {
	res.render('hello-2', { title: 'Hello World' });
});

module.exports = router;