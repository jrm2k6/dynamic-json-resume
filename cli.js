#!/usr/bin/env node

var commander = require('commander');
var path = require('path');
var fs = require('fs');
var mustache = require('mustache');
var pdf = require('html-pdf');
var verifier = require('./lib/verifier');
var extraManager = require('./lib/extraItemsManager');

var program = require('commander');

program
  .version('0.0.1')

program
  .command('export <path_json> [pdf_location] [css_file_location]')
  .description('Export a pdf resume from the json resume provided to the given location, applying the css file given')
  .action(function(path_json, pdf_location, css_file_location) {
  		fs.readFile(__dirname + "/templates/" + "resume.tpl", 'utf-8', function (err, data) {
			if (err) {
				console.log(err);
			} else {
				var templateContent = data;
				fs.readFile(__dirname + '/' + path_json, 'utf-8', function (err, data) {
			    	var resumeJson = JSON.parse(data);
			    	var v = verifier.run(resumeJson);
			    	var em = extraManager.extractExtras(resumeJson);
			    	var extraContent = extraManager.generateExtraItemsTemplateCode(em);

				    if (templateContent && v) {
				    	var _cssFile = '/' + css_file_location || "/static/css/base.css";
				    	fs.readFile(__dirname + _cssFile, 'utf-8', function(err, data) {
				    		if (err) {
				    			console.log(err);
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
								} else {
									try {
										var _pdf_location = '/' + pdf_location || 'exports/resume.pdf';
										var _path = process.cwd() + _pdf_location;
										fs.writeFileSync(_path, buffer);
									} catch (err) {
    									console.log("Problem writing " + _path + " : " + err.message)
									    process.exit(1);
									}
								}
							});
				    	});
					}
			    });
			}
		});
    });

program.parse(process.argv);