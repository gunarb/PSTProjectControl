/// <reference path="../bower_components/angular/angular.min.js"/>

var app = angular.module('app', ['ngTouch', 'ui.grid', 'ngSanitize']);

//**** call the .net controllers to conect to the DB  ****
app.factory('projectControlService', function ($http) {
    var res = {};
    res.GetWorkOrder = function () {
        return $http({
            method: 'GET',
            dataType: 'jsonp',
            url: 'api/PstProjectControlInfo/GetWorkOrder'
        });
    }
    res.GetProjectDescription = function () {
        return $http({
            method: 'GET',
            dataType: 'jsonp',
            url: 'api/PstProjectControlInfo/GetProjectDescription'
        });
    }
    res.GetProjectStatus = function () {
        return $http({
            method: 'GET',
            dataType: 'jsonp',
            url: 'api/PstProjectControlInfo/GetProjectStatus'
        });
    }
    res.GetTypeRequest = function () {
        return $http({
            method: 'GET',
            dataType: 'jsonp',
            url: 'api/PstProjectControlInfo/GetTypeRequest'
        });
    }
    return res;
});

