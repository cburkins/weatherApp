// MODULE
// ngRoute and ngResource are injected into my app
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
weatherApp.config(function($locationProvider, $routeProvider, $sceDelegateProvider) {

	$sceDelegateProvider.resourceUrlWhitelist([
		// Allow same origin resource loads.
		'self',
		// Allow loading from our assets domain.  Notice the difference between * and **.
		'http://api.openweathermap.org/**', 
		'http://www.zipcodeapi.com/rest/**'
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
weatherApp.service('zipService', function() {
	this.zipCode = "08869";
});


// CONTROLLERS

weatherApp.controller('homeController', ['$scope', 'zipService', '$location',
	// Needs to be in same order as in brackets, protects against minification
	function($scope, zipService, $location) {
		console.log("Hello from Home Controller");
		console.info("homeController");
		console.info($location.path());

		// Get the value of city from the zipService service
		$scope.zipCode = zipService.zipCode;

		// Watch for when the 'city' value gets updated, and then update the zipService service
		$scope.$watch('city', function() {
			zipService.zipCode = $scope.zipCode;
		})

	}
]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$sce', 'zipService', '$location',
	// Needs to be in same order as in brackets, protects against minification
	function($scope, $resource, $sce, zipService, $location) {
		console.info("forecastController");
		console.info($location.path());

		// Get the value of city from the zipService service
		$scope.zipCode = zipService.zipCode;

		var zipURL="http://www.zipcodeapi.com/rest/"
		// This key was registered to accept calls from amazonaws.com, so it won't cause CORS error
		var zipAPI="js-jqHy5GgRmYUdo3hYO94BWVdYBP8XdP1gpBi8LNHJ2T2wef1x5gEOGehjIcUT8JJT"
		var zipFunction="/city-zips.json"
		var city = "philadelphia"
		var state = "pa"
		var zipCall = zipURL + zipAPI + zipFunction + "/" + city + "/" + state
		console.log(zipCall);
		// The call should look something like this
		// https://www.zipcodeapi.com/rest/js-jqHy5GgRmYUdo3hYO94BWVdYBP8XdP1gpBi8LNHJ2T2wef1x5gEOGehjIcUT8JJT/city-zips.json/philadelphia/pa");
		// --------------------------------------------------------
		$scope.zipAPI = $resource(zipCall);

		$scope.zipResult = $scope.zipAPI.get({}, function () {
			console.log($scope.zipResult.zip_codes[0])
		});
		console.warn($scope.zipResult);

		// --------------------------------------------------------


		$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily");
		$scope.weatherResult = $scope.weatherAPI.get({
			zip: $scope.zipCode,
			cnt: 2,
			APPID: "cbf71841c266028edf05411b46d61152"
		});


		console.log($scope.weatherResult);

	}
]);