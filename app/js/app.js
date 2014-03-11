'use strict';


// Declare app level module which depends on filters, and services
var recommenderApp = angular.module('recommenderApp', [
  'ngRoute',
  'recommenderControllers'
]);


recommenderApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'TopNMoviesCtrl'});
  $routeProvider.when('/movies/:movieId', {templateUrl: 'partials/view-movie.html', controller: 'ViewMovieCtrl'});
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
