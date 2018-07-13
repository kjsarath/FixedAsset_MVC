angular.module('Home', ['ngRoute','ngCookies'])
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/Next', {
            controller: 'HomeController',
            templateUrl: 'pages/Next.html',
            hideMenus: true
        })

        .otherwise({ redirectTo: '/Next' });
}])

.run(['$rootScope', '$location', '$cookieStore', '$http',
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

.controller('HomeController', ['$scope', '$log', '$http', '$location', '$window',
    function ($scope, $log, $http, $location, $window) {
        $scope.logInStatus = 'Logout';
    
        $scope.logOut = function () {
        
        };

    }]
)