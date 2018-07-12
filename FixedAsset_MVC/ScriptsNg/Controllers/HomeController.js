var faApp = angular.module('faApp', ['ngRoute']);

faApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/Login.html',
            controller: 'LoginController'
        })
        .when('/Next', {
            templateUrl: 'pages/Next.html',
            controller: 'LoginController'
        })
        .when('/Home', {
            templateUrl: 'pages/Home.html',
            controller: 'HomeController'
        })
});

faApp.controller('HomeController', ['$scope', '$log', '$http', '$location', '$window', function ($scope, $log, $http, $location, $window) {
    $scope.logInStatus = 'Logout';

    $scope.logOut = function () {
        //$window.location.href = '/Login.html';
    };

}])