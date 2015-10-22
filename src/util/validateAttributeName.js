const xlink = {
	'xlink:actuate': 'actuate',
	'xlink:arcrole': 'arcrole',
	'xlink:href': 'href',
	'xlink:role': 'role',
	'xlink:show': 'show',
	'xlink:title': 'title',
	'xlink:type': 'type'
};

const xml = {
	'xml:base': 'base',
	'xml:id': 'id',
	'xml:lang': 'lang',
	'xml:space': 'spac'
};

const isInvalidChar = {
	'(': true,
	')': true,
	'/': true,
	'\\': true,
	'[': true,
	']': true,
	'{': true,
	'}': true,
	'0': true,
	'1': true,
	'2': true,
	'3': true,
	'4': true,
	'5': true,
	'6': true,
	'7': true,
	'8': true,
	'9': true,
	'!': true,
	'~': true
};

function validateAttribute( name ) {
	for(let i = 0; i < name.length; i++) {
		let char = name[i];
		if(isInvalidChar[char]) {
			return false;
		}
	}
    return true;
}

export default validateAttribute;
