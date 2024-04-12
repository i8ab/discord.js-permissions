const { findBestMatch } = require("./string-similarity.js");
const { permissions } = require("./constants.js");

function correctPermission(perm) {
	if (findBestMatch(perm, Object.keys(permissions))?.bestMatch?.rating == 0) return null;

	return perm ? findBestMatch(perm, Object.keys(permissions)).bestMatch.target : null;
}

function isValidValue(value) {
	if (value != 0 && !value) throw new Error('"value" Parameter Not Found');
	if (!["string", "number"].includes(typeof value)) throw new Error('"value" Parameter Must Be String/Number Data Type');
	
	if (isNaN(parseInt(value))) return false;

	value = parseInt(value);

	let result = false;

	let validValues = Object.values(permissions);

	for (let i = 0; i < validValues.length; i++) {
		let v = validValues[i];

		if (((value & v[1]) == v[1]) || value == v[1]) {
			result = true;
			break;
		}
	}

	return result;
}

function valueOf(names) {
	if (!names) throw new Error('"names" Parameter Not Found');

	let allResult = 0;

	if (typeof names == 'string') {
		if (isValidValue(names)) return parseInt(names);

		names = correctPermission(names);

		return permissions[`${names}`];
	} else if (Array.isArray(names)) {
		
		for (let i = 0; i < names.length; i++) {
			let n = names[i];

			if (!correctPermission(n)) continue;

			n = correctPermission(n);

			allResult += Reflect.get(permissions, n);
		}

	} else {
		return null
	}

	return allResult;
}

function valueToName(value) {
	if (!value) throw new Error('"value" Parameter Not Found');
	if (isNaN(parseInt(value))) throw new Error('"value" Parameter Is Not A Valid Permission Value');
	value = parseInt(value);

	let arr = [];

	Object.entries(permissions).forEach(v => {
		if ( ((value & v[1]) == v[1]) || value == v[1] ) arr.push(v[0]);
	});

	return arr.length == 1 ? arr[0] : arr;
}

exports.correctPermission = correctPermission;
exports.isValidValue = isValidValue;
exports.valueOf = valueOf;
exports.valueToName = valueToName;

exports.Permission = class Permission {
	constructor(permission) {
		if (permission) {
			this.permission = typeof permission == 'string' ? permissions[`${correctPermission(permission)}`] : permission;
		}
	}

	has(arg1, arg2) {		
		let askedPerm = this.permission ? this.permission : arg1;
		let requiredPerm = askedPerm == arg1 ? arg2 : arg1;

		askedPerm = typeof askedPerm == 'string' && isNaN(parseInt(askedPerm)) ? permissions[`${correctPermission(askedPerm)}`] : askedPerm;
		requiredPerm = Array.isArray(requiredPerm) ? requiredPerm : typeof requiredPerm == 'string' && isNaN(parseInt(requiredPerm)) ? permissions[`${correctPermission(requiredPerm)}`] : requiredPerm;

		let adminPerm = permissions[correctPermission('Administrator')];
		if (((askedPerm & adminPerm) == adminPerm) || askedPerm == adminPerm) return true;

		if (!Array.isArray(requiredPerm)) {
			if ((askedPerm & requiredPerm) == requiredPerm) return true;
			return false;
		} else {
			let i = 0;

			requiredPerm.forEach(p => {
				p = typeof p == 'string' && isNaN(parseInt(p)) ? permissions[`${correctPermission(p)}`] : p;
				if ((askedPerm & p) == p) i++
			});

			if (i == requiredPerm.length) return true;
			return false;
		}
	}
}