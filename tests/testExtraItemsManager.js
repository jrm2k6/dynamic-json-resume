var extraItemsManager = require("../lib/extraItemsManager");
var assert = require("assert");

describe('Verify html generation for extras items', function() {
    it('should return an empty string if the type is not known', function() {
  		var item = {"extra": {"type": "notAType"}};
  		var result = extraItemsManager.generateExtraItemsTemplateCode([item]);
  		assert.strictEqual(result[0], "", "the type is not managed and should return an empty string");
  	});

  	it('should return a string describing the div with the correct text if extraContent is a string and type is text', function() {
  		var item = {"id": "myId", "extra": {"type": "text", "extraContent": "testText"}};
  		var result = extraItemsManager.generateExtraItemsTemplateCode([item]);
  		assert.strictEqual(result[0], "<div id=\"myId-extra\">testText</div>");
  	});

  	it('should return an empty string if the extra content is not a string', function() {
  		var item = {"id": "myId", "extra": {"type": "text", "extraContent": []}};
  		var result = extraItemsManager.generateExtraItemsTemplateCode([item]);
  		assert.strictEqual(result[0], "");
  	});

  	it('should return a string describing the div with the correct text if extraContent is a string and type is image', function() {
  		var item = {"id": "myId", "extra": {"type": "images", "extraContent": "url1"}};
  		var result = extraItemsManager.generateExtraItemsTemplateCode([item]);
  		assert.strictEqual(result[0], "<div style=\"display: flex; flex-wrap:wrap; justify-content: center\" id=\"myId-extra\"><div class=\"extra-image-item\" style=\"flex: 0 0 auto;\"><img src=\"url1\"/></div></div>");
  	});

  	it('should return a string describing the div with the correct text if extraContent is an array of urls and type is images', function() {
  		var item = {"id": "myId", "extra": {"type": "images", "extraContent": ["url1", "url2"]}};
  		var result = extraItemsManager.generateExtraItemsTemplateCode([item]);
  		assert.strictEqual(result[0], "<div style=\"display: flex; flex-wrap:wrap; justify-content: center\" id=\"myId-extra\"><div class=\"extra-image-item\" style=\"flex: 0 0 auto;\"><img src=\"url1\" style=\"width: 50%; height: 50%\"/></div><div class=\"extra-image-item\" style=\"flex: 0 0 auto;\"><img src=\"url2\" style=\"width: 50%; height: 50%\"/></div></div>");
  	});

  	it('should return an empty string if the extra content is not a string', function() {
  		var item = {"id": "myId", "extra": {"type": "images", "extraContent": 2}};
  		var result = extraItemsManager.generateExtraItemsTemplateCode([item]);
  		assert.strictEqual(result[0], "");
  	});
});

