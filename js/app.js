var app = angular.module('myApp', ['ngRoute', 'ngAnimate']);

app.config(['$routeProvider', function($routeProvider) {

  $routeProvider.when('/', { templateUrl: 'main.html', controller: 'MainCtrl'});
  $routeProvider.when('/create', { templateUrl: 'create.html', controller: 'MainCtrl'});
  $routeProvider.when('/play', { templateUrl: 'play.html', controller: 'MainCtrl'});
  $routeProvider.otherwise({ redirectTo: '/'});
}]);