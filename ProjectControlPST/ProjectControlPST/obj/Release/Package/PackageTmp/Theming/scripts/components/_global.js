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

