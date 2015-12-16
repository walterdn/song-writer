var express = require('express');
var app = express();
var fs = require('fs');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/song_app');

app.use(express.static('build'));

app.get('/', function (req, res) {
  res.send((fs.readFileSync(__dirname + '/build/index.html')).toString());
});

app.listen(3000, function() {
  console.log('Server up.');
});

