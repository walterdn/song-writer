module.exports = function(app) {
  require('./song_resource')(app);
  require('./ngDraggable')(app);
};
