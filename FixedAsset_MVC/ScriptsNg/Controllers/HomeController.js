angular.module('Home', ['ngRoute','ngCookies'])
.config(['$routeProvider','$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider
        .when('/Next', {
            controller: 'HomeController',
            templateUrl: 'pages/Next.html',
            hideMenus: true
        })
        .when('/Company', {
            controller: 'HomeController',
            templateUrl: 'pages/Company.html'
        });

        //.otherwise({ redirectTo: '/Next' });

//    $locationProvider.html5Mode(true);
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
        $scope.message = 'Logged In :)';

        $log.info($scope.message);
        
        $scope.logOut = function () {
        
        };

//    }]
//)
//.controller('CompanyController', ['$scope', '$http', '$log', '$location',
//    function ($scope, $http, $log, $location) {
//        $scope.messgae = '';
        $scope.allCompanies = {};
        $scope.companyModel = {};

        $scope.getAll = function () {
            $http.get("Company/GetAllCompanies")
                .then(function (data, status, header, config) {
                    $log.info(data);
                    if (data == null || data.data[0]=='') {
                        $scope.message = 'Invalid data!';
                        $log.warn($scope.message);
                        $scope.allCompanies = {};
                    }
                    else {
                        $scope.message = 'Valid data :)';
                        $log.info($scope.message);
                        $log.info(data.data);
                        $scope.allCompanies = data.data;
                        $location.path('/Company');
                    }
                }, function (error) {
                    $scope.message = 'Error in fetching data!';
                    $log.error($scope.message);
                })
        }
}])