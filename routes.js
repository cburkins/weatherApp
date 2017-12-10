
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

