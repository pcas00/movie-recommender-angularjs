'use strict';

/* Services */

var recommenderServices = angular.module('recommenderServices', ['ngResource']);
 
recommenderServices.factory('Movie', ['$resource',
  function($resource){
    return $resource('http://localhost:8080/movie/:movieId', {}, {});
  }]);
