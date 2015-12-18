var mongoose = require('mongoose');

var songSchema = new mongoose.Schema({
  name: String,
  chords: Array,
  author: String
});

module.exports = mongoose.model('Song', songSchema);
