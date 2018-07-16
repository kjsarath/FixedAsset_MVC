//angular.module('Home', ['ngRoute', 'ngCookies'])
homeApp.controller('CompanyController', ['$scope', '$http', '$log', '$location',
    function ($scope, $http, $log, $location) {
        $scope.messgae = '';
        $scope.allCompanies = {};
        $scope.companyModel = { code: '1', name: 'test' };
        $scope.showDetail = false;
        getAll();

        function getAll() {
            $scope.companyModel = {};
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
            $scope.showDetail = false;
        };

        $scope.getCompany=function (companyModel) {
            //debugger;
            $http.get('Company/GetCompanyDetails', { params: { code: companyModel.code } })
                .then(function (data) {
                    $log.info(data);
                    if (data == null || data.data == '') {

                    }
                    else {
                        $scope.message = 'Valid data :)';
                        $log.info($scope.message);
                        $log.info(data.data);
                        $scope.companyModel = data.data;
                        //$location.path('/CompanyEdit');
                    }
                }, function (error) {
                    $scope.message = 'Error in fetching data!';
                    $log.error($scope.message);
                })
            $scope.showDetail = true;
        };

        $scope.showGrid=function(){
            $scope.companyModel = {};
            $scope.showDetail = false;

        }

        
           
    }]
)