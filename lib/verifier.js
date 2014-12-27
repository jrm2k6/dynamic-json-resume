var utils = require('./utils');

var PREFIX = 'item-';
var MANDATORY_INFOS_CONTACT = ["first_name", "last_name", "city", "email"];
var MANDATORY_INFOS_ITEM_EDUCATION = ["start-date", "end-date", "institution", "description"];
var MANDATORY_INFOS_INSTITUTION = ["name", "city", "country"];
var MANDATORY_INFOS_ITEM_WORK = ["start-date", "end-date", "company", "achievements", "technologies"];
var MANDATORY_INFOS_ITEM_PROJECT = ["title", "description", "technologies"];
var MANDATORY_INFOS_ITEM_LANGUAGES_HOBBIES = ["name"];

var MANDATORY_INFOS = {
	"contact" : MANDATORY_INFOS_CONTACT,
	"item-education" : MANDATORY_INFOS_ITEM_EDUCATION,
	"institution": MANDATORY_INFOS_INSTITUTION,
	"item-work": MANDATORY_INFOS_ITEM_WORK,
	"company": MANDATORY_INFOS_INSTITUTION,
	"item-projects": MANDATORY_INFOS_ITEM_PROJECT,
	"item-languages": MANDATORY_INFOS_ITEM_LANGUAGES_HOBBIES,
	"item-hobbies": MANDATORY_INFOS_ITEM_LANGUAGES_HOBBIES
}

function run(_jsonResume) {
	var resumeSection = _jsonResume.resume;
	if (resumeSection) {
		contactInfos = verifyContactInfo(resumeSection);
		educationInfo = verifyEducationInfo(resumeSection);
		workInfo = verifyWorkInfo(resumeSection);
		projectInfo = verifyProjectInfo(resumeSection);
		skillsInfo = verifySkillsInfo(resumeSection);
		languagesInfo = verifyLanguagesInfo(resumeSection);
		hobbiesInfo = verifyHobbiesInfo(resumeSection);
		
		return contactInfos && educationInfo && workInfo
			&& projectInfo && skillsInfo && languagesInfo && hobbiesInfo;
	} else {
		console.log("No resume section has been found in the json that you provided!");
		return false;
	}
}

function verifyContactInfo(resumeSection) {
	return verify(resumeSection, "contact");
}

function verifyEducationInfo(resumeSection) {
	return verify(resumeSection, "education");
}

function verifyWorkInfo(resumeSection) {
	return verify(resumeSection, "work");
}

function verifyProjectInfo(resumeSection) {
	return verify(resumeSection, "projects")
}

function verifySkillsInfo(resumeSection) {
	return verify(resumeSection, "skills", true);
}

function verifyLanguagesInfo(resumeSection) {
	return verify(resumeSection, "languages");
}

function verifyHobbiesInfo(resumeSection) {
	return verify(resumeSection, "hobbies");
}

function verify(_resumeSection, titleSectionToVerify) {
	var hasHiddenArgs = arguments.length > 2;
	var isSimpleArray = hasHiddenArgs && arguments[2];
	var namedSection = _resumeSection[titleSectionToVerify];

	if (namedSection) {
		if (utils.isArray(namedSection)) {
			if (!isSimpleArray) {
				for (var i=0; i<namedSection.length; i++) {
					if (!verify(namedSection[i], PREFIX+titleSectionToVerify)) {
						return false;
					}
				} 
			}

			return true;
		} else {
			var missinProp = null;
			var arrayToCheck = MANDATORY_INFOS[titleSectionToVerify];

			if (arrayToCheck) {
				arrayToCheck.forEach(function(element) {
					var valueElement = namedSection[element];
					if (valueElement === undefined) {
						missinProp = element;
					} else if (utils.isObject(valueElement)){
						var p = {};
						p[element] = valueElement;
						return verify(p, element);
					}
				});

				if (missinProp) {
					console.log("Item with key: " + missinProp + " missing in the " + titleSectionToVerify + " section!");
				} else {
					return true;
				}
			} else {
				console.log("No mandatory fields array found for " + titleSectionToVerify);
			}
		}		
	} else {
		console.log("Missing " + titleSectionToVerify +" section in the json provided!");
	}

	return false;
}


module.exports = {
	run : run 
};