//angular.module('Home', ['ngRoute', 'ngCookies'])
homeApp.controller('CompanyController', ['$scope', '$http', '$log', '$location',
    function ($scope, $http, $log, $location) {
        $scope.messgae = '';
        $scope.allCompanies = {};
        $scope.companyModel = {};

        $scope.getAll = function () {
            $http.get("Company/GetAllCompanies")
                .then(function (data, status, header, config) {
                    $log.info(data);
                    if (data == null || data.data[0] == '') {
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
    }]
)