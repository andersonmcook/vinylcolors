app.controller("VinylColorsCtrl", 
	["$scope", "$routeParams", "$firebaseArray", 
	function($scope, $routeParams, $firebaseArray) {

	// $scope.BaseColor = $routeParams.BaseColor;
	// $scope.SecondaryColor = $routeParams.SecondaryColor;
	// // $scope.LabelColor = $routeParams.LabelColor;
	// $scope.Configuration = $routeParams.Configuration;

// pulls from firebase and makes arrays of the objects we need
	var ref = new Firebase("http://vinylcolors.firebaseio.com");
	var colorsRef = ref.child("colors");
	var configsRef = ref.child("configs");
	$scope.colors = $firebaseArray(colorsRef);
	$scope.configs = $firebaseArray(configsRef);

// sets default color to black once the colors array is loaded
	$scope.colors.$loaded().then(function(){
		$scope.BaseColor = $scope.colors[3];
		$scope.SecondaryColor = $scope.colors[3];
	}).catch(function(error) {
        console.log("Error:", error);
      });

// sets default configuration to none once the configs array is loaded
	$scope.configs.$loaded().then(function(){
		$scope.Configuration = $scope.configs[3];
	}).catch(function(error) {
        console.log("Error:", error);
      });


// grabs URL, not currently functional
	$scope.addToURL = function () {
  	$scope.sampleURL = "http://localhost:8080/#/main/" + $scope.BaseColor.$id + "/" + $scope.SecondaryColor.$id + "/" + $scope.Configuration.$id;
  	// this logs a hex value with #
  	console.log("label color", $scope.LabelColor);
	};

// reverses colors of selections
	$scope.reverseColors = function () {
		var a = $scope.BaseColor;
		var b = $scope.SecondaryColor;
		$scope.BaseColor = b;
		$scope.SecondaryColor = a;
	};

// randomizes colors and configurations
	$scope.random = function () {
		var base = Math.floor(Math.random() * ($scope.colors.length));
		var second = Math.floor(Math.random() * ($scope.colors.length));
		// var label = Math.floor(Math.random() * ($scope.colors.length - 1));
		var combo = Math.floor(Math.random() * ($scope.configs.length));
		$scope.BaseColor = $scope.colors[base];
		$scope.SecondaryColor = $scope.colors[second];
		// $scope.LabelColor = label;
		$scope.Configuration = $scope.configs[combo];
	};


}]);