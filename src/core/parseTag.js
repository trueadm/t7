import voidTags from './voidTags';

let ATTRIBUTE_REGEX = /([\w-:]+)|('[^\']*')|("[^\"]*")/g;
let attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

let has = function(value) {
	return this.indexOf(value) !== -1;
}

export default tag => {
	let tokenIndex = 0;
	let key;
	let res = {
		type: 'tag',
		name: '',
		description: '',
		voidElement: false,
		attrs: {},
		children: []
	};

	console.log(tag);
	tag.replace(ATTRIBUTE_REGEX, match => {
		if (tokenIndex === 0) {
			if (voidTags::has(match) || tag.charAt(tag.length - 2) === '/') {
				res.voidElement = true;
			}
			if (match.indexOf(':') > 0) {
				let parts = match.split(':');
				res.name = parts[1];
				res.description = parts[0];
			}
			else {
				res.name = match;
			}
		}
		else if (tokenIndex % 2) {
			key = match;
		}
		else {
			res.attrs[key] = match.replace(/['"]/g, '');
		}
		tokenIndex++;
	});

	return res;
};
