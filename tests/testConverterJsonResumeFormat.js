var converter = require("../lib/converterJsonResumeFormat");
var assert = require("assert");


var BASICS_WITH_GITHUB = {
  "name": "Richard Hendriks",
  "label": "Programmer",
  "picture": "",
  "email": "richard.hendriks@mail.com",
  "phone": "(912) 555-4321",
  "website": "http://richardhendricks.com",
  "summary": "Richard hails from Tulsa. He has earned degrees from the University of Oklahoma and Stanford. (Go Sooners and Cardinals!) Before starting Pied Piper, he worked for Hooli as a part time software developer. While his work focuses on applied information theory, mostly optimizing lossless compression schema of both the length-limited and adaptive variants, his non-work interests range widely, everything from quantum computing to chaos theory. He could tell you about it, but THAT would NOT be a “length-limited” conversation!",
  "location": {
    "address": "2712 Broadway St",
    "postalCode": "CA 94115",
    "city": "San Francisco",
    "countryCode": "US",
    "region": "California"
  },
  "profiles": [
    {
      "network": "Twitter",
      "username": "neutralthoughts",
      "url": ""
    },
    {
      "network": "Github",
      "username": "jrm2k6",
      "url": "https://github.com/jrm2k6"
    }
  ]
};

var BASICS_WITHOUT_GITHUB = {
  "name": "Richard Hendriks",
  "label": "Programmer",
  "picture": "",
  "email": "richard.hendriks@mail.com",
  "phone": "(912) 555-4321",
  "website": "http://richardhendricks.com",
  "summary": "Richard hails from Tulsa. He has earned degrees from the University of Oklahoma and Stanford. (Go Sooners and Cardinals!) Before starting Pied Piper, he worked for Hooli as a part time software developer. While his work focuses on applied information theory, mostly optimizing lossless compression schema of both the length-limited and adaptive variants, his non-work interests range widely, everything from quantum computing to chaos theory. He could tell you about it, but THAT would NOT be a “length-limited” conversation!",
  "location": {
    "address": "2712 Broadway St",
    "postalCode": "CA 94115",
    "city": "San Francisco",
    "countryCode": "US",
    "region": "California"
  },
  "profiles": [
    {
      "network": "Twitter",
      "username": "neutralthoughts",
      "url": ""
    }
  ]
};

var WORK = [
  {
    "company": "Pied Piper",
    "position": "CEO/President",
    "website": "http://piedpiper.com",
    "startDate": "2013-12-01",
    "endDate": "2014-12-01",
    "summary": "Pied Piper is a multi-platform technology based on a proprietary universal compression algorithm that has consistently fielded high Weisman Scores™ that are not merely competitive, but approach the theoretical limit of lossless compression.",
    "highlights": [
      "Build an algorithm for artist to detect if their music was violating copy right infringement laws",
      "Successfully won Techcrunch Disrupt",
      "Optimized an algorithm that holds the current world record for Weisman Scores"
    ]
  }
];

var EDUCATION = [
  {
    "institution": "University of Oklahoma",
    "area": "Information Technology",
    "studyType": "Bachelor",
    "startDate": "2011-06-01",
    "endDate": "2014-01-01",
    "gpa": "4.0",
    "courses": [
      "DB1101 - Basic SQL",
      "CS2011 - Java Introduction"
    ]
  },

  {
    "institution": "University of LOL",
    "area": "Information Technology",
    "studyType": "Bachelor",
    "startDate": "2011-06-01",
    "endDate": "2014-01-01",
    "gpa": "4.0",
    "courses": [
      "DB1101 - Basic SQL",
      "CS2011 - Java Introduction"
    ]
  }
];

SKILLS = [
  {
    "name": "Web Development",
    "level": "Master",
    "keywords": [
      "HTML",
      "CSS",
      "Javascript"
    ]
  },
  {
    "name": "Compression",
    "level": "Master",
    "keywords": [
      "Mpeg",
      "MP4",
      "GIF"
    ]
  }
];

LANGUAGES = [
  {
    "language": "English",
    "fluency": "Native speaker"
  }
];

INTERESTS = [
  {
    "name": "Wildlife",
    "keywords": [
      "Ferrets",
      "Unicorns"
    ]
  }
];

describe('Verify contact section generation', function() {
    it('should return a full contact section', function() {
      var item = {
        "basics" : BASICS_WITH_GITHUB,
        "work": [],
        "education": [],
        "skills": [],
        "languages": [],
        "interests": []
      };


      var res = converter.parseJsonResumeFormat(item);
      assert.notEqual(res.resume.contact,  undefined);
      assert.strictEqual(res.resume.contact["first_name"], "Richard");
      assert.strictEqual(res.resume.contact["last_name"], "Hendriks");
      assert.strictEqual(res.resume.contact["website"], "http://richardhendricks.com");
      assert.strictEqual(res.resume.contact["email"], "richard.hendriks@mail.com");
      assert.strictEqual(res.resume.contact["github"], "https://github.com/jrm2k6");
      assert.strictEqual(res.resume.contact["city"], "San Francisco");
    });

    it('should return a contact section without a github item', function() {
      var item = {
        "basics" : BASICS_WITHOUT_GITHUB,
        "work": [],
        "education": [],
        "skills": [],
        "languages": [],
        "interests": []
      };


      var res = converter.parseJsonResumeFormat(item);
      assert.notEqual(res.resume.contact,  undefined);
      assert.strictEqual(res.resume.contact["first_name"], "Richard");
      assert.strictEqual(res.resume.contact["last_name"], "Hendriks");
      assert.strictEqual(res.resume.contact["website"], "http://richardhendricks.com");
      assert.strictEqual(res.resume.contact["email"], "richard.hendriks@mail.com");
      assert.strictEqual(res.resume.contact["github"], undefined);
      assert.strictEqual(res.resume.contact["city"], "San Francisco");
    });
});

