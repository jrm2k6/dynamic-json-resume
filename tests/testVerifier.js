var verifier = require("../lib/verifier");
var assert = require("assert");

describe('Verify json parsing for general structure', function() {
  it('should return false if no resume section in json structure', function() {
		var struct = {random:{}};
		var result = verifier.run(struct);
		assert.equal(false, result);
	});

  it('should return false if no contact section in json structure', function() {
    var struct = {resume:{education:[], work:[], projects:[], skills:[], hobbies:[], languages:[]}};
    var result = verifier.run(struct);
    assert.equal(false, result);
  });

  it('should return false if no education section in json structure', function() {
    var struct = {resume:{contact:{first_name: 'a', last_name: 'b', city: 'c', email: 'd'}, work:[], projects:[], skills:[], hobbies:[], languages:[]}};
    var result = verifier.run(struct);
    assert.equal(false, result);
  });

  it('should return false if no work section in json structure', function() {
    var struct = {resume:{contact:{first_name: 'a', last_name: 'b', city: 'c', email: 'd'}, education:[], projects:[], skills:[], hobbies:[], languages:[]}};
    var result = verifier.run(struct);
    assert.equal(false, result);
  });

  it('should return false if no projects section in json structure', function() {
    var struct = {resume:{contact:{first_name: 'a', last_name: 'b', city: 'c', email: 'd'}, work:[], education:[], skills:[], hobbies:[], languages:[]}};
    var result = verifier.run(struct);
    assert.equal(false, result);
  });

  it('should return false if no skills section in json structure', function() {
    var struct = {resume:{contact:{first_name: 'a', last_name: 'b', city: 'c', email: 'd'}, work:[], projects:[], education:[], hobbies:[], languages:[]}};
    var result = verifier.run(struct);
    assert.equal(false, result);
  });

  it('should return false if no hobbies section in json structure', function() {
    var struct = {resume:{contact:{first_name: 'a', last_name: 'b', city: 'c', email: 'd'}, work:[], projects:[], skills:[], education:[], languages:[]}};
    var result = verifier.run(struct);
    assert.equal(false, result);
  });

  it('should return false if no languages section in json structure', function() {
    var struct = {resume:{contact:{first_name: 'a', last_name: 'b', city: 'c', email: 'd'}, work:[], projects:[], skills:[], education:[], hobbies:[]}};
    var result = verifier.run(struct);
    assert.equal(false, result);
  });

});

describe('Verify json parsing for contact structure', function() {
  it('should return false if no first_name in contact section', function() {
    var struct = {resume:{contact:{last_name: 'b', city: 'c', email: 'd'}, education:[], work:[], projects:[], skills:[], hobbies:[], languages:[]}};
    var result = verifier.run(struct);
    assert.equal(false, result);
  });

  it('should return false if no first_name in contact section', function() {
    var struct = {resume:{contact:{first_name: 'a', city: 'c', email: 'd'}, education:[], work:[], projects:[], skills:[], hobbies:[], languages:[]}};
    var result = verifier.run(struct);
    assert.equal(false, result);
  });

  it('should return false if no first_name in contact section', function() {
    var struct = {resume:{contact:{first_name: 'a', last_name: 'b', email: 'd'}, education:[], work:[], projects:[], skills:[], hobbies:[], languages:[]}};
    var result = verifier.run(struct);
    assert.equal(false, result);
  });

  it('should return false if no first_name in contact section', function() {
    var struct = {resume:{contact:{first_name: 'a', last_name: 'b', city: 'c'}, education:[], work:[], projects:[], skills:[], hobbies:[], languages:[]}};
    var result = verifier.run(struct);
    assert.equal(false, result);
  });

  it('should return true if contact is completed correctly', function() {
    var struct = {resume:{contact:{first_name: 'a', last_name: 'b', city: 'c', email: 'd'}, education:[], work:[], projects:[], skills:[], hobbies:[], languages:[]}};
    var result = verifier.run(struct);
    assert.equal(true, result);
  });
});

