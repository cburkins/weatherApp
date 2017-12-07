
// MODULE
// ngRoute and ngResource are injected into my app
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
weatherApp.config(function($locationProvider, $routeProvider) {

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

// CONTROLLERS
weatherApp.controller('homeController', ['$scope', '$location', function($scope, $location) {
	console.info("homeController");
	console.info($location.path());

}]);

weatherApp.controller('forecastController', ['$scope', '$location', function($scope, $location) {
	console.info("forecastController");
	console.info($location.path());

}]);
