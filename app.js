// MODULE
// ngRoute and ngResource are injected into my app
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
weatherApp.config(function($locationProvider, $routeProvider, $sceDelegateProvider) {

	$sceDelegateProvider.resourceUrlWhitelist([
		// Allow same origin resource loads.
		'self',
		// Allow loading from our assets domain.  Notice the difference between * and **.
		'http://api.openweathermap.org/**'
	]);

	//	$locationProvider.html5Mode({enabled: false, requireBase: false});
	$locationProvider.hashPrefix('');
	$routeProvider
		.when('/', {
			templateUrl: 'pages/home.html',
			controller: 'homeController'
		})
		.when('/forecast', {
			templateUrl: 'pages/forecast.html',
			controller: 'forecastController'
		});
});

// SERVICES

// Service that shares the desired city between the two pages (controllers)
weatherApp.service('cityService', function() {
	this.city = "New York, NY";
});


// CONTROLLERS

weatherApp.controller('homeController', ['$scope', 'cityService', '$location',
	// Needs to be in same order as in brackets, protects against minification
	function($scope, cityService, $location) {
		console.log("Hello from Home Controller");
		console.info("homeController");
		console.info($location.path());

		// Get the value of city from the cityService service
		$scope.city = cityService.city;

		// Watch for when the 'city' value gets updated, and then update the cityService service
		$scope.$watch('city', function() {
			cityService.city = $scope.city;
		})

	}
]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$sce', 'cityService', '$location',
	// Needs to be in same order as in brackets, protects against minification
	function($scope, $resource, $sce, cityService, $location) {
		console.info("forecastController");
		console.info($location.path());

		// Get the value of city from the cityService service
		$scope.city = cityService.city;
		var theURL = "http://api.openweathermap.org/data/2.5/forecast/daily";

		// $scope.weatherAPI = $resource(theURL, {
		// 	callback: "JSON_CALLBACK"
		// }, {
		// 	get: {
		// 		method: "JSONP"
		// 	}
		// });


		$scope.weatherAPI = $resource(theURL);

		$scope.weatherResult = $scope.weatherAPI.get({
			zip: $scope.city,
			cnt: 2,
			APPID: "cbf71841c266028edf05411b46d61152"
		});
		console.log($scope.weatherResult);

	}
]);