var express = require('express');
var router = express.Router();

var board = [0,0,0,0,0,0,0,0,0];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tic Tac Toe' });
});

router.get('/board', function(req, res, next) {
	res.json(board);
});

router.get('/setMove', function(req, res, next) {
	var slot = req.query.slotId;
	var player = req.query.playerId;

	console.log(slot + " " + player + " " + board)

	board[slot] = parseInt(player);

  res.json({log:'move made'});
});

router.get('/newGame', function(req, res, next) {
	board = [0,0,0,0,0,0,0,0,0];

	res.json({log:'game cleared'});
});

module.exports = router;
