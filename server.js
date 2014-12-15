#!/usr/bin/env node

var express = require('express');
var path = require('path');
var fs = require('fs');
var mustacheExpress = require('mustache-express');
var mustache = require('mustache');
var pdf = require('html-pdf');
var verifier = require('./lib/verifier');
var extraManager = require('./lib/extraItemsManager');
var app = express()

app.use(express.static(path.join(__dirname, 'static')));

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/templates');


app.get('/', function(request, response) {
    var resumeJsonFile = fs.readFileSync(__dirname + "/my-resume.json", 'utf-8', function (err, data) {
    	console.log("Error opening file " + err);
    });

    var resumeJson = JSON.parse(resumeJsonFile);
    var v = verifier.run(resumeJson);
    var em = extraManager.extractExtras(resumeJson);
    var extraContent = extraManager.generateExtraItemsTemplateCode(em);

    if (v) {
    	response.render('dcv.html', {"resume" : resumeJson.resume, "extraContent": extraContent});
    }
});

app.get('/export-to-pdf', function(request, response) {
	fs.readFile(__dirname + "/templates/" + "resume.tpl", 'utf-8', function (err, data) {
		if (err) {
			response.render('500.html', {"error" : err});
			console.log(err);
		} else {
			var templateContent = data;
			fs.readFile(__dirname + "/my-resume.json", 'utf-8', function (err, data) {
		    	var resumeJson = JSON.parse(data);
		    	var v = verifier.run(resumeJson);
		    	var em = extraManager.extractExtras(resumeJson);
		    	var extraContent = extraManager.generateExtraItemsTemplateCode(em);

			    if (templateContent && v) {
			    	fs.readFile(__dirname + "/static/css/base.css", 'utf-8', function(err, data) {
			    		if (err) {
			    			console.log(err);
			    			response.render('500.html', {"error" : err});
			    		}

			    		var head = "<head><style>" + data + "</style></head>";
			    		templateContent = head + templateContent;
			    		var html = mustache.to_html(templateContent, {"resume" : resumeJson.resume});
						pdf.create(html, {
							width: '297mm',
							height: '400mm',
						}, 
						function(err, buffer) {
							if (err) {
								console.log(err);
								response.render('500.html', {"error" : err});
							} else {
								fs.writeFileSync(process.cwd() + '/exports/resume.pdf', buffer);
							}
						});
			    	});
				}
		    });
		}
	});
});

var port = process.env.PORT || 5000;

app.listen(port, function() {
	console.log("Listening on " + port);
});