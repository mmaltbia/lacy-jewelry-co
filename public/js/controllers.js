angular.module('bb.controllers', ['ngRoute'])
	.controller("MainCtrl", ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
		  var url = 'https://api.instagram.com/v1/tags/bangle/media/recent?client_id=5071a38fc39942a7b4707af7162b0493&callback=JSON_CALLBACK&count=3';
		  $http.jsonp(url)
		    .then(function (response) {
		      console.log(response.data.data);
			      $scope.photos = response.data.data;
		    });
        


	}])
	
    .controller("PressCtrl", ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
        console.log('hello press');
    }])

	.controller('ProductsCtrl', ['$scope', 'dataFactory', '$route', '$routeParams', '$location', function ($scope, dataFactory, $route, $routeParams, $location) {

	    $scope.products;
	    $scope.routeParams = {};
	    $scope.routeParams.productName = $routeParams.productName;

	    $scope.$route = $route;
	    $scope.$location = $location;

	    getProducts();	

	    function getProducts() {
	        dataFactory.getProducts()
	            .success(function (products) {
	                $scope.products = products;
	                console.log(products)
	                return products;
	            })
	            .error(function (error) {
	                $scope.status = 'Unable to load product data: ' + error.message;
	            });

	}

		var init = function() {
		      $scope.initCurrentParams = {};
		      $scope.$location = $location.$$path	;
		      console.log('from location path', $scope.$location.$$path);
		      console.log('from init', $scope.$route);
		      console.log('from init', $scope.initCurrentParams.productName);
		    };
		    init();

		    $scope.$on('$routeChangeSuccess', function() {

		      $scope.routeChangeSuccessCurrentParams = {};
		      $scope.$route = $route;
		      $scope.routeChangeSuccessCurrentParams.productName = $scope.$route.current.params.productName;
		      console.log('from routeChangeSuccess', $scope.routeChangeSuccessCurrentParams.productName);
		    });

	}])

	.controller('CartCtrl', ['$scope', 'dataFactory', '$route', '$routeParams', '$location', function ($scope, dataFactory, $route, $routeParams, $location) {

	    $scope.products;
	    $scope.routeParams = {};
	    $scope.routeParams.productName = $routeParams.productName;

	    $scope.$route = $route;
	    $scope.$location = $location;

	    $scope.bag;

	    getCart();
	    function getCart(){
	    	var productsInBag = JSON.parse(localStorage.getItem('ProductsInBag'));
	    	console.log(productsInBag);
	    	$scope.bag = productsInBag;
	    }

	    $scope.removeFromCart = function(product) {
	    	console.log(this);
	    	var productsInBag = JSON.parse(localStorage.getItem('ProductsInBag'));

	    	for(i=0; i<productsInBag.length; i++){
	    		if(this.$index === i){
	    			productsInBag.splice(i, 1);
	    			console.log(productsInBag);
	    		}
	    	};

	    	localStorage.setItem("ProductsInBag", JSON.stringify(productsInBag));
	    	
	    	var productsInBag = JSON.parse(localStorage.getItem('ProductsInBag'));
	    }

		var init = function() {
		      $scope.initCurrentParams = {};
		      $scope.$location = $location.$$path	;
		      console.log('from location path', $scope.$location.$$path);
		      console.log('from init', $scope.$route);
		      console.log('from init', $scope.initCurrentParams.productName);
		    };
		    init();

		    $scope.$on('$routeChangeSuccess', function() {

		      $scope.routeChangeSuccessCurrentParams = {};
		      $scope.$route = $route;
		      $scope.routeChangeSuccessCurrentParams.productName = $scope.$route.current.params.productName;
		      console.log('from routeChangeSuccess', $scope.routeChangeSuccessCurrentParams.productName);
		    });

	}])

	.controller('SingleProductCtrl', ['$scope', '$route', '$routeParams', 'dataFactory', 'localStorageService',
	        function ($scope, $route, $routeParams, dataFactory, localStorageService) {

	    $scope.product;
	    $scope.name = "SingleProductCtrl";
	    $scope.params = $routeParams;

	    $scope.$watch('products', function () {
	      localStorageService.set('products', $scope.bag);
	    }, true);

        getProduct();
        function getProduct(productName) {
            dataFactory.getProducts()
                .success(function (products) {
                	console.log(products);
                    for (var i = 0; i < products.length; i++) {
                    	console.log(products[i].productName);
                        if (products[i].productName == $route.current.params.productName){
                            console.log(products[i]);
                            $scope.product = products[i];
                            $scope.images = products[i].images;
                            return products[i];
                        }
                    }
                })
                .error(function (error) {
                    $scope.status = 'Unable to load product data: ' + error.message;
                });
	    }

	    var productsInBag = JSON.parse(localStorage.getItem('ProductsInBag'));
	    
	    if (productsInBag === null){
	    	productsInBag = [];
	    }

	    console.log(productsInBag);

	    $scope.addCart = function(product) {
	    	console.log(product);
	    
	    	var addNewProduct = {
	    		productName: product.productName,
	    		price: product.unitPrice,
	    		image: product.images[0]
	    	};

	    	productsInBag.push(addNewProduct);
	    	console.log(productsInBag);
	    	localStorage.setItem("ProductsInBag", JSON.stringify(productsInBag));
	    	console.log('products currently in bag ' + productsInBag);
	    }

	    $('#addCartBtn').on('click', function(event){
	    	event.preventDefault();
	    	event.target.innerHTML = "Added to Bag!";
	    });

	}

]);

// .controller("ShopCtrl", ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {
	// 	    $http({
	// 	      method: 'GET',
	// 	      url: '/api/products/'
	// 	    }).then(function successCallback(response) {
	// 	        // this callback will be called asynchronously
	// 	        // when the response is available
	// 	        console.log(response.data);
	// 	        $scope.products = response.data;
	// 	      }, function errorCallback(response) {
	// 	        // called asynchronously if an error occurs
	// 	        // or server returns response with an error status.
	// 	        console.log('the get request did NOT work');
	// 	      });
	// 	    $http({
	// 	      method: 'GET',
	// 	      url: '/api/products/:id'
	// 	    }).then(function successCallback(response) {
	// 	        // this callback will be called asynchronously
	// 	        // when the response is available
	// 	        console.log(response.data);
	// 	        $scope.products = response.data;
	// 	      }, function errorCallback(response) {
	// 	        // called asynchronously if an error occurs
	// 	        // or server returns response with an error status.
	// 	        console.log('the get request did NOT work');
	// 	      });
	// 	    $http({
	// 	      method: 'GET',
	// 	      url: '/api/products/productName'
	// 	    }).then(function successCallback(response) {
	// 	        // this callback will be called asynchronously
	// 	        // when the response is available
	// 	        console.log(response.data);
	// 	        $scope.products = response.data;
	// 	      }, function errorCallback(response) {
	// 	        // called asynchronously if an error occurs
	// 	        // or server returns response with an error status.
	// 	        console.log('the get request did NOT work');
	// 	      });
	// }])
