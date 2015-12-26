app.controller("VinylColorsCtrl", 
	["$scope", "$routeParams", "$firebaseArray", 
	function($scope, $routeParams, $firebaseArray) {

// adds clipboard functionality to copy class
	new Clipboard('.copy');

// sets default for play record button to true
	$scope.toggle = true;

// sets default for label text
	$scope.Text = "PLACEHOLDER TEXT FOR YOUR RECORD";

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
	$scope.colors = $firebaseArray(colorsRef);
	$scope.configs = $firebaseArray(configsRef);

// sets default color to black once the colors array is loaded
	$scope.colors.$loaded().then(function(){
// sets default color to black
		$scope.BaseColor = $scope.colors[4];
		$scope.SecondaryColor = $scope.colors[34];
// sets base color based on routeparams
		for (var x = 0; x < $scope.colors.length; x++) {
			if ($scope.colors[x].$id === bc) {
				$scope.BaseColor = $scope.colors[x];
			}
		}
// sets secondary color based on routeparams
		for (var y = 0; y < $scope.colors.length; y++) {
			if ($scope.colors[y].$id === sc) {
				$scope.SecondaryColor = $scope.colors[y];
			}
		}
	}).catch(function(error) {
        console.log("Error:", error);
      });

// sets default configuration to none once the configs array is loaded
	$scope.configs.$loaded().then(function(){
// sets default configuration to none
		$scope.Configuration = $scope.configs[5];
// sets configuration based on routeparams
		for (var z = 0; z < $scope.configs.length; z++) {
			if ($scope.configs[z].$id === c) {
				$scope.Configuration = $scope.configs[z];
			}
		}
	}).catch(function(error) {
        console.log("Error:", error);
      });

// sets label and text colors based on routeparams
	$scope.LabelColor = "#" + lc;
	$scope.TextColor = "#" + tc;

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
		$scope.SecondaryColor = $scope.colors[4];
		$scope.Configuration = $scope.configs[5];
		$scope.LabelColor = "#000000";
		$scope.TextColor = "#000000";
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

//spins record at ~33 1/3 rpm
	$scope.spin = function () {
		var spinner = angular.element(document.querySelector("#vinyl-holder"));
		spinner.toggleClass("spin");
	};

}]);