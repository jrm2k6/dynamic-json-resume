function isArray(elem) {
    return Object.prototype.toString.call(elem) === '[object Array]';
}

function isObject(elem) {
    return Object.prototype.toString.call(elem) === '[object Object]';
}

function generatePlainTextFromJson(_json) {
	var sections = ['contact', 'education', 'work', 'projects', 'skills', 'languages', 'hobbies'];
	var resume = _json['resume'];
	var plainText = "";

	sections.forEach(function(elem, index, array) {
		plainText += elem + "\n";
		plainText += generatePlainTextSection(resume, elem);
	});

	return plainText;
}

function generatePlainTextSection(_json, section) {
	var res = "";
	var sectionContent = _json[section];
	
	if (isArray(sectionContent)) {
		for (var i=0; i<sectionContent.length; i++) {
			if (isObject(sectionContent[i])) {
				var objKeys = Object.keys(sectionContent[i]);
				if (objKeys.length > 0) {
					res += generatePlainTextSection(sectionContent[i], Object.keys(sectionContent[i])[0]);
					res += "\n";
				}
			} else {
				res += sectionContent[i];
				res += "\n";
			}
		}
	} else if (isObject(sectionContent)) {
		var objKeys = Object.keys(sectionContent);
		for (var i=0; i<objKeys.length; i++) {
			var currentKey = objKeys[i];
			if (currentKey !== 'extra' && currentKey !== 'id') {
				if (isObject(sectionContent[currentKey])) {
					res += generatePlainTextSection(sectionContent[currentKey], currentKey);
					res += "\n";
				} else {
					res += currentKey + ' : ' + sectionContent[currentKey];
					res += "\n";
				}
			}
		}
	}

	return res;
}



module.exports = {
	isArray: isArray,
	isObject: isObject,
	generatePlainTextFromJson: generatePlainTextFromJson,
	generatePlainTextSection: generatePlainTextSection
}