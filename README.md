dynamic-json-resume
===================
[![Build Status](https://travis-ci.org/jrm2k6/dynamic-json-resume.svg?branch=master)](https://travis-ci.org/jrm2k6/dynamic-json-resume)
[![Latest Version](https://img.shields.io/npm/v/json-resume-dynamic.svg?style=flat-square)](https://www.npmjs.com/package/json-resume-dynamic)
[![Total Downloads](https://img.shields.io/npm/dm/json-resume-dynamic.svg?style=flat-square)](https://www.npmjs.com/package/json-resume-dynamic)


Create your resume easily using json, and add some dynamism to it, or export it as pdf.

This started as a small weekend project. In the end, it took me 2/3 afternoons to finish it and have it published on npm.

##Inspiration:

- [json-resume](https://jsonresume.org)
- This [blog post](http://jlongster.com/Removing-User-Interface-Complexity,-or-Why-React-is-Awesome), as I really liked the content loaded as you scroll on the right. I wanted to have the same, in a simple way
for my resume.


##Installation:

``` npm install (--save) json-resume-dynamic ```

##Usage:

- You will have to fill out your resume following a specific json schema.
- This assumes that you are using express for the server part if you want to display your resume on your website.
- If you are not interested in showcasing your resume on your website, you can just export it as a PDF and skip directly to How to generate a PDF from my json file?


##JSON Schema:

Your resume will be divided into 6 sections, all englobed into a ```resume``` JSON object.

####Contact section:
```
"contact" : {
        "first_name": "",
        "last_name": "",
        "website": "",
        "email": "",
        "github": "",
        "city": ""
    }
```
**Optional:** ```website``` and ```github```

####Education section:
This will be composed of an array of ```item-education``` englobed into an ```education``` JSON object.

An ```item-education``` has this form:

```
  "item-education": {
    "start-date": "",
    "end-date": "",
    "institution": {
        "name": "",
        "city": "",
        "country": ""
    },
    "description": "",
    "additional-info": ""
  }
```

**Optional: ```additional-info```.**

#### Work section:
This will be composed of an array of ```item-work``` englobed into a ```work``` JSON object.
```
"item-work": {
    "start-date": "",
    "end-date": "",
    "position": "",
    "company": {
        "name": "",
        "city": "",
        "country": ""
     },
    "achievements": "",
    "technologies": ["", ""]
}
```

#### Project section:
This will be composed of an array of ```item-projects``` englobed into a ```projects``` JSON object.

```
"item-projects": {
    "title": "",
    "description":"",
    "technologies": []
}
```
#### Skills section:
 This is just an array of strings with the key "skills"
 
 ```
 "skills" : ["skill1", "skill2"]
```

#### Languages and Hobbies sections:
This will be composed of an array of ```item-languages``` englobed into a ```languages``` and an array of ```item-hobbies```
into a ```hobbies``` JSON object respectively.

```

"item-languages": {
    "name": "",
    "additional-info": ""
}

{
"item-hobbies": {
    "name": "",
    "additional-info": ""
}

```
**Optional: ```additional-info```.**


##How to add extra content for your resume?
This is done by adding two properties only to the items of your JSON's schema:

1. You need to add an ```id``` attribute
2. You need to add an ```extra``` JSON object having two properties:

```
"extra" {
  "type": "text" || "images"
  "extraContent": <html string> || <string> if type == "text" 
                  [<url-image>] or <url-image> if type == "images"
}
```

You can find an empty schema in ```resume-schema.json``` at the root of the module or a working schema in ```examples/my-resume.json```.

##API:

Two methods only:

```getResumeWithExtras(strResumeAsJson)``` returns an object containing the resume section as ```result.resume``` and the extras section as ```result.extraContent``` 

It will parse the JSON string provided and verify that:
- all the mandatory fields are declared.
- each extra object has an id.

If something is wrong, the error message should give you a good indication on how fix your issue!

```getTemplatePath(nameTemplate)``` returns the template location within the module.

## How to generate a PDF for my resume?
1. Go into the module folder
2. Run ```./cli.js export <json_path> [output_location] [css_file_location]```

By default it will generate a resume.pdf file in the current directory.

You can also generate an html file containing your resume:

1. Go into the module folder
2. Run ```./cli.js exportToHtml <json_path> [output_location] [css_file_location]```


And as a plain text file (as it is sometimes the only solution for some job posts **hmhm**):

1. Go into the module folder
2. Run ```./cli.js exportToPlainText <json_path> [output_location]```


## Generate your dynamic resume from your [json-resume](https://jsonresume.org/)

1. Go into the module folder
2. Run ```./cli.js generateFromJsonResume <json_path> [output_location]```

## Example
##### Complete example to integrate this into your node app (assuming you use node-express and mustache-express):

```
var express = require('express');
var path = require('path');
var fs = require('fs');
var mustacheExpress = require('mustache-express');
var dynamicJsonResume = require('json-resume-dynamic');
var app = express()

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'node_modules/json-resume-dynamic/static')));

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');


app.get('/', function(request, response) {
    var resumeJsonFile = fs.readFileSync(__dirname + "/my-resume.json", 'utf-8', function (err, data) {
    });

    var resume = dynamicJsonResume.getResumeWithExtras(resumeJsonFile);
    if (resume) {
        response.render(dynamicJsonResume.getTemplatePath('cv'), resume);
    }
});

var port = process.env.PORT || 5000;

app.listen(port, function() {
console.log("Listening on " + port);
}); 
```

##Tests

You can run the tests by executing: ```npm test```
##Mentions:
 - [Marc Bachmann](https://github.com/marcbachmann) for the nice to use [node-html-pdf](https://github.com/marcbachmann/node-html-pdf)

You can find a quickly done example here: http://resume-jeremydagorn.herokuapp.com/.
You can of course modify the theme/style of your resume by playing around with [those files](https://github.com/jrm2k6/dynamic-json-resume/tree/master/static/css).
