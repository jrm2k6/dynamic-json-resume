var utils = require('./utils');

var EXTRA_KEY = "extra";
var ID_KEY = "id";

var TYPE_EXTRA = ["images", "text"];

function extractExtras(jsonStruct) {
	res = iterate(jsonStruct)
	return res;
}

function iterate(jsonStruct) {
	var res = [];
	for (var key in jsonStruct) {
		var obj = jsonStruct[key];
		if (utils.isObject(obj)) {
			if (obj[EXTRA_KEY] && validType(obj[EXTRA_KEY])) {
				if (obj[ID_KEY]) {
					var _e = {};
					_e[ID_KEY] = obj[ID_KEY];
					_e[EXTRA_KEY] = obj[EXTRA_KEY];
					res.push(_e);
				} else {
					console.log("An extra section is defined in an item but no id is associated with it! \n "+
						"Item is type " + key);
				}
			}
			res = res.concat(iterate(obj));
		} else if (utils.isArray(obj)) {
			for (var elem in obj) {
				res = res.concat(iterate(obj[elem]));
			}
		}
	}

	return res;
}

function validType(obj) {
	return TYPE_EXTRA.indexOf(obj.type) != -1;
}

function generateExtraItemsTemplateCode(_extras) {
	var res = []
	for (var i in _extras) {
		res.push(generateSingleExtraItemTemplateCode(_extras[i]));
	}

	return res;
}

function generateSingleExtraItemTemplateCode(_itemObj) {
	switch (_itemObj.extra.type) {
		case "text":
			return generateHtmlDivWithText(_itemObj.id, _itemObj.extra.extraContent);
			break;
		case "images":
			return generateHtmlDivWithImages(_itemObj.id, _itemObj.extra.extraContent);
			break;
		default:
			console.log("This type of extra is not managed: " + _itemObj.extra.type);
			return "";
	}
}

function generateHtmlDivWithText(_id, _content) {
	if (typeof _content == 'string' || _content instanceof String) {
		return "<div id=\"" + _id +"-extra\">" + _content + "</div>";
	} else {
		return "";
	}
}

function generateHtmlDivWithImages(_id, _images) {
	var openDiv = "<div style=\"display: flex; flex-wrap:wrap; justify-content: center\" id=\"" + _id + "-extra\">";
	
	if (utils.isArray(_images)) {
		for (var i in _images) {
			openDiv += "<div class=\"extra-image-item\" style=\"flex: 0 0 auto;\"><img src=\""+ _images[i] + "\" style=\"width: 50%; height: 50%\"/></div>";
		}
	} else if (typeof _images == 'string' || _images instanceof String){
		openDiv += "<div class=\"extra-image-item\" style=\"flex: 0 0 auto;\"><img src=\""+ _images + "\"/></div>";
	} else {
		return "";
	}

	openDiv+="</div>";
	return openDiv;
}

module.exports = {
	extractExtras: extractExtras,
	generateExtraItemsTemplateCode: generateExtraItemsTemplateCode
}