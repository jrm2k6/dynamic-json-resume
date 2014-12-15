var verifier = require('./lib/verifier');
var extraManager = require('./lib/extraItemsManager');

function getResumeWithExtras() {
	var resumeJson = JSON.parse(resumeJsonFile);
	var v = verifier.run(resumeJson);
	var em = extraManager.extractExtras(resumeJson);
	var extraContent = extraManager.generateExtraItemsTemplateCode(em);

	if (v) {
		return {'resumeJson': resumeJson, 'extraContent': extraContent};
	} else {
		return undefined;
	}
}

module.exports = {
	getResumeWithExtras : getResumeWithExtras
};