describe('Verify json parsing for item-education structure', function() {
  it('should return false if no start-date in education-item', function() {
    var struct = {resume:{contact:{first_name: 'a', last_name: 'b', city: 'c', email: 'd'}, education:[{"item-education": {"end-date": 'b', institution: {name:'name', city:'city', country:'country'}, description: 'description'}}], work:[], projects:[], skills:[], hobbies:[], languages:[]}};
    var result = verifier.run(struct);
    assert.equal(false, result);
  });

  it('should return false if no end-date in education-item', function() {
    var struct = {resume:{contact:{first_name: 'a', last_name: 'b', city: 'c', email: 'd'}, education:[{"item-education": {"start-date": 'a', institution: {name:'name', city:'city', country:'country'}, description: 'description'}}], work:[], projects:[], skills:[], hobbies:[], languages:[]}};
    var result = verifier.run(struct);
    assert.equal(false, result);
  });
          
  it('should return false if no description in education-item', function() {
    var struct = {resume:{contact:{first_name: 'a', last_name: 'b', city: 'c', email: 'd'}, education:[{"item-education": {"start-date": 'a', "end-date": 'b', institution: {name:'name', city:'city', country:'country'}}}], work:[], projects:[], skills:[], hobbies:[], languages:[]}};
    var result = verifier.run(struct);
    assert.equal(false, result);
  });

  it('should return false if no insitution in education-item', function() {
    var struct = {resume:{contact:{first_name: 'a', last_name: 'b', city: 'c', email: 'd'}, education:[{"item-education": {"start-date": 'a', "end-date": 'b', description: 'description'}}], work:[], projects:[], skills:[], hobbies:[], languages:[]}};
    var result = verifier.run(struct);
    assert.equal(false, result);
  });
  
  // it('should return false if no institution does not contain a name', function() {
  //   var struct = {resume:{contact:{first_name: 'a', last_name: 'b', city: 'c', email: 'd'}, education:[{"item-education": {"start-date": 'a', "end-date": 'b', institution: {city:'city', country:'country'}, description: 'description'}}], work:[], projects:[], skills:[], hobbies:[], languages:[]}};
  //   var result = verifier.run(struct);
  //   console.log(result)
  //   assert.equal(false, result);
  // });

  // it('should return false if no institution does not contain a city', function() {
  //   var struct = {resume:{contact:{first_name: 'a', last_name: 'b', city: 'c', email: 'd'}, education:[{"item-education": {"start-date": 'a', "end-date": 'b', institution: {name:'name', country:'country'}, description: 'description'}}], work:[], projects:[], skills:[], hobbies:[], languages:[]}};
  //   var result = verifier.run(struct);
  //   assert.equal(false, result);
  // });

  // it('should return false if no institution does not contain a country', function() {
  //   var struct = {resume:{contact:{first_name: 'a', last_name: 'b', city: 'c', email: 'd'}, education:[{"item-education": {"start-date": 'a', "end-date": 'b', institution: {name:'name', city:'city'}, description: 'description'}}], work:[], projects:[], skills:[], hobbies:[], languages:[]}};
  //   var result = verifier.run(struct);
  //   assert.equal(false, result);
  // });
});

describe('Verify json parsing for item-work structure', function() {
  it('should return true if education-work is correct', function() {
    var struct = {resume:{contact:{first_name: 'a', last_name: 'b', city: 'c', email: 'd'}, education:[], work:[{"item-work": {"start-date":'start', "end-date": 'b', company: {}, achievements: 'achievements', technologies:[]}}], projects:[], skills:[], hobbies:[], languages:[]}};
    var result = verifier.run(struct);
    assert.equal(true, result);
  });

  it('should return false if no start-date in item-work', function() {
    var struct = {resume:{contact:{first_name: 'a', last_name: 'b', city: 'c', email: 'd'}, education:[], work:[{"item-work": {"end-date": 'b', company: {}, achievements: 'achievements', technologies:[]}}], projects:[], skills:[], hobbies:[], languages:[]}};
    var result = verifier.run(struct);
    assert.equal(false, result);
  });

  it('should return false if no end-date in item-work', function() {
    var struct = {resume:{contact:{first_name: 'a', last_name: 'b', city: 'c', email: 'd'}, education:[], work:[{"item-work": {"start-date":'start', company: {}, achievements: 'achievements', technologies:[]}}], projects:[], skills:[], hobbies:[], languages:[]}};
    var result = verifier.run(struct);
    assert.equal(false, result);
  });

  it('should return false if no company in item-work', function() {
    var struct = {resume:{contact:{first_name: 'a', last_name: 'b', city: 'c', email: 'd'}, education:[], work:[{"item-work": {"start-date":'start', "end-date": 'b', achievements: 'achievements', technologies:[]}}], projects:[], skills:[], hobbies:[], languages:[]}};
    var result = verifier.run(struct);
    assert.equal(false, result);
  });

  it('should return false if no achievements in item-work', function() {
    var struct = {resume:{contact:{first_name: 'a', last_name: 'b', city: 'c', email: 'd'}, education:[], work:[{"item-work": {"start-date":'start', "end-date": 'b', company: {}, technologies:[]}}], projects:[], skills:[], hobbies:[], languages:[]}};
    var result = verifier.run(struct);
    assert.equal(false, result);
  });

  it('should return false if no technologies in item-work', function() {
    var struct = {resume:{contact:{first_name: 'a', last_name: 'b', city: 'c', email: 'd'}, education:[], work:[{"item-work": {"start-date":'start', "end-date": 'b', company: {}, achievements: 'achievements'}}], projects:[], skills:[], hobbies:[], languages:[]}};
    var result = verifier.run(struct);
    assert.equal(false, result);
  });
});

