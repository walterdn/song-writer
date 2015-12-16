var express = require('express');
var bodyParser = require('body-parser').json();
var Song = require(__dirname + '/../models/song');
var eatAuth = require(__dirname + '/../lib/eat_auth');
var handleError = require(__dirname + '/../lib/handle_server_error');

var songsRouter = module.exports = exports = express.Router();

songsRouter.post('/songs', eatAuth, function(req, res) {
  var newSong = new Song(req.body);
  newSong.authorId = req.user._id;
  newSong.author = req.user.username;

  newSong.save(function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});
