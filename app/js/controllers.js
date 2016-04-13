'use strict';
/* Controllers */
var abTestApp = angular.module('abTestApp', []);

abTestApp.controller('ABFieldsCtrl', function ($scope, $http) {
    $http.get('fields/fields.json').success(function(data) {
	$scope.fields = data;
    });

    var findObject = function(key) {
	var objectArray = $scope.fields.filter(function( obj ) {
	    return obj.key == key;
	});
	return objectArray[0];
    }
    
    $scope.addNewTag = function(key) {
	var jsonObject = findObject(key);
	jsonObject.tags.push({});
    };
    $scope.removeLastTag = function(key) {
	var jsonObject = findObject(key);
	jsonObject.tags.pop();
    }
});