describe('Verify json parsing for item-projects structure', function() {
  it('should return true if item-projects is correct', function() {
    var struct = {resume:{contact:{first_name: 'a', last_name: 'b', city: 'c', email: 'd'}, education:[], work:[], projects:[{"item-projects": {title:'title', description:'description', technologies:[]}}], skills:[], hobbies:[], languages:[]}};
    var result = verifier.run(struct);
    assert.equal(true, result);
  });

  it('should return false if no title in item-projects', function() {
    var struct = {resume:{contact:{first_name: 'a', last_name: 'b', city: 'c', email: 'd'}, education:[], work:[], projects:[{"item-projects": {description:'description', technologies:[]}}], skills:[], hobbies:[], languages:[]}};
    var result = verifier.run(struct);
    assert.equal(false, result);
  });

  it('should return false if no description in item-projects', function() {
    var struct = {resume:{contact:{first_name: 'a', last_name: 'b', city: 'c', email: 'd'}, education:[], work:[], projects:[{"item-projects": {title:'title', technologies:[]}}], skills:[], hobbies:[], languages:[]}};
    var result = verifier.run(struct);
    assert.equal(false, result);
  });

  it('should return false if no technologies in item-projects', function() {
    var struct = {resume:{contact:{first_name: 'a', last_name: 'b', city: 'c', email: 'd'}, education:[], work:[], projects:[{"item-projects": {title:'title', description:'description'}}], skills:[], hobbies:[], languages:[]}};
    var result = verifier.run(struct);
    assert.equal(false, result);
  });
});

describe('Verify json parsing for item-languages structure', function() {
  it('should return true if item-languages is correct', function() {
    var struct = {resume:{contact:{first_name: 'a', last_name: 'b', city: 'c', email: 'd'}, education:[], work:[], projects:[], skills:[], hobbies:[], languages:[{"item-languages": {name: 'name'}}]}};
    var result = verifier.run(struct);
    assert.equal(true, result);
  });

  it('should return false if item-languages does not have a name', function() {
    var struct = {resume:{contact:{first_name: 'a', last_name: 'b', city: 'c', email: 'd'}, education:[], work:[], projects:[], skills:[], hobbies:[], languages:[{"item-languages": {nameBis: 'name'}}]}};
    var result = verifier.run(struct);
    assert.equal(false, result);
  });
});

describe('Verify json parsing for item-hobbies structure', function() {
  it('should return true if item-hobbies is correct', function() {
    var struct = {resume:{contact:{first_name: 'a', last_name: 'b', city: 'c', email: 'd'}, education:[], work:[], projects:[], skills:[], hobbies:[{"item-hobbies": {name: 'name'}}], languages:[]}};
    var result = verifier.run(struct);
    assert.equal(true, result);
  });

  it('should return false if item-hobbies does not have a name', function() {
    var struct = {resume:{contact:{first_name: 'a', last_name: 'b', city: 'c', email: 'd'}, education:[], work:[], projects:[], skills:[], hobbies:[{"item-hobbies": {nameBis: 'name'}}], languages:[]}};
    var result = verifier.run(struct);
    assert.equal(false, result);
  });
});
