'use strict';
/* Controllers */
var abTestApp = angular.module('abTestApp', []);

abTestApp.controller('ABFieldsCtrl', function ($scope) {
    $scope.fields = [
	{'key': 'Test Name', 'type': 'text'},
	{'key': 'Description', 'type': 'block'},
	{'key': 'Start Date', 'type': 'date'},
	{'key': 'End Date', 'type': 'date'},
	{'key': 'Comment', 'type': 'block'},
	{'key': 'Category', 'type': 'select', 'options': ['Frontend', 'Backend', 'Product', 'Design']},
	{'key': 'Product', 'type': 'select', 'options': ['CRM', 'Inbox', 'IQCloud']},
	{'key': 'Owner', 'type': 'text'},
	{'key': 'Email', 'type': 'email'},
	// TODO: is rules the right word here?
	{'key': 'Treatments Tags', 'type': 'object', 'tags': [{}]},
	{'key': 'Success Tags', 'type': 'object', 'tags': [{}]}
    ];

    $scope.addNewTag = function(key) {
	var jsonObject = findObject(key);
	jsonObject.tags.push({});
    };
    $scope.removeLastTag = function(key) {
	var jsonObject = findObject(key);
	jsonObject.tags.pop();
    }

    var findObject = function(key) {
	var objectArray = $scope.fields.filter(function( obj ) {
	    return obj.key == key;
	});
	return objectArray[0];
    }
	
    
});
