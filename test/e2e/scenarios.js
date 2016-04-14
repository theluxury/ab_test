'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('abTestApp', function() {

  beforeEach(function() {
    browser.get('app/index.html');
  });

    it('should have 11 fields', function() {
	var fieldsList = element.all(by.repeater('field in fields'));
	expect(fieldsList.count()).toBe(11);
    });
    

});
