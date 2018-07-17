homeApp.controller('AssetController', ['$scope', '$log', '$http', '$location', '$window','$rootScope',
    function ($scope, $log, $http, $location, $window, $rootScope) {
        $scope.message = '';
        $scope.assetModel = {};
        $scope.allAssets = {};
        $scope.showGrid = false;
        $scope.showDetails = false;
        $scope.showEdit = false;
        $scope.action = 'View';
        $scope.searchText = '';

        getAll();

        function setDivDisplay(divType) {
            if (divType == "grid") {
                $scope.showGrid = true;
                $scope.showDetails = false;
                $scope.showEdit = false;
                $scope.action = 'View';
            }
            else if (divType == "detail") {
                $scope.showGrid = false;
                $scope.showDetails = true;
                $scope.showEdit = false;
                $scope.action = 'View';
            }
            else if (divType == "edit") {
                $scope.showGrid = false;
                $scope.showDetails = false;
                $scope.showEdit = true;
            }
        };

        function getAll() {
            //debugger;
            $http.get('Asset/GetAll')
                .then(function (data) {
                    if(data==undefined || data.data=="" ){
                        $scope.message = 'Invalid data!';
                        $log.warn($scope.message);
                        $scope.allAssets = {};
                        //setDivDisplay("grid");
                    }
                    else {
                        $scope.message = 'Valid data :)';
                        $log.info($scope.message);
                        $log.info(data.data);
                        $scope.allAssets = data.data;
                        //setDivDisplay("grid");
                    }
                }, function (error) {
                    $scope.message = 'Error in fetching data!';
                    $log.error($scope.message);
                    $scope.allAssets = {};
                    //setDivDisplay("grid");
                });
            $scope.assetModel = {};
            setDivDisplay("grid");
        };

        $scope.getAssetDetails = function (assetModel) {
            //debugger;
            $http.get('Asset/GetAssetById', { params: { asset_id: assetModel.asset_id } })
                .then(function (data) {
                    if (data == null || data.data == "") {
                        $scope.message = 'Invalid data!';
                        $log.warn($scope.message);
                        $scope.assetModel = {};
                        setDivDisplay("grid");
                    }
                    else {
                        $scope.message = 'Valid data :)';
                        $log.info($scope.message);
                        $log.info(data.data);
                        $scope.assetModel = data.data;
                        setDivDisplay("detail");
                    }
                }, function (error) {
                    $scope.message = 'Error in fetching data!';
                    $log.error($scope.message);
                    $scope.assetModel = {};
                    setDivDisplay("grid");
                })
        };

        $scope.showGridNow = function () {
            setDivDisplay("grid");
            $scope.action = 'View';
            $scope.assetModel = {};
        };

        $scope.showDetailNow = function () {
            $scope.action = 'View';
            setDivDisplay("detail");
        };

        $scope.showEditNow = function () {
            $scope.action = 'add';
            $http.get('Asset/GetNextAssetNo')
                .then(function (data) {
                    if (data == undefined || data == {} || data.data == '') {
                        $scope.message = 'Invalid Asset#!';
                        $log.warn($scope.message);
                    }
                    else {
                        $log.info('Valid data :)');
                        $log.info(data.data);
                        $scope.assetModel.asset_no = data.data;
                    }
                }, function (error) {
                    $scope.message = 'Error in fetching Asset #!';
                    $log.error($scope.message);
                });
            setDivDisplay("edit");
        };

        function addAsset(assetModel) {
            $scope.assetModel.created_by = $rootScope.globals.currentUser.username;
            $scope.assetModel.last_modified_by = $rootScope.globals.currentUser.username;
            $http.post('Asset/AddNewAsset', $scope.assetModel)
                .then(function (data) {
                    if (data == null || data.data == "") {
                        $scope.message = 'Invalid data!';
                        $log.warn($scope.message);
                        $scope.assetModel = {};
                        setDivDisplay("grid");
                    }
                    else {
                        $scope.message = 'Valid data :)';
                        $log.info($scope.message);
                        $log.info(data.data);
                        getAll();
                        $scope.assetModel = data.data;
                        setDivDisplay("detail");
                    }
                }, function (error) {
                    $scope.message = 'Error in posting data!';
                    $log.error($scope.message);
                    $scope.assetModel = {};
                    setDivDisplay("grid");
                })
        };

        $scope.getAssetForEdit = function (assetModel) {
            $scope.assetModel = assetModel;
            $scope.action = 'update';
            setDivDisplay("edit");
        };

        function updateAsset(assetModel) {
            $scope.assetModel.last_modified_by = $rootScope.globals.currentUser.username;
            $http.post('Asset/UpdateAsset', $scope.assetModel)
                .then(function (data) {
                    if (data == null || data.data == "") {
                        $scope.message = 'Invalid data!';
                        $log.warn($scope.message);
                        $scope.assetModel = {};
                        setDivDisplay("grid");
                    }
                    else {
                        $scope.message = 'Valid data :)';
                        $log.info($scope.message);
                        $log.info(data.data);
                        getAll();
                        $scope.assetModel = data.data;
                        setDivDisplay("detail");
                    }
                }, function (error) {
                    $scope.message = 'Error in posting data!';
                    $log.error($scope.message);
                    $scope.assetModel = {};
                    setDivDisplay("grid");
                })
        }

        $scope.actOnData = function (assetModel) {
            if ($scope.action == 'add')
            {
                addAsset(assetModel);
            }
            else if ($scope.action == 'update') {
                updateAsset(assetModel);
            }
        }

        $scope.searchAsset=function () {
            var searchText = $scope.searchText;// $('#txtSearch').val();
            $http.get('Asset/SearchAssets', { params: { searchString: searchText } })
                .then(function (data) {
                    if (data == undefined || data.data == {}) {
                        $scope.message = 'Invalid data!';
                        $log.warn($scope.message);
                    }
                    else {
                        $scope.message = 'Valid data :)';
                        $log.info($scope.message);
                        $log.info(data.data);
                        $scope.allAssets = data.data;
                    }
                }, function (error) {
                    $scope.message = 'Error in searching asset!';
                    $log.error($scope.message);
                })
        };
    }
])