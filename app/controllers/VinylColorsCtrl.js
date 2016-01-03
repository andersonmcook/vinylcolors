/*jshint esnext: true */

app.controller("VinylColorsCtrl", 
	["$scope", "$routeParams", "$firebaseArray", "getUID", "$location", 
	function($scope, $routeParams, $firebaseArray, getUID, $location) {

// adds clipboard functionality to copy class
	new Clipboard('.copy');

// sets default for play record button to true
	$scope.toggle = true;

// sets default for label text
	$scope.Text = "PLACEHOLDER TEXT FOR YOUR RECORD";

// gets uid
	var uid = getUID.getUID();

// checks getUID to set log in button status
	$scope.loggedOut = uid === "" ? true : false;

// sets variables based on routeParams in URL
	var bc = $routeParams.bc;
	var sc = $routeParams.sc;
	var c = $routeParams.c;
	var lc = $routeParams.lc;
	var tc = $routeParams.tc;

// pulls from firebase and makes arrays of the objects we need
	var ref = new Firebase("http://vinylcolors.firebaseio.com");
	var colorsRef = ref.child("colors");
	var configsRef = ref.child("configs");
	var selectionsRef = ref.child("/users/" + uid + "/selections/");
	$scope.colors = $firebaseArray(colorsRef);
	$scope.configs = $firebaseArray(configsRef);
	$scope.selections = $firebaseArray(selectionsRef);

// sets routeparams colors with default fallback
	$scope.colors.$loaded().then(function(){

// sets base color based on routeparams with default fallback
		var bcIndex = $scope.colors.map(x => x.$id).indexOf(bc);
		$scope.BaseColor = bcIndex > -1 ? $scope.colors[bcIndex] : $scope.colors[4];

// sets secondary color based on routeparams with default fallback
		var scIndex = $scope.colors.map(x => x.$id).indexOf(sc);
		$scope.SecondaryColor = scIndex > -1 ? $scope.colors[scIndex] : $scope.colors[34];

	}).catch(function(error) {
      console.log("Error:", error);
    });

// sets configuration based on routeparams with default fallback
	$scope.configs.$loaded().then(function(){
		var cIndex = $scope.configs.map(x => x.$id).indexOf(c);
		$scope.Configuration = cIndex > -1 ? $scope.configs[cIndex] : $scope.configs[5];

	}).catch(function(error) {
      console.log("Error:", error);
    });

// sets label color based on routeparams with default fallback
	$scope.LabelColor = lc === undefined ? "#000000" : "#" + lc;

// sets text color based on routeparams with default fallback
	$scope.TextColor = tc === undefined ? "#ffffff" : "#" + tc;

// easter egg
$scope.$watch("Text", function(newValue, oldValue) {
	if ($scope.Text.toLowerCase() === "nashville software school") {
		$scope.BaseColor = $scope.colors[18];
		$scope.SecondaryColor = $scope.colors[34];
		$scope.Configuration = $scope.configs[1];
		$scope.LabelColor = "#515151";
		$scope.TextColor = "#cbcbcb";
	}
});

// resets all colors and configuration
	$scope.reset = function () {
		$scope.BaseColor = $scope.colors[4];
		$scope.SecondaryColor = $scope.colors[34];
		$scope.Configuration = $scope.configs[5];
		$scope.LabelColor = "#000000";
		$scope.TextColor = "#FFFFFF";
	};

// generates URL for page
	$scope.addToURL = function () {
  	$scope.sampleURL = "http://localhost:8080/#/main/" + $scope.BaseColor.$id + "/" + $scope.SecondaryColor.$id + "/" + $scope.Configuration.$id + "/" + $scope.LabelColor.substr(1) + "/" + $scope.TextColor.substr(1);
  	// default message when you click share icon
		$scope.Message = "Share URL copied to clipboard";
	};

// generates description
	$scope.getDescription = function () {
		$scope.sampleDescription = $scope.BaseColor.name + " / " + $scope.SecondaryColor.name + " / " + $scope.Configuration.name;
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
		var label = "#" + ("00000" + (Math.random() * (1<<24)|0).toString(16)).slice(-6);
		var labeltext = "#" + ("00000" + (Math.random() * (1<<24)|0).toString(16)).slice(-6);
		var combo = Math.floor(Math.random() * ($scope.configs.length));
		$scope.BaseColor = $scope.colors[base];
		$scope.SecondaryColor = $scope.colors[second];
		$scope.LabelColor = label;
		$scope.Configuration = $scope.configs[combo];
		$scope.TextColor = labeltext;
	};

// spins record at ~33 1/3 rpm
	$scope.spin = function () {
		var spinner = angular.element(document.querySelector("#vinyl-holder"));
		spinner.toggleClass("spin");
	};

// log out
	$scope.logout = function () {
		ref.unauth();
		getUID.addUID("");
		$scope.loggedOut = true;
	};

// save a selection
// should i save them as an object with the necessary parts rather than a url?
	$scope.save = function () {
		$scope.savedURL = "/#/main/" + $scope.BaseColor.$id + "/" + $scope.SecondaryColor.$id + "/" + $scope.Configuration.$id + "/" + $scope.LabelColor.substr(1) + "/" + $scope.TextColor.substr(1);
		var selectionsRef = ref.child("/users/" + uid + "/selections/");
		selectionsRef.push({"name": $scope.selection, "url": $scope.savedURL});
		$scope.selection = "";
	};

// delete a saved selection
	$scope.delete = function (trash) {
		$scope.selections.$remove(trash);
	};

// login button to go to login page and store some info
	$scope.loginButton = function () {
		getUID.addParams($scope.BaseColor.$id, $scope.SecondaryColor.$id, $scope.Configuration.$id, $scope.LabelColor.substr(1), $scope.TextColor.substr(1));
		$location.path("/login/");
	};

}]);