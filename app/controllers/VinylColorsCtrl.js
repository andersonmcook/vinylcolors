app.controller("VinylColorsCtrl", 
	["$scope", "$routeParams", "$firebaseArray", 
	function($scope, $routeParams, $firebaseArray) {

	// $scope.BaseColor = $routeParams.bc;
	// $scope.SecondaryColor = $routeParams.sc;
	// // $scope.LabelColor = $routeParams.LabelColor;
	// $scope.Configuration = $routeParams.c;

	var bc = $routeParams.bc;
	var sc = $routeParams.sc;
	var c = $routeParams.c;
	console.log("bc", bc);

	console.log("$routeParams bc, sc, c", $scope.BaseColor, $scope.SecondaryColor, $scope.Configuration);

// pulls from firebase and makes arrays of the objects we need
	var ref = new Firebase("http://vinylcolors.firebaseio.com");
	var baseColorRef = new Firebase("http://vinylcolors.firebaseio.com/colors/" + bc);
	var secondaryColorRef = new Firebase("http://vinylcolors.firebaseio.com/colors/" + sc);
	var configRef = new Firebase("http://vinylcolors.firebaseio.com/configs/" + c);

	$scope.BaseColor = baseColorRef;
	console.log("baseColorRef", baseColorRef);
	// $scope.test = (baseColorRef);
	console.log("test", $scope.test);


	var colorsRef = ref.child("colors");
	var configsRef = ref.child("configs");

	var test3 = colorsRef.equalTo("white");
	console.log("test3", test3);

	// var keytest = colorsRef.$getRecord("white");
	// console.log("keytest", keytest);

	$scope.colors = $firebaseArray(colorsRef);
	$scope.configs = $firebaseArray(configsRef);

	console.log("colorsRef", colorsRef);
	console.log("$scope.colors", $scope.colors);



// sets default color to black once the colors array is loaded
	$scope.colors.$loaded().then(function(){

		// $scope.BaseColor = baseColorRef;
		// $scope.BaseColor = $routeParams.bc;
		// var base = colorsRef.child($routeParams.bc);
		// console.log("base", base);

		// $scope.BaseColor = colorsRef.child($routeParams.bc);

		$scope.BaseColor = $scope.colors[3];
		$scope.SecondaryColor = $scope.colors[3];
	}).catch(function(error) {
        console.log("Error:", error);
      });

// sets default configuration to none once the configs array is loaded
	$scope.configs.$loaded().then(function(){
		$scope.Configuration = $scope.configs[5];
	}).catch(function(error) {
        console.log("Error:", error);
      });

	$scope.reset = function () {
		console.log("you clicked reset");
		$scope.BaseColor = $scope.colors[3];
		$scope.SecondaryColor = $scope.colors[3];
		$scope.Configuration = $scope.configs[5];
		$scope.LabelColor = "#000000";
		$scope.TextColor = "#000000";
	};

// grabs URL, not currently functional
	$scope.addToURL = function () {
  	$scope.sampleURL = "http://localhost:8080/#/main/" + $scope.BaseColor.$id + "/" + $scope.SecondaryColor.$id + "/" + $scope.Configuration.$id;
  	// this logs a hex value with #
  	console.log("label color", $scope.LabelColor);
	};

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

}]);




// app.controller("indivGameCtrl", 
// ["$firebaseArray", "$scope", "$location", "$rootScope", "$http", "generalVariables",
// function($firebaseArray, $scope, $location, $rootScope, $http, generalVariables){

//     console.log("location ", $location)

//     var objectName = $location.$$path.split("/")[2];
//     console.log("objectName ", objectName);

//     var ref = new Firebase("https://frontcapstone.firebaseio.com");

//     var objectFromFirebase = $firebaseArray(ref.child("Games"));

//     objectFromFirebase.$loaded()
//     .then(function(data){
//         console.log("data ", data)

//         _.filter(data, function(game){

//             if(game.$id === objectName){
//                 console.log("the game selected is ", game);
//             }
//         })

//     })

    
// }]);