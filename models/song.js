var mongoose = require('mongoose');

var songSchema = new mongoose.Schema({
  name: String,
  chords: Array,
  author: {type: String, default: 'Anonymous'}
});

module.exports = mongoose.model('Song', songSchema);
