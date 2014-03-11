'use strict';

/* Directives */


angular.module('recommenderDirectives', []).
	directive('movieImage', ['$http', function($http) {
		function link(scope, element, attrs) {

			var imageWidth, imageHeight;
			// Update element and append new image with movie poster URL
			function updateImage(movieImageUrl) {
				element.append('<img src=' + movieImageUrl + ' width="' + imageWidth + '" height="' + imageHeight + '">');
			}

			// Get image from OMDBAPI site after formatting movie title
			function getImage(unformattedMovieTitle) {
				var movieTitle = unformattedMovieTitle.replace(/ /g, "+");
				//Get first occurence of '('' to find year
				var firstParenthesis = movieTitle.indexOf('(');
				var year = -1;
				if (firstParenthesis != -1) {
					year = movieTitle.substring(firstParenthesis+1, firstParenthesis + 5);
				}
				/* Check to see if there is a comma
				   E.g Shawshank Redemption, The (1994) => Shawshank Redemption
				*/
				var firstComma = movieTitle.indexOf(',');
				movieTitle = (firstComma == -1) ? movieTitle : movieTitle.substring(0,firstComma);

				var friendlyMovieTitle = (firstParenthesis == -1) ? movieTitle : movieTitle.substring(0, firstParenthesis-1);
				var request = (year == -1) ? friendlyMovieTitle : friendlyMovieTitle + "&y=" + year;
				console.log("Request is " + request);
				//Use OMDBApi to request movie image using friendly title and year
				$http.get('http://www.omdbapi.com/?t=' + request).success(function(movieData) {
					console.log(movieData);
					if (movieData.Response == "False") {
						console.log("Response is false os changing poster");
						movieData.Poster = "http://localhost:8000/app/img/no-movie-poster.png"
					}
					updateImage(movieData.Poster);
				});
			}
			// Wait for the movieImage attribute to be loaded to extract movie title string
			scope.$watch(attrs.movieImage, function(value) {
				if (value != undefined) {
					imageWidth = attrs.imageWidth;
					imageHeight = attrs.imageHeight;
					getImage(value);	
				}
			});
		}
		return {
			link: link
		}
	}]);
