angular.module('Home', ['ngRoute', 'ngCookies']);
angular.module('faAppLogIn', ['Home','ngRoute','ngCookies'])
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'pages/login.html',
            hideMenus: true
        })
        
        .otherwise({ redirectTo: '/login' });

    //$locationProvider.html5Mode(true);
}])

.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.username; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/Login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]
)

.controller('LoginController',
    ['$scope', '$http', '$log', '$rootScope', '$cookieStore', '$location', '$window', function ($scope, $http, $log, $rootScope, $cookieStore, $location, $window) {

        $rootScope.globals = {};
        $cookieStore.remove('globals');
        $http.defaults.headers.common.Authorization = 'Basic ';

        $scope.login = function () {
            $http.get('Login/GetUser', { params: { username: $scope.username, password: $scope.password } })
            .then(function (data, status, header, config) {
                if (data == null || data.data == "") {
                    $scope.userModel = {};
                    $scope.message = 'Invalid user..!';
                    $log.error($scope.message);
                }
                else {
                    $scope.userModel = data.data;
                    $scope.message = 'Valid user :)';
                    $log.info($scope.message);

                    $rootScope.globals = {
                        currentUser: {
                            username: data.data.username,
                            password: data.data.password
                        }
                    };
                    $http.defaults.headers.common['Authorization'] = 'Basic ' + data.data.username; // jshint ignore:line
                    $cookieStore.put('globals', $rootScope.globals);

                    //$location.path('/');
                    $window.location.href = '/Home.html';
                }

            }, function error(data, status, header, config) {
                $scope.message = 'Error in fetching data..!';
                $log.alert($scope.message);
                $log.error(data.statusText);
            })
        };
    }]);

