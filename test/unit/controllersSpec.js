'use strict';

/* jasmine specs for controllers go here */

describe('ABFieldsCtrl', function() {
    var scope, ctrl, $httpBackend;
    var _TAG_KINDS = ['Treatment Tags', 'Success Tags'];
    var _JSON_RESPONSE = [{"key": "Treatment Tags", "id": "treatment", "type": "object", "tags": [{}]},
			  {"key": "Success Tags", "id": "success", "type": "object", "tags": [{}]}]

    // Load our app module definition before each test.
    beforeEach(module('abTestApp'));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service in order to avoid a name conflict.
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
	$httpBackend = _$httpBackend_;
	$httpBackend.expectGET('fields/fields.json').
	    respond(_JSON_RESPONSE);
	scope = $rootScope.$new();
	ctrl = $controller('ABFieldsCtrl', {$scope: scope});
	expect(scope.fields).toBeUndefined();
	$httpBackend.flush();
    }));

    it('should be able to find object', function() {
	expect(scope.findObject(_TAG_KINDS[0])).toEqual({"key": "Treatment Tags", "type": "object", "tags": [{}]});
    });

    it('should raise error if can\'t find object', function() {
	expect(function() {scope.findObject('Fake Name');}).toThrow("Trying to find an object that doesn't exist.");
    });
    
    it('should be able to add and remove tags', function() {
	expect(scope.fields.length).toBe(2);
	expect(scope.findObject(_TAG_KINDS[0]).tags.length).toBe(1);
	scope.addNewTag(_TAG_KINDS[0]);
	expect(scope.findObject(_TAG_KINDS[0]).tags.length).toBe(2);
	scope.addNewTag(_TAG_KINDS[0]);
	expect(scope.findObject(_TAG_KINDS[0]).tags.length).toBe(3);
	scope.removeLastTag(_TAG_KINDS[0]);
	expect(scope.findObject(_TAG_KINDS[0]).tags.length).toBe(2);

	// Now check the other tag
	expect(scope.findObject(_TAG_KINDS[1]).tags.length).toBe(1);
	// Make sure it can't go below one
	scope.removeLastTag(_TAG_KINDS[1]);
	expect(scope.findObject(_TAG_KINDS[1]).tags.length).toBe(1);
	// Add one just for funsies.
	scope.addNewTag(_TAG_KINDS[1]);
	expect(scope.findObject(_TAG_KINDS[1]).tags.length).toBe(2);
    });

    it('should not allow misnamed tags', function() {
	expect(function() {scope.addNewTag("Comment");}).toThrow("Trying to push tag onto key that is not Treatment Tags or Success Tags");
    });
});
