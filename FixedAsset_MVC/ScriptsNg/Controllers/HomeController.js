var homeApp=angular.module('Home', ['ngRoute','ngCookies'])
homeApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'pages/Next.html',
            hideMenus: true
        })
        .when('/Next', {
            controller: 'HomeController',
            templateUrl: 'pages/Next.html',
            hideMenus: true
        })
        .when('/Company', {
            controller: 'CompanyController',
            templateUrl: 'pages/Company.html'
        })
        .when('/Asset', {
            controller: 'AssetController',
            templateUrl: 'pages/Asset.html'
        })
        .otherwise({ redirectTo: '/Next' });

    //$locationProvider.html5Mode(true);
}])

homeApp.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        //debugger;
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.username; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            if ($location.path() !== '/Next' && !$rootScope.globals.currentUser) {
                $location.path('/Next');
            }
        });
    }]
)

homeApp.controller('HomeController', ['$scope', '$log', '$http', '$location', '$window',
    function ($scope, $log, $http, $location, $window) {
        $scope.logInStatus = 'Logout';
        $scope.message = 'Logged In :)';

        $log.info($scope.message);
        
        $scope.logOut = function () {
        
        };

    }]
)
