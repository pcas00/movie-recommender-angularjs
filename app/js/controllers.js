'use strict';

/* Controllers */

var recommenderControllers = angular.module('recommenderControllers', []);

recommenderControllers.controller('TopNMoviesCtrl', ['$scope', '$http', function($scope, $http) {

$scope.getImage = function(unformattedMovieTitle) {
				//console.log("Get image");
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
				//console.log("Request is " + request);
				//Use OMDBApi to request movie image using friendly title and year
				return request;
				//console.log("movie image is: " + movieImage);
	}
  /*$scope.userProfile = undefined;
  $scope.hasUserProfile = false;
  $scope.isSignedIn = false;
  $scope.immediateFailed = false;*/

  /*$scope.signOut = function() {
	  $scope.userProfile = undefined;
	  $scope.hasUserProfile = false;
	  $scope.isSignedIn = false;
	  $scope.immediateFailed = false;
  }*/	

	/*$scope.signIn = function(authResult) {
	    $scope.$apply(function() {
	      $scope.processAuth(authResult);
		});
	}*/
	  
	  /*$scope.processAuth = function(authResult) {
	    $scope.immediateFailed = true;
	    if ($scope.isSignedIn) {
	      return 0;
	    }
	    if (authResult['access_token']) {
	      $scope.immediateFailed = false;
	      // Successfully authorized, create session
	      console.log("Logged in with: " + angular.toJson(authResult));
	      gapi.client.load('plus','v1', function(){
			 var request = gapi.client.plus.people.get({
			   'userId': 'me'
			 });
			 request.execute(function(resp) {
			  	console.log("User id is: " + resp['id']);
 			  });
		  });
	      /*PhotoHuntApi.signIn(authResult).then(function(response) {
	        $scope.signedIn(response.data);
	      });*/
	    /*} else if (authResult['error']) {
	      if (authResult['error'] == 'immediate_failed') {
	        $scope.immediateFailed = true;
	      } else {
	        console.log('Error:' + authResult['error']);
	      }
	    }
	  }*/

	/*$scope.renderSignIn = function() {
		gapi.signin.render('myGsignin', {
		      'callback': $scope.signIn,
		      'clientid': '735820567734-melje1kfv51kthu56id1knllcekfn2kp.apps.googleusercontent.com',
		      //'requestvisibleactions': Conf.requestvisibleactions,
		      'scope': 'https://www.googleapis.com/auth/plus.login',
		      'cookiepolicy': 'single_host_origin',
		      // Remove the comment below if you have configured
		      // appackagename in services.js
		      //'apppackagename': Conf.apppackagename,
		      'theme': 'dark',
		    });
	}

	$scope.start = function() {
    	$scope.renderSignIn();
    }*/
$http.get('http://localhost:8080/movies/ii/db/similarity/loglikelihood/user/6016').success(function(data) {
		//For each movie, append a movie image from IMDB image API
		angular.forEach(data.movies, function(value, key) {
			value.rating = Math.round(value.rating*10)/10;
			var movieTitle = value.title.replace(/ /g, "+");
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
			//Use OMDBApi to request movie image using friendly title and year
			console.log(request);
			$http.get('http://www.omdbapi.com/?t=' + request).success(function(movieData) {
				console.log("Poster is: " + movieData.Poster);
				if (movieData.Poster == "N/A" || !movieData.Poster) {
					value.image = "http://localhost:8000/app/img/no-movie-poster.png";
				} else {
					value.image = movieData.Poster;
				}
			});

		});

		$scope.persMovies = data.movies;
		//console.log(data.movies);
	});

	$http.get('http://localhost:8080/movies/').success(function(data) {
		//For each movie, append a movie image from IMDB image API
		angular.forEach(data.movies, function(value, key) {
			value.rating = Math.round(value.rating*10)/10;
			var movieTitle = value.title.replace(/ /g, "+");
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
			//Use OMDBApi to request movie image using friendly title and year
			$http.get('http://www.omdbapi.com/?t=' + request).success(function(movieData) {
				if (movieData.Poster == "N/A") {
					value.image = "http://localhost:8000/app/img/no-movie-poster.png";
				} else {
					value.image = movieData.Poster;
				}			
			});

		});

		$scope.movies = data.movies;
		//console.log(data.movies);
	});

  	//$scope.start();

}]);

/* View a movie by movie id */
recommenderControllers.controller('ViewMovieCtrl', ['$scope', '$routeParams', '$http', 'Movie', 
	function($scope, $routeParams, $http, Movie) {
	
	$scope.movieId = $routeParams.movieId;
	//console.log("Movie id is: " + $routeParams.movieId);
	//console.log("Find similar movies at: http://localhost:8080/myapp/movies/similar/" + $routeParams.movieId + "/3");

	$scope.movie = Movie.get({movieId: $routeParams.movieId}, function(movie) {
		$scope.title = movie.title;

		var movieTitle = movie.title.replace(/ /g, "+");
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
		//Use OMDBApi to request movie image using friendly title and year
		$http.get('http://www.omdbapi.com/?t=' + request).success(function(movieData) {
			if (movieData.Poster == "N/A") {
				$scope.movie.image = "http://localhost:8000/app/img/no-movie-poster.png";
			} else {
				$scope.movie.image = movieData.Poster;
			}			
		});

	});
	

	$http.get('http://localhost:8080/movies/similar/' + $routeParams.movieId + "/3").success(function(data) {
		//console.log(data);
		//For each movie, get movie metadata from API
		angular.forEach(data.movies, function(value, key) {
			value.rating = Math.round(value.rating*10)/10;	
		});

		$scope.similarMovies = data.movies;
	});
}]);


