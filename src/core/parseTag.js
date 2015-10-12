import voidTags from '../spec/voidTags';
import fillAttrs from '../spec/fillAttrs';

let ATTRIBUTE_REGEX = /([\w-]+)|('[^\']*')|("[^\"]*")/g;
let attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;
let html5Data = /(data-)/g; // TODO
let rmultiDash = /[A-Z]/g; // TODO

export default tag => {
	let tokenIndex = 0;
	let key;
	let res = {
		type: 'tag',
		name: '',
		voidElement: false,
		attrs: {},
		children: []
	};

	//handle dynamic tags
	tag = tag.replace(/(__\$props__\[.*\])/g, "'$1'");
	tag.replace(ATTRIBUTE_REGEX, match => {
		if (tokenIndex === 0) {
			if (voidTags[match] || tag.charAt(tag.length - 2) === '/') {
				res.voidElement = true;
			}
			res.name = match;
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
