angular.module('bb', ['ngRoute', 'ngResource', 'LocalStorageModule', 'bb.controllers'])
	.factory('dataFactory', ['$http', function($http) {

	    var urlBase = '/api/products';
	    var dataFactory = {};

	    dataFactory.getProducts = function () {
	        return $http.get(urlBase);
	    };

	    dataFactory.getProduct = function (productName) {
	        return $http.get(urlBase + '/' + productName);
	    };


	    return dataFactory;
	}])
	.service('product', function Product(){
		var product = this;
	})
	.config(['localStorageServiceProvider', function(localStorageServiceProvider){
	}])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	     $routeProvider.
	       when('/', {
	         templateUrl: 'views/templates/home.html',
	         controller: 'MainCtrl',
	         css: 'style.css'
	       }).
	       when('/shop', {
	         templateUrl: 'views/templates/shop.html',
	         controller: 'ProductsCtrl'
	       }).
	       when('/cart', {
	         templateUrl: 'views/templates/cart.html',
	         controller: 'CartCtrl'
	       }).
	       when('/shop/:productName', {
	         templateUrl: 'single.html',
	         controller: 'SingleProductCtrl',
	         resolve: {
	               // I will cause a 1 second delay
	               delay: function($q, $timeout) {
	                 var delay = $q.defer();
	                 $timeout(delay.resolve, 1000);
	                 return delay.promise;
	             }
	        }
	       });
		 $locationProvider.html5Mode({
		 	enabled: true,
		 	requireBase: false
		 })
	}])



// (function(){
	
// 	var bracelets = {name: 'Tresslet', price: '$30.00'};

// 	var app = angular.module('bb', []);

// 		app.controller('MainController', ['scope', function($scope){
// 			$scope.test = "Hello World";
// 		}]);
			


// })(); // Closing App Tag