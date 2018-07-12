
var faAppAuth=angular.module('Authentication', []);
var faAppHome = angular.module('Home', []);
var faAppLogIn = angular.module('faAppLogIn', [
    'Authentication',
    'Home',
    'ngRoute',
    'ngCookies'
]);

faAppLogIn.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/Login', {
            controller: 'LoginController',
            templateUrl: 'pages/login.html',
            hideMenus: true
        })

        .when('/', {
            controller: 'HomeController',
            templateUrl: 'home.html'
        })

        .otherwise({ redirectTo: '/login' });
}])

faAppLogIn.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/Login' && !$rootScope.globals.currentUser) {
                $location.path('/Login');
            }
        });
    }]);

//faAppLogIn.controller('LoginController', ['$scope', '$log', '$http', '$location', '$window', function ($scope, $log, $http, $location, $window) {
//    $scope.userModel = {};
//    $scope.message = '';
//    $scope.allUsers = null;
//    $scope.username = '';
//    $scope.password = '';
//    $scope.logInStatus = 'Login';

//    $scope.getUser = function (userModel) {
//        $http.get('Login/GetUser', { params: { username: $scope.username, password: $scope.password } })
//            .then(function (data, status, header, config) {
//                if (data == null || data.data=="")
//                {
//                    $scope.userModel = {};
//                    $scope.message = 'Invalid user..!';
//                    $log.error($scope.message);
//                }
//                else
//                {
//                    $scope.userModel = data.data;
//                    $scope.message = 'Valid user :)';
//                    $log.info($scope.message);
//                    //$location.path('/Home');
//                    $window.location.href = '/Home.html';
//                }
                
//            }, function error(data, status, header, config) {
//                $scope.message = 'Error in fetching data..!';
//                $log.alert($scope.message);
//                $log.error(data.statusText);
//            })
            
//    };
//}]);

faAppLogIn.controller('LoginController',
    ['$scope', '$rootScope', '$location',function ($scope, $rootScope, $location) {

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

                    $location.path('/');
                    //$window.location.href = '/Home.html';
                }

            }, function error(data, status, header, config) {
                $scope.message = 'Error in fetching data..!';
                $log.alert($scope.message);
                $log.error(data.statusText);
            })
        };
    }]);

