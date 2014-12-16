var verifier = require('./lib/verifier');
var extraManager = require('./lib/extraItemsManager');

function getResumeWithExtras(resumeJsonFile) {
	var resumeJson = JSON.parse(resumeJsonFile);
	var v = verifier.run(resumeJson);
	var em = extraManager.extractExtras(resumeJson);
	var extraContent = extraManager.generateExtraItemsTemplateCode(em);

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