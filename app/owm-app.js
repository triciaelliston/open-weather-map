angular.module('OWMApp', ['ngRoute'])
	.value('owmCities',
		['New York', 'Dallas', 'Chicago'])
	.config(function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl : './home.html',
			controller : 'HomeCtrl as home'
		}).when('/cities/:city', {
			templateUrl : './city.html',
			controller : 'CityCtrl',
			resolve : {
				city: function(owmCities, $route, $location) {
					var city = $route.current.params.city;
					if (owmCities.indexOf(city) == -1) {
						$location.path('/error')
						return;
					}
					return city;
				}
			}
		}).when('/error', {
			template : '<p>Error Page Not Found</p'
		//}).otherwise( {
		//	redirectTo : '/error'
		});
	})
	//Now whenever a route is not found or a resolver fails, the 
	//application will redirect itself to the '/error' route
	.run(function($rootScope, $location){
		$rootScope.$on('$routeChangeError', function() {
			$location.path('/error');
		});
	})
	.controller('HomeCtrl', function() {
		this.welcomeMessage = "Welcome Home";
		//empty for now
	})
	//Now that you are using resolve in the route for 'cities/:city',
	//you can access a variable called 'city' in the controller.
	//This means that you can get rid of $routeParams from CityCtrl
	//.controller('CityCtrl', function($scope) {
	//.controller('CityCtrl', function($scope, $routeParams, owmCities) {
	.controller('CityCtrl', function($scope, city) {
		//try this first
		//$scope.city = 'New York';

		//next try this
		//$scope.city = $routeParams.city

		//get rid of $routeParams from CityCtrl as explained above.
		//var city = $routeParams.city;
		
		//if (owmCities.indexOf(city) == -1) {
			//city not found
		//	return;
		//}
		$scope.city = city;
	});
;