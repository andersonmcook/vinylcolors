var app = angular.module("VinylColorCombinator", ["firebase", "ngRoute"]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/main/', {
        templateUrl: './partials/main.html',
        controller: 'VinylColorsCtrl'
      }).
      when('/main/:bc/:sc/:c/:lc?/:tc?', {
        templateUrl: './partials/main.html',
        controller: 'VinylColorsCtrl'
      }).
      when('/login/', {
      	templateUrl: "partials/login.html",
      	controller: "LoginCtrl"
      })
      .otherwise('/main/');
  }]);