describe('Verify work section generation', function() {
    it('should return a full work section', function() {
      var item = {
        "basics" : BASICS_WITH_GITHUB,
        "work": WORK,
        "education": [],
        "skills": [],
        "languages": [],
        "interests": []
      };


      var res = converter.parseJsonResumeFormat(item);
      var item = res.resume.work[0]["item-work"];

      assert.notEqual(res.resume.work,  undefined);
      assert.strictEqual(res.resume.work.length, 1);
      assert.strictEqual(item["start-date"], "Dec, 2013");
      assert.strictEqual(item["end-date"], "Dec, 2014");
      assert.strictEqual(item["position"], "CEO/President");
      assert.strictEqual(item["company"]["name"], "Pied Piper");
      assert.strictEqual(item["achievements"], "Pied Piper is a multi-platform technology based on a proprietary universal compression algorithm that has consistently fielded high Weisman Scores™ that are not merely competitive, but approach the theoretical limit of lossless compression.\nBuild an algorithm for artist to detect if their music was violating copy right infringement laws\nSuccessfully won Techcrunch Disrupt\nOptimized an algorithm that holds the current world record for Weisman Scores");
    });
});

describe('Verify education section generation', function() {
    it('should return a full education section', function() {
      var item = {
        "basics" : BASICS_WITH_GITHUB,
        "work": [],
        "education": EDUCATION,
        "skills": [],
        "languages": [],
        "interests": []
      };


      var res = converter.parseJsonResumeFormat(item);
      var item = res.resume.education[0]["item-education"];

      assert.notEqual(res.resume.education,  undefined);
      assert.strictEqual(res.resume.education.length, 2);
      assert.strictEqual(item["start-date"], "Jun, 2011");
      assert.strictEqual(item["end-date"], "Jan, 2014");
      assert.strictEqual(item["description"], "Bachelor in Information Technology");
      assert.strictEqual(item["institution"]["name"], "University of Oklahoma");
    });
});

describe('Verify education section generation', function() {
    it('should return a full education section', function() {
      var item = {
        "basics" : BASICS_WITH_GITHUB,
        "work": [],
        "education": EDUCATION,
        "skills": [],
        "languages": [],
        "interests": []
      };


      var res = converter.parseJsonResumeFormat(item);
      var item = res.resume.education[0]["item-education"];
      
      assert.notEqual(res.resume.education,  undefined);
      assert.strictEqual(res.resume.education.length, 2);
      assert.strictEqual(item["start-date"], "Jun, 2011");
      assert.strictEqual(item["end-date"], "Jan, 2014");
      assert.strictEqual(item["description"], "Bachelor in Information Technology");
      assert.strictEqual(item["institution"]["name"], "University of Oklahoma");
    });
});

describe('Verify skills section generation', function() {
    it('should return a full skills section', function() {
      var item = {
        "basics" : BASICS_WITH_GITHUB,
        "work": [],
        "education": [],
        "skills": SKILLS,
        "languages": [],
        "interests": []
      };


      var res = converter.parseJsonResumeFormat(item);
      var item = res.resume.skills;
      assert.notEqual(res.resume.skills,  undefined);
      assert.strictEqual(res.resume.skills.length, 6);
      assert.strictEqual(item.join(','), 'HTML,CSS,Javascript,Mpeg,MP4,GIF');
    });
});

describe('Verify languages section generation', function() {
    it('should return a full education section', function() {
      var item = {
        "basics" : BASICS_WITH_GITHUB,
        "work": [],
        "education": [],
        "skills": [],
        "languages": LANGUAGES,
        "interests": []
      };


      var res = converter.parseJsonResumeFormat(item);
      var item = res.resume.languages[0]["item-languages"];

      assert.notEqual(res.resume.languages,  undefined);
      assert.strictEqual(res.resume.languages.length, 1);
      assert.strictEqual(item["name"], "English");
      assert.strictEqual(item["additional-info"], "Native speaker");
    });
});

describe('Verify hobbies section generation', function() {
    it('should return a full hobbies section', function() {
      var item = {
        "basics" : BASICS_WITH_GITHUB,
        "work": [],
        "education": [],
        "skills": [],
        "languages": [],
        "interests": INTERESTS
      };


      var res = converter.parseJsonResumeFormat(item);
      var item = res.resume.hobbies[0]["item-hobbies"];

      assert.notEqual(res.resume.hobbies,  undefined);
      assert.strictEqual(res.resume.hobbies.length, 1);
      assert.strictEqual(item["name"], "Wildlife");
      assert.strictEqual(item["additional-info"], "Ferrets, Unicorns");
    });
});
