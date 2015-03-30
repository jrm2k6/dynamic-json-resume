var Verifier = require('./lib/verifier');
var ExtraManager = require('./lib/extraItemsManager');

var Converter = require('./lib/converterJsonResumeFormat');

function getResumeWithExtras(resumeJsonFile) {
	var resumeJson = JSON.parse(resumeJsonFile);
	var v = Verifier.run(resumeJson);
	var em = ExtraManager.extractExtras(resumeJson);
	var extraContent = ExtraManager.generateExtraItemsTemplateCode(em);

	if (v) {
		return {'resume': resumeJson.resume, 'extraContent': extraContent};
	} else {
		return undefined;
	}
}

function getTemplatePath(templateName) {
	switch (templateName) {
		case "cv":
			return __dirname + "/templates/cv.html";
			break;
		default:
			console.log("This template doesn't exist in the module: " + templateName);
	}
}

module.exports = {
	getResumeWithExtras : getResumeWithExtras,
	getTemplatePath : getTemplatePath
};