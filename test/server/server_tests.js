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
  before(function(done) {
    this.userData = {username: 'test name', password: '1234'};
    done();
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should GET users from the db', function(done){
    chai.request('url')
    .get('/users')
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
  });

  it('should GET songs from the db', function(done){
    chai.request(url)
    .get('/songs')
    .end(function(err, res){
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(Array.isArray(res.body)).to.eql(true);
      done();
    });
  });

  it('should be able to create a song', function(done) {
    done();
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
