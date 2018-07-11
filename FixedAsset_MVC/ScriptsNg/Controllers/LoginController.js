var faApp = angular.module('faApp', ['ngRoute']);

faApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/Login.html',
            controller:'LoginController'
        })
        .when('/Next', {
            templateUrl: 'pages/Next.html',
            controller:'LoginController'
        })
});

faApp.controller('LoginController',['$scope','$log','$http', function ($scope, $log, $http) {
    $scope.userModel = {};
    $scope.message = '';
    $scope.allUsers = null;
    $scope.username = '';
    $scope.password = '';

    $scope.getUser = function (userModel) {
        $http.get('Login/GetUser', { params: { username: $scope.username, password: $scope.password } })
            .then(function (data, status, header, config) {
                if (data == null || data.data=="")
                {
                    $scope.userModel = {};
                    $scope.message = 'Invalid user..!';
                    $log.error($scope.message);
                }
                else
                {
                    $scope.userModel = data.data;
                    $scope.message = 'Valid user :)';
                    $log.info($scope.message);
                }
                
            }, function error(data, status, header, config) {
                $scope.message = 'Error in fetching data..!';
                $log.alert($scope.message);
                $log.error(data.statusText);
            })
            
    };
}]);
