var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);
var expect = chai.expect;

process.env.MONGO_URI = 'mongodb://localhost/songs_test';
var server = require(__dirname + '/../../server.js');
var mongoose = require('mongoose');
var url = 'localhost:3000/api';
var Song = require(__dirname + '/../../models/song');

describe('song routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a song', function(done) {
    var songData = {name: 'test song'};
    chai.request(url)
    .post('ongs')
    .send(songData)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res.body.name).to.eql('test song');
      expect(res.body).to.have.property('_id');
      done();
    });
  });

  it('should be able to retrieve listed songs', function(done) {
    done();
  });

  describe('routes that have a song already registered', function() {
    beforeEach(function(done) {
      var testSong = new Song({chords: ['C','F','G','C']});
      testSong.save(function(err, data) {
        expect(err).to.eql(null);
        this.testSong = data;
        done();
      }.bind(this));
    });

    it('should be able to update a song', function(done) {
      chai.request(url)
      done();
    });

    it('should be able to delete a song', function(done) {
      done();
    });

  });
});
