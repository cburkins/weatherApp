
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

		$scope.convertToFahrenheit = function(degK) {
			// Convert from Kelvin to Fahrenheit
			return Math.round((1.8 * (degK - 273)) + 32);
		}

		$scope.convertToDate = function(dt) {
			return new Date(dt * 1000);
		}

		console.log($scope.weatherResult);


	}
]);

