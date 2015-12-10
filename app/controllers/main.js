app.controller("VinylColors", 
	["$scope", "$firebaseArray", 
	function($scope, $firebaseArray) {

	// $scope.searchTest = "";
	// $scope.songs = [];

	var ref = new Firebase("https://vinylcolors.firebaseio.com/");
	console.log("hey, you're in VinylColors");
	// $scope.songs = $firebaseArray(ref);

  
}]);