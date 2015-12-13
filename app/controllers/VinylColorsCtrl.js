app.controller("VinylColorsCtrl", 
	["$scope", "$routeParams", "$firebaseArray", 
	function($scope, $routeParams, $firebaseArray) {

	$scope.BaseColor = $routeParams.BaseColor;
	$scope.SecondaryColor = $routeParams.SecondaryColor;
	$scope.LabelColor = $routeParams.LabelColor;

	var ref = new Firebase("http://vinylcolors.firebaseio.com");
	// var colorsRef = new Firebase("https://vinylcolors.firebaseio.com/colors/");
	// var configsRef = new Firebase("https://vinylcolors.firebaseio.com/configs");
	var colorsRef = ref.child("colors");
	var configsRef = ref.child("configs");
	$scope.colors = $firebaseArray(colorsRef);
	$scope.configs = $firebaseArray(configsRef);

	// $scope.Configuration = $scope.configs[1];

	// console.log("colors", $scope.colors);
	// console.log("hey, you're in VinylColors");
	// $scope.songs = $firebaseArray(ref);

	// $scope.addToUrl = function () {
  	$scope.sampleURL ="http://localhost:8080/#/main/" + $scope.BaseColor + "/";
	// }


}]);