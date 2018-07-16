homeApp.controller('AssetController', ['$scope', '$log', '$http', '$location', '$window',
    function ($scope, $log, $http, $location, $window) {
        $scope.message = '';
        $scope.assetModel = {};
        $scope.allAssets = {};
        $scope.showDetails = false;
        getAll();

        function getAll() {
            debugger;
            $http.get('Asset/GetAll')
                .then(function (data) {
                    if(data==undefined || data.data=="" ){
                        $scope.message = 'Invalid data!';
                        $log.warn($scope.message);
                        $scope.allAssets = {};
                        $scope.showDetails = false;
                    }
                    else {
                        $scope.message = 'Valid data :)';
                        $log.info($scope.message);
                        $log.info(data.data);
                        $scope.allAssets = data.data;
                        $scope.showDetails = true;
                    }
                }, function (error) {
                    $scope.message = 'Error in fetching data!';
                    $log.error($scope.message);
                    $scope.allAssets = {};
                    $scope.showDetails = false;
                });
            $scope.assetModel = {};
            $scope.showDetails = false;
        };

        $scope.getAssetDetails = function (assetModel) {
            $http.get('Asset/GetAssetById', { params: { _id: assetModel._id } })
                .then(function (data) {
                    if (data == null || data.data == "") {
                        $scope.message = 'Invalid data!';
                        $log.warn($scope.message);
                        $scope.assetModel = {};
                        $scope.showDetails = false;
                    }
                    else {
                        $scope.message = 'Valid data :)';
                        $log.info($scope.message);
                        $log.info(data.data);
                        $scope.assetModel = data.data;
                        $scope.showDetails = true;
                    }
                }, function (error) {
                    $scope.message = 'Error in fetching data!';
                    $log.error($scope.message);
                    $scope.assetModel = {};
                    $scope.showDetails = false;
                })
        };

        $scope.showGrid = function () {
            $scope.showDetails = false;
        }
    }
])