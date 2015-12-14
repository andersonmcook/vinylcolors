var app = angular.module("VinylColorCombinator", ["firebase", "ngRoute"]);

console.log("hey, youre in the app");

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/main/', {
        templateUrl: './partials/main.html',
        controller: 'VinylColorsCtrl'
      }).
      when('/main/:BaseColor/:SecondaryColor/:Configuration', {
        templateUrl: './partials/main.html',
        controller: 'VinylColorsCtrl'
      })
      // when('/songs/details/:songId', {
      // 	templateUrl: "partials/song-detail.html",
      // 	controller: "SongDetailCtrl"
      // })
      .otherwise('/main/');
  }]);