//Controller function to load the data
app.controller('GridCtrl', function ($scope, $http, projectControlService) {
    //**** global variables ****
    $scope.alertType = 'info';
    $scope.loadigMessage = '<p>Loading data, please wait...!</p>';

    //**** get the data from the DB and create the grid ****
    $scope.GetProjects = function () {
        //**** variables ****
        $scope.typeRequest = null;
        $scope.projectStatus = null;
        $scope.dataLoaded = false;

        //**** grid options ****
        $scope.gridOptions = {
            onRegisterApi: function (gridApi) {
                $scope.gridApi = gridApi;
                $scope.gridApi.grid.registerRowsProcessor($scope.searchFilter, 10000);
            },
            columnDefs: [
                { field: 'projectName', name: 'Project' },
                { field: 'idTypeRequest', name: 'Request Type', cellFilter: 'getTypeRequest:grid.appScope.typeRequest' },
                { field: 'date', type: 'date', cellFilter: 'date:\'MMM dd yyyy\'' },
                { field: 'prodigiousPM', name: 'Prodigious PM' },
                { field: 'idProjectStatus', name: 'Status', cellFilter: 'getStatusType:grid.appScope.projectStatus' },
                { name: 'View', width: 100, cellTemplate: '<div><a href="/workorder/detail/{{ row.entity.uniqueId }}/{{ row.entity.secureCode }}"><span class="glyphicon glyphicon-eye-open"></span></a></div>' },
                { name: 'Update', width: 100, cellTemplate: '<div><a href="/workorder/update/{{ row.entity.uniqueId }}/{{ row.entity.secureCode }}"><span class="glyphicon glyphicon-pencil"></span></a></div>' }
            ]
        };
        //**** get and map id and request type from TypeRequest Table data ****
        projectControlService.GetTypeRequest().then(function (d) {
            $scope.typeRequest = new Array();
            var typeRequestData = d.data;
            typeRequestData.forEach(function (item) {
                $scope.typeRequest[item.uniqueId] = item.request;
            });
        }, function () {
            if ($scope.loadigMessage === '<p>Loading data, please wait...!</p>') {
                $scope.loadigMessage = '';
            }
            $scope.alertType = 'danger';
            $scope.loadigMessage = $scope.loadigMessage + "<p>Error loading TypeRequest Table from the Data Base. <strong>Please check the Data Base connection</strong></p>";
        });
        //**** get and map id and project status from ProjectStatus Table data ****
        projectControlService.GetProjectStatus().then(function (d) {
            $scope.projectStatus = new Array();
            var projectStatusData = d.data;
            projectStatusData.forEach(function (item) {
                $scope.projectStatus[item.uniqueId] = item.status;
            });
        }, function () {
            if ($scope.loadigMessage === '<p>Loading data, please wait...!</p>') {
                $scope.loadigMessage = '';
            }
            $scope.alertType = 'danger';
            $scope.loadigMessage = $scope.loadigMessage + "<p>Error loading ProjectStatus Table from the Data Base. <strong>Please check the Data Base connection</strong></p>";
        });
        //**** get Work Order Table data ****
        projectControlService.GetWorkOrder().then(function (d) {
            $scope.dataLoaded = true;
            $scope.gridOptions.data = d.data;
        }, function () {
            if ($scope.loadigMessage === '<p>Loading data, please wait...!</p>') {
                $scope.loadigMessage = '';
            }
            $scope.alertType = 'danger';
            $scope.loadigMessage = $scope.loadigMessage + "<p>Error loading WorkOrder Table from the Data Base. <strong>Please check the Data Base connection</strong></p>";
        });
    };
    $scope.GetProjects();
})
.filter('getTypeRequest', function () {
    return function (value, scope) {
        return scope[value];
    };
})
.filter('getStatusType', function () {
    return function (value, scope) {
        return scope[value];
    };
});