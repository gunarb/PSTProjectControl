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
                { field: 'date', type: 'date', cellFilter: 'date:\'MMM dd yyyy\'' },
                { field: 'prodigiousPM', name: 'Prodigious PM' },
                { field: 'idProjectStatus', name: 'Status', cellFilter: 'getStatusType:grid.appScope.projectStatus' },
                { name: 'View', width: 100, cellTemplate: '<div class="ui-grid-cell-contents"><a href="/workorder/view/{{ row.entity.uniqueId }}/{{ row.entity.secureCode }}"><i class="fa fa-link"></i></a></div>' },
                { name: 'Update', width: 100, cellTemplate: '<div class="ui-grid-cell-contents grid-update"><a href="/workorder/update/{{ row.entity.uniqueId }}/{{ row.entity.secureCode }}"><i class="fa fa-edit"></i></a></div>' }
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
var Pr = Pr || {};

Pr.preferences = {
    moveItems: function (origin, destination) {
        $(origin).find(':selected').appendTo(destination);
    },
    moveAllItems: function (origin, destination) {
        $(origin).children().appendTo(destination);
    },
    init: function() {
        $('#left').click(function () {
            Pr.preferences.moveItems('#assetsDestination', '#assetsOring');
        });
        $('#right').on('click', function () {
            Pr.preferences.moveItems('#assetsOring', '#assetsDestination');
        });
    }
};
Pr.preferences.init();

Pr.form = {
    init: function () {
        //$('html, body').animate({ scrollTop: 0 }, 'fast');
        alert("Preferences updated!");
    }
};

Pr.SelectedIndexChanged = {
    init: function () {
        //$('html, body').animate({ scrollTop: 0 }, 'fast');
        var typeRequest = $('#TypeRequest :selected').text();
        alert("On changed!" + typeRequest);
    }
};
var PC = PC || {};
PC.workOrder = {
    _prop: {},
    domainBtn: function () {
        var wrapper = $("#domains-inputs");
        var addButton = $("#btn-domains");
        var newDomain = $('#newDomain');
        var count = wrapper.data("count");

        $(addButton).click(function (e) {
            e.preventDefault();
            $(wrapper).append('<div><input name="Domains[' + count + '].domain1" type="text" class="form-control" placeholder="URL" value="' + newDomain.val() + '" /></div>');
            newDomain.val('');
            count++;
        });
    },
    targetDeviceBnt: function () {
        var wrapper = $("#targetDeviceList");
        var addButton = $("#btn-target-device");
        var newTargetDevice = $('#newTargetDevice');

        $(addButton).click(function (e) {
            e.preventDefault();

            const id = newTargetDevice.val().toLowerCase().replace(' ', '-');
            const liItem = '<li id="' + id + '"><span>' + newTargetDevice.val() +
                '</span><button onclick="PC.workOrder.Remove(' + id.toString() + ')" class="btn btn-primary"><i class="fa fa-times"></i></button></li>';
            $(wrapper).append(liItem);
            newTargetDevice.val('');
            PC.workOrder.Update();
        });
    },
    urlAffectedBtn: function () {
        var wrapper = $("#urlAffected-inputs");
        var addButton = $("#btn-urlAffected");
        var newUrlAffected = $('#newUrlAffected');
        var count = wrapper.data("count");

        $(addButton).click(function (e) {
            e.preventDefault();
            $(wrapper).append('<div><input name="EffectedUrls[' + count + '].url" type="text" class="form-control" placeholder="URL" value="' + newUrlAffected.val() + '" /></div>');
            newUrlAffected.val('');
            count++;
        });
    },
    thirdPartyURL: function () {
        var wrapper = $("#thirdParty-inputs");
        var addButton = $("#btn-thirdParty");
        var newThirdPartyUrl = $('#newThirdPartyUrl');
        var newThirdPartyUser = $('#newThirdPartyUser');
        var newThirdPartyPass = $('#newThirdPartyPass');
        var count = wrapper.data("count");

        $(addButton).click(function (e) {
            e.preventDefault();
            var newInputs = '<div><input name="ThirdPartyCredential[' + count + '].url" type="text" class="form-control" placeholder="URL" value="' + newThirdPartyUrl.val() + '" />';
            newInputs += '<input name="ThirdPartyCredential[' + count + '].userName" type="text" class="form-control" placeholder="User" value="' + newThirdPartyUser.val() + '" />';
            newInputs += '<input name="ThirdPartyCredential[' + count + '].passPCrd" type="text" class="form-control" placeholder="PassPCrd" value="' + newThirdPartyPass.val() + '" /></div>';

            $(wrapper).append(newInputs);
            newThirdPartyUrl.val('');
            newThirdPartyUser.val('');
            newThirdPartyPass.val('');
            count++;
        });
    },
    getWorkOrderId:function(contx) {
        const urlSplited = contx.baseURI.split('/');
        return parseInt(urlSplited[5]);
    },
    sendEmail: function(idWorkOrder, url) {
        $.ajax({
            url: "/WorkOrder/SendEmail",
            type: "POST",
            data: `{ 'idWorkOrder': '${idWorkOrder}', 'url': '${url}' }`,
            dataType: "text",
            contentType: "application/json; charset=utf-8",
            success: function(data) {
                console.log("email send");
            },
            error: function(e) {
                console.log(e);
            }
        });
    },
    Update: function() {
        const targetChilden = PC.workOrder._prop.targetList.children();
        var targets = "";

        for (let i = 0; i < targetChilden.length; i++) {
            targets += targetChilden[i].innerText + ";";
        }

        PC.workOrder._prop.targetDevice.val(targets);
    },
    OnSuccess: function(value) {
        $('html, body').animate({ scrollTop: 0 }, 'fast');
        PC.workOrder._prop.workOrderResult.removeClass("hide");
        PC.workOrder.sendEmail(PC.workOrder.getWorkOrderId(value.context), value.context.baseURI);
    },
    OnComplete: function(value) {
        const buttonValue = value.context.ownerDocument.activeElement.value;
        const urlPdf = value.context.baseURI.replace('update', 'generatepdf');
        if (buttonValue === "ExportPdf")
            window.location.href = urlPdf;
    },
    Remove: function(id) {
        id.remove();
        PC.workOrder.Update();
    },
    setSelector: function() {
        PC.workOrder._prop.referenceJob = $('#referenceJob');
        PC.workOrder._prop.targetDevice = $('#targetDevice');
        PC.workOrder._prop.targetList = $('#targetDeviceList');
        PC.workOrder._prop.workOrderResult = $('#workOrderResult');
        PC.workOrder._prop.referencePreviousJob = $('#referencePreviousJob');
    },
    init: function() {
        PC.workOrder.setSelector();
        PC.workOrder.domainBtn();
        PC.workOrder.targetDeviceBnt();
        PC.workOrder.urlAffectedBtn();
        PC.workOrder.thirdPartyURL();
        $(document).ready(function() {
            if (PC.workOrder._prop.targetDevice.val()) {
                var needButton = this.URL.indexOf("update") > -1;
                const targets = PC.workOrder._prop.targetDevice.val().split(';');
                targets.forEach(function(item) {
                    if (item === "") return;
                    const id = item.toLowerCase().replace(' ', '-');
                    var button = needButton
                        ? '<a onclick="PC.workOrder.Remove(' + id.toString() + ')" class="fa fa-times"></a>'
                        : '';
                    const liItem = '<span id="' + id + '" class="label label-primary">' + item + button + '</span>';
                    PC.workOrder._prop.targetList.append(liItem);
                });
            }
            if (PC.workOrder._prop.referencePreviousJob.val()) {
                $.ajax({
                    url: '/WorkOrder/GetProjectName',
                    data: `{ 'id': '${PC.workOrder._prop.referencePreviousJob.val()}'}`,
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    success: function(data) {
                        if (PC.workOrder._prop.referenceJob.is('div')) {
                            PC.workOrder._prop.referenceJob.text(data.shift().ProjectName);
                        } else {
                            PC.workOrder._prop.referenceJob.val(data.shift().ProjectName);
                        }
                    }
                });
            }
            PC.workOrder._prop.referenceJob.autocomplete({
                source: function(request, response) {
                    $.ajax({
                        url: '/WorkOrder/AutoComplete',
                        data: `{ 'prefix': '${request.term}'}`,
                        dataType: "json",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        success: function(data) {
                            response($.map(data,
                                function(item) {
                                    return { label: item.ProjectName, value: item.ProjectName, idPN: item.UniqueId };
                                }));
                        }
                    });
                },
                select: function(e, i) {
                    PC.workOrder._prop.referencePreviousJob.val(i.item.idPN);
                },
                minLength: 1
            });
        });
    }
};
PC.workOrder.init();