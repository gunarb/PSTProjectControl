/// <reference path="../bower_components/angular/angular.min.js"/>

var app = angular.module('app', ['ngTouch', 'ui.grid', 'ngSanitize']);

//**** call the .net controllers to conect to the DB  ****
app.factory('projectControlService', function ($http) {
    var res = {};
    res.GetWorkOrder = function () {
        return $http({
            method: 'GET',
            dataType: 'jsonp',
            url: 'api/projectControl/getWorkOrder'
        });
    }
    res.GetProjectStatus = function () {
        return $http({
            method: 'GET',
            dataType: 'jsonp',
            url: 'api/projectControl/getProjectStatus'
        });
    }
    res.GetTypeRequest = function () {
        return $http({
            method: 'GET',
            dataType: 'jsonp',
            url: 'api/projectControl/getTypeRequest'
        });
    }
    return res;
});


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
                { field: 'date' },
                { field: 'prodigiousPM', name: 'Prodigious PM' },
                { field: 'idProjectStatus', name: 'Status', cellFilter: 'getStatusType:grid.appScope.projectStatus' },
                { field: 'idProjectDescription', name: 'Description' }
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
var WO = WO || {};

// domainBtn insert input
WO.domainBtn = {
    init: function () {
        var count = 1;
        var wrapper = $("#domains-inputs");
        var addButton = $("#btn-domains");
        var newDomain = $('#newDomain');

        $(addButton).click(function (e) {
            e.preventDefault();
            $(wrapper).append('<input id="new-domain-' + count + '" type="text" class="form-control" placeholder="URL" value="' + newDomain.val() + '" />');
            newDomain.val('');
            count++;
        });
    }
};
WO.domainBtn.init();

// urlAffectedBtn insert input
WO.urlAffectedBtn = {
    init: function () {
        var count = 1;
        var wrapper = $("#urlAffected-inputs");
        var addButton = $("#btn-urlAffected");
        var newUrlAffected = $('#newUrlAffected');

        $(addButton).click(function (e) {
            e.preventDefault();
            $(wrapper).append('<input id="new-urlAffected-' + count + '" type="text" class="form-control" placeholder="URL" value="' + newUrlAffected.val() + '" />');
            newUrlAffected.val('');
            count++;
        });
    }
};
WO.urlAffectedBtn.init();

// thirdPartyURL insert input
WO.thirdPartyURL = {
    init: function () {
        var count = 1;
        var wrapper = $("#thirdParty-inputs");
        var addButton = $("#btn-thirdParty");
        var newThirdPartyUrl = $('#newThirdPartyUrl');
        var newThirdPartyUser = $('#newThirdPartyUser');
        var newThirdPartyPass = $('#newThirdPartyPass');

        $(addButton).click(function (e) {
            e.preventDefault();
            var newInputs = '<input id="new-thirdPartyURL-' + count + '" type="text" class="form-control" placeholder="URL" value="' + newThirdPartyUrl.val() + '" />';
            newInputs += '<input id="new-thirdPartyUser-' + count + '" type="text" class="form-control" placeholder="URL" value="' + newThirdPartyUser.val() + '" />';
            newInputs += '<input id="new-thirdPartyPass-' + count + '" type="text" class="form-control" placeholder="URL" value="' + newThirdPartyPass.val() + '" />';

            $(wrapper).append(newInputs);
            newThirdPartyUrl.val('');
            newThirdPartyUser.val('');
            newThirdPartyPass.val('');
            count++;
        });
    }
};
WO.thirdPartyURL.init();