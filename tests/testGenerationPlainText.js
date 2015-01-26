var utils = require("../lib/utils");
var assert = require("assert");

describe('Verify plain text generation of a simple array', function() {
    it('should return all the elements of the array on each line', function() {
      var item = {"arr" : ["one", "two", "three"]};
      var res = utils.generatePlainTextSection(item, "arr");
      assert.strictEqual(res, "one\ntwo\nthree\n");
  	});
});

describe('Verify plain text generation of a simple object', function() {
    it('should return all key, values of object on each line', function() {
      var item = {"arr" : {'key-one': 1, 'key-two': 2}};
      var res = utils.generatePlainTextSection(item, "arr");
      assert.strictEqual(res, "key-one : 1\nkey-two : 2\n");
    });
});

describe('Verify plain text generation of an object with extra as key', function() {
    it('should return an empty string', function() {
      var item = {"extra" : {'key-one': 1, 'key-two': 2}};
      var res = utils.generatePlainTextSection(item, "arr");
      assert.strictEqual(res, "");
    });
});

describe('Verify plain text generation of an object with id as key', function() {
    it('should return an empty string', function() {
      var item = {"id" : {'key-one': 1, 'key-two': 2}};
      var res = utils.generatePlainTextSection(item, "arr");
      assert.strictEqual(res, "");
    });
});

describe('Verify plain text generation of an array of objects', function() {
    it('should return all key, values of object on each line', function() {
      var item = {"education": [
      {
        "item-education": {
          "start-date": "Sep, 2011",
          "end-date": "May, 2012",
        }
      },
      { 
        "item-education": {
          "start-date": "Sep, 2009",
          "end-date": "Oct, 2012",
        }
      },
      { 
        "item-education": {
          "start-date": "Sep, 2006",
          "end-date": "May, 2009",
        }
      }
    ]};
      var res = utils.generatePlainTextSection(item, "education");
      var expected = "start-date : Sep, 2011\nend-date : May, 2012\n\nstart-date : Sep, 2009\nend-date : Oct, 2012\n\nstart-date : Sep, 2006\nend-date : May, 2009\n\n"
      assert.strictEqual(res, expected);
    });
});
