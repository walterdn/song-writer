var express = require('express');
var bodyParser = require('body-parser').json();
var Song = require(__dirname + '/../models/song');
var eatAuth = require(__dirname + '/../lib/eat_auth');
var handleError = require(__dirname + '/../lib/handle_server_error');

var songsRouter = module.exports = exports = express.Router();
songsRouter.use(bodyParser);

bearsRouter.get('/allsongs', function(req, res) {
  Bear.find({}, function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

songsRouter.post('/songs', eatAuth, function(req, res) {
  var newSong = new Song(req.body);
  newSong.authorId = req.user._id;
  newSong.author = req.user.username;

  newSong.save(function(err, data) {
    if (err) return handleError(err, res);

    res.json(data);
  });
});

songsRouter.put('/songs/:id', eatAuth, function(req, res) {
  var songData = req.body;
  delete songData._id;
  Song.update({_id: req.params.id}, songData, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'Song Updated'});
  });
});


songsRouter.delete('/songs/:id', eatAuth, function(req, res) {
  Song.remove({_id: req.params}, function(err) {
    if (err) return handleError(err, res);

    res.json({msg: 'Song Deleted'});
  });
});
