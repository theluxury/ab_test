'use strict';
/* Controllers */
var abTestApp = angular.module('abTestApp', []);

abTestApp.controller('ABFieldsCtrl', function ($scope, $http) {
    $http.get('fields/fields.json').success(function(data) {
	$scope.fields = data;
    });

    var _TAG_KINDS = ['Treatment Tags', 'Success Tags'];

    var findObject = function(key) {
	var objectArray = $scope.fields.filter(function(obj) {
	    return obj.key == key;
	});
	return objectArray[0];
    }

    /**
     * Adds a new field to put information for tags
     * @param {String} key, the kind of tag you want to push. Must be either 'Treatment Tags' or 'Success Tags' 
     */
    $scope.addNewTag = function(key) {
	if (_TAG_KINDS.indexOf(key) < 0) {
	    throw "Trying to push tag onto key that is not Treatment Tags or Success Tags";
	    return;
	}
	var jsonObject = findObject(key);
	jsonObject.tags.push({});
    };
    /**
     * Removes last field to put information for tags
     * @param {String} key, the kind of tag you want to push. Must be either 'Treatment' or 'Success' 
     */
    $scope.removeLastTag = function(key) {
	if (_TAG_KINDS.indexOf(key) < 0) {
	    throw "Trying to push tag onto key that is not Treatment Tags or Success Tags";
	    return;
	}
	var jsonObject = findObject(key);
	jsonObject.tags.pop();
    }

    /**
     * Submits the form to mongo db.
     */
    $scope.submitForm = function() {
	console.log($scope.fields);
    }
});
