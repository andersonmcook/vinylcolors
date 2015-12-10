app.controller("VinylColorsCtrl", 
	["$scope", "$routeParams", "$firebaseArray", 
	function($scope, $routeParams, $firebaseArray) {

	$scope.BaseColor = $routeParams.BaseColor;
	$scope.SecondaryColor = $routeParams.SecondaryColor;
	$scope.LabelColor = $routeParams.LabelColor;

	var ref = new Firebase("https://vinylcolors.firebaseio.com/");
	console.log("hey, you're in VinylColors");
	// $scope.songs = $firebaseArray(ref);

  
}]);