var fs = require('fs');

var parseJsonResumeFormat = function(resumeJson) {	
	var contactSection = generateContactSection(resumeJson["basics"]);
	var educationSection = generateEducationSection(resumeJson["education"]);
	var workExperiencesSection = generateWorkExperiencesSection(resumeJson["work"]);
	var skillsSection = generateSkillsSection(resumeJson["skills"]);
	var languagesSection = generateLanguagesSection(resumeJson["languages"]);
	var hobbiesSection = generateHobbiesSection(resumeJson["interests"]);

	var generatedJson = {
		resume: {
			contact: contactSection,
			education: educationSection,
			projects: [],
			work: workExperiencesSection,
			skills: skillsSection,
			languages: languagesSection,
			hobbies: hobbiesSection
		}
	};

	return generatedJson;
}

var writeGeneratedJsonToFile = function(filename, generatedJson) {
	fs.writeFile(filename, JSON.stringify(generatedJson, null, 4), function(err) {
		if (err) {
			console.log("Error writing to file " + filename);
		}

		console.log("File " + filename + " created!");
	});
}

var generateContactSection = function(_basics) {
	var contact = {};
	var splitName = _basics["name"].split(" ");
	var firstName = splitName[0];
	var lastName = splitName.slice(1).join(" ");
	contact["first_name"] = firstName;
	contact["last_name"] = lastName;
	
	if (_basics["website"])
		contact["website"] = _basics["website"];

	if (_basics["email"])
		contact["email"] = _basics["email"];

	var githubUrl = getGithubUrl(_basics["profiles"]);
	if (githubUrl)
		contact["github"] = githubUrl;

	var city = getCity(_basics["location"]);
	if (city)
		contact["city"] = city;
	
	return contact;
}

var getGithubUrl = function(_profiles) {
	if (!_profiles) {
		return null;
	}

	var githubProfile = _profiles.filter(function(elem) {
		return elem["network"] === "Github";
	});

	if (githubProfile.length > 0)
		return githubProfile[0]["url"];
	else
		return null;
}

var getCity = function(_location) {
	return _location["city"];
}

var generateEducationSection = function(_education) {
	var _convertedEducationItems = _education.map(function(_educationItem) {
		var item = {};
		item["start-date"] = convertDate(_educationItem["startDate"]);
		item["end-date"] = convertDate(_educationItem["endDate"]);
		item["description"] = _educationItem["studyType"] + " in " + _educationItem["area"];
		item["institution"] = {
			"name": _educationItem["institution"],
			"city": "",
			"country": ""
		};

		return item;
	});

	_convertedEducationSection = _convertedEducationItems.reduce(function(acc, item) {
		var obj = {};
		obj["item-education"] = item;
		acc.push(obj);
		return acc;
	}, []);

	return _convertedEducationSection;
}

var generateWorkExperiencesSection = function(_workExperiences) {
	var _convertedWorkItems = _workExperiences.map(function(_workExperience) {
		var item = {};
		item["start-date"] = convertDate(_workExperience["startDate"]);
		item["end-date"] = convertDate(_workExperience["endDate"]);
		item["position"] = _workExperience["position"];
		item["company"] = {
			"name": _workExperience["company"],
			"city": "",
			"country": ""
		};

		item["achievements"] = _workExperience["summary"] + "\n" + _workExperience["highlights"].join("\n");
		item["technologies"] = [];
		
		return item;
	});

	_convertedWorkExperiencesSection = _convertedWorkItems.reduce(function(acc, item) {
		var obj = {};
		obj["item-work"] = item;
		acc.push(obj);
		return acc;
	}, []);

	return _convertedWorkExperiencesSection;
}

var generateSkillsSection = function(_skills) {
	var _convertedSkills = _skills.map(function(item) {
		return item["keywords"];
	});

	var _convertedSkills =  _convertedSkills.reduce(function(acc, item) {
		return acc.concat(item);
	}, []);

	return _convertedSkills;
}

var generateLanguagesSection = function(_languages) {
	var _converterLanguagesItems = _languages.map(function(_language) {
		var item = {};
		item["name"] = _language["language"];
		item["additional-info"] = _language["fluency"];
		return item;
	});

	_convertedLanguagesSection = _converterLanguagesItems.reduce(function(acc, item){
		var obj = {};
		obj["item-languages"] = item;
		acc.push(obj);
		return acc;
	}, []);

	return _convertedLanguagesSection;
}

var generateHobbiesSection = function(_hobbies) {
	var _converterHobbiesItems = _hobbies.map(function(_hobby) {
		var item = {};
		item["name"] = _hobby["name"];
		item["additional-info"] = _hobby["keywords"].join(", ");
		return item;
	});

	_convertedHobbiesSection = _converterHobbiesItems.reduce(function(acc, item){
		var obj = {};
		obj["item-hobbies"] = item;
		acc.push(obj);
		return acc;
	}, []);

	return _convertedHobbiesSection;
}

var convertDate = function(date) {
	var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
	var splitDate = date.split('-');
	return MONTHS[parseInt(splitDate[1]-1)] + ", " + splitDate[0];
}

module.exports = {
	parseJsonResumeFormat: parseJsonResumeFormat,
	writeGeneratedJsonToFile: writeGeneratedJsonToFile
}