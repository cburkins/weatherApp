// MODULE
// ngRoute and ngResource are injected into my app
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

var dateNow = Date.now();


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
			templateUrl: 'pages/home.html' + "?v=" + dateNow,
			controller: 'homeController'
		})
		.when('/forecast', {
			templateUrl: 'pages/forecast.html' + "?v=" + dateNow,
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
		console.info("homeController");

		// Get the value of zip code from the zipService service
		$scope.zipCode = zipService.zipCode;

		// Watch for when the zip value gets updated, and then update the zipService service
		$scope.$watch('zipCode', function() {
			zipService.zipCode = $scope.zipCode;
		})

	}
]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$sce', 'zipService', '$location',
	// Needs to be in same order as in brackets, protects against minification
	function($scope, $resource, $sce, zipService, $location) {
		console.info("forecastController");

		// Get the value of zip code from the zipService service
		$scope.zipCode = zipService.zipCode;

		$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily");
		$scope.weatherResult = $scope.weatherAPI.get({
			zip: $scope.zipCode,
			cnt: 3,
			APPID: "cbf71841c266028edf05411b46d61152"
		});

		console.log($scope.weatherResult);

	}
]);

