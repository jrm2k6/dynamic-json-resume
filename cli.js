#!/usr/bin/env node

var commander = require('commander');
var path = require('path');
var fs = require('fs');
var mustache = require('mustache');
var pdf = require('html-pdf');
var pkg = require('./package.json');
var verifier = require('./lib/verifier');
var extraManager = require('./lib/extraItemsManager');
var utils = require('./lib/utils');
var converter = require('./lib/converterJsonResumeFormat');

var program = require('commander');

program
  .version(pkg.version)

program
  .command('export <path_json> [pdf_location] [css_file_location]')
  .description('Export a pdf resume from the json resume provided to the given location, applying the css file given')
  .action(function(path_json, pdf_location, css_file_location) {
  		fs.readFile(__dirname + "/templates/" + "resume.tpl", 'utf-8', function (err, data) {
			if (err) {
				console.log(err);
				process.exit(1);
			} else {
				var templateContent = data;
				fs.readFile(__dirname + '/' + path_json, 'utf-8', function (err, data) {
					if (err) {
						console.log(err);
						process.exit(1);
					}
			    	var resumeJson = JSON.parse(data);
			    	var v = verifier.run(resumeJson);

				    if (templateContent && v) {
				    	var _cssFile = "/static/css/base.css";
				    	if (css_file_location) {
				    		_cssFile = '/' + css_file_location;
				    	}

				    	fs.readFile(__dirname + _cssFile, 'utf-8', function(err, data) {
				    		if (err) {
				    			console.log(err);
				    			process.exit(1);
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
									process.exit(1);
								} else {
									try {

										var finalPdfLocation = '/resume.pdf';

										if (pdf_location) {
											finalPdfLocation = '/' + pdf_location;
										}
										var _path = process.cwd() + finalPdfLocation;
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

program
  .command('exportToHtml <path_json> [html_location] [css_file_location]')
  .description('Export an html resume from the json resume provided to the given location, applying the css file given')
  .action(function(path_json, html_location, css_file_location) {
  		fs.readFile(__dirname + "/templates/" + "resume.tpl", 'utf-8', function (err, data) {
			if (err) {
				console.log(err);
				process.exit(1);
			} else {
				var templateContent = data;
				fs.readFile(__dirname + '/' + path_json, 'utf-8', function (err, data) {
					if (err) {
						console.log(err);
						process.exit(1);
					}
			    	var resumeJson = JSON.parse(data);
			    	var v = verifier.run(resumeJson);

				    if (templateContent && v) {
				    	var _cssFile = "/static/css/base.css";
				    	if (css_file_location) {
				    		_cssFile = '/' + css_file_location;
				    	}

				    	fs.readFile(__dirname + _cssFile, 'utf-8', function(err, data) {
				    		if (err) {
				    			console.log(err);
				    			process.exit(1);
				    		}

				    		data += "#extra {display: none;}"

				    		var head = "<head><style>" + data + "</style></head>";
				    		templateContent = head + templateContent;
				    		var html = mustache.to_html(templateContent, {"resume" : resumeJson.resume});
				    		
				    		var outputLocation = '/resume.html';

				    		if (html_location) {
				    			outputLocation = '/' + html_location;
				    		}

				    		outputLocation = process.cwd() + outputLocation;
				    		fs.writeFile(outputLocation, html, function(err) {
				    			if (err) {
				    				console.log(err);
									process.exit(1);
				    			}
				    		});
				    	});
					}
			    });
			}
		});
    });

program
  .command('exportToPlainText <path_json> [output_location]')
  .description('Export a text file resume from the json resume provided to the given location')
  .action(function(path_json, output_location) {
		fs.readFile(__dirname + '/' + path_json, 'utf-8', function (err, data) {
			if (err) {
				console.log(err);
				process.exit(1);
			}
	    	var resumeJson = JSON.parse(data);
	    	var v = verifier.run(resumeJson);

		    if (v) {
		    	var outputLocation = '/resume.txt';

    			if (output_location) {
    				outputLocation = '/' + output_location;
    			}

		    	outputLocation = process.cwd() + outputLocation;
		    	var textFileContent = utils.generatePlainTextFromJson(resumeJson);
		    	fs.writeFile(outputLocation, textFileContent, function(err) {
		    		if (err) {
		    			console.log(err);
						process.exit(1);
		    		}
		    	});
			}
		});
    });

program
	.command('generateFromJsonResume <path_json> [output_location]')
	.description('Generate a json from a json-resume file')
	.action(function(path_json, output_location) {
		fs.readFile(__dirname + '/' + path_json, 'utf-8', function(err, data) {
			if (err) {
				console.log(err);
				process.exit(1);
			}

			var asJsonResume = JSON.parse(data);
			var generatedJson = converter.parseJsonResumeFormat(asJsonResume);

			if (output_location) {
				converter.writeGeneratedJsonToFile(__dirname + '/' + output_location, generatedJson);
			} else {
				converter.writeGeneratedJsonToFile('converted.json', generatedJson);
			}
		});
	});

program.parse(process.argv);
