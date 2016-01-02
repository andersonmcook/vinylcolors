/*jshint esnext: true */

app.controller("LoginCtrl", 
	["$scope", "$routeParams", "$firebaseArray", "getUID", "$location", 
	function($scope, $routeParams, $firebaseArray, getUID, $location) {

// register user
		$scope.register = function () {
			console.log("you clicked register");
			var ref = new Firebase("https://vinylcolors.firebaseio.com");
			ref.createUser({
			  email    : $scope.email,
			  password : $scope.password
			}, function(error, userData) {
			  if (error) {
			    console.log("Error creating user:", error);
			  } else {
			    console.log("Successfully created user account with uid:", userData.uid);
			    getUID.addUID(userData.uid);
			    var usersRef = new Firebase("https://vinylcolors.firebaseio.com/users/" + userData.uid + "/");
			    usersRef.set({'email': $scope.email});
			    $location.path("/main/" + getUID.getParams());
			    $scope.loggedOut = false;
			    $scope.$apply();
			  }
			});
		};

// login user
		$scope.login = function () {
			var ref = new Firebase("https://vinylcolors.firebaseio.com");
			ref.authWithPassword({
			  email    : $scope.email,
			  password : $scope.password
			}, function(error, authData) {
			  if (error) {
			    console.log("Login Failed!", error);
			  } else {
			    console.log("Authenticated successfully with payload:", authData);
			    getUID.addUID(authData.uid);
			    $location.path("/main/" + getUID.getParams());
			    $scope.loggedOut = false;
			    $scope.$apply();
			  }
			});
		};


}]);