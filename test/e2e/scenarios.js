'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('abTestApp', function() {
    var _TAG_IDS = ['treatment', 'success'];
    beforeEach(function() {
	browser.get('app/index.html');
    });
    it('should have 11 fields', function() {
	var fieldsList = element.all(by.repeater('field in fields'));
	expect(fieldsList.count()).toBe(11);
    });
    
    it('should be able to add and remove tags', function() {
	var treatmentContainer = element(by.id(_TAG_IDS[0]));
	var treatmentFields = treatmentContainer.all(by.repeater('tag in field.tags'));
	expect(treatmentFields.count()).toBe(1);
	treatmentContainer.all(by.buttonText('Add another tag')).click();
	expect(treatmentFields.count()).toBe(2);
	treatmentContainer.all(by.buttonText('Add another tag')).click();
	expect(treatmentFields.count()).toBe(3);
	treatmentContainer.all(by.buttonText('Remove last tag')).click();
	expect(treatmentFields.count()).toBe(2);

	// Now check other tag
	var successContainer = element(by.id(_TAG_IDS[1]));
	var successFields = successContainer.all(by.repeater('tag in field.tags'));
	expect(successFields.count()).toBe(1);
	// Make sure won't do below one
	successContainer.all(by.buttonText('Remove last tag')).click();
	expect(successFields.count()).toBe(1);
	// Then add one just for fun
	successContainer.all(by.buttonText('Add another tag')).click();
	expect(successFields.count()).toBe(2);
    });
});
