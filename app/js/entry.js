require('angular/angular');
require('angular-route');
require('angular-cookies');
require('angular-base64');
var angular = window.angular;

var songWriterApp = angular.module('SongWriterApp', ['ngRoute', 'ngCookies', 'base64']);
require('./services/services')(songWriterApp);
require('./controllers/controllers')(songWriterApp);
require('./directives/directives')(songWriterApp);

require('./songs/songs')(songWriterApp);
require('./auth/auth')(songWriterApp);

songWriterApp.config(['$routeProvider', function($route) {
  $route
    .when('/songs', {
      templateUrl: '/templates/songs_view.html',
      controller: 'SongsController'
    })
    .when('/signup', {
      templateUrl: '/templates/popup_directive_template.html',
      controller: 'SignupController'
    })
    .when('/signin', {
      templateUrl: '/templates/popup_directive_template.html',
      controller: 'SigninController'
    })
    .when('/allsongs', {
      templateUrl: '/templates/all_songs.html',
      controller: 'AllSongsController'
    })
    .otherwise({
      redirectTo: '/signup'
    })
}]);
