function isArray(elem) {
    return Object.prototype.toString.call(elem) === '[object Array]';
}

function isObject(elem) {
    return Object.prototype.toString.call(elem) === '[object Object]';
}


module.exports = {
	isArray: isArray,
	isObject: isObject
}