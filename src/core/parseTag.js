import voidTags          from '../spec/voidTags';
import processAttributes from './processAttributes';

let ATTRIBUTE_REGEX = /([\w-]+)|('[^\']*')|("[^\"]*")/g;
let attributeWhitespace = /['"]/g;

export default tag => {
	let tokenIndex = 0;
	let key;
	let res = {
		type: 'tag',
		name: '',
		selfClosing: false,
		attrs: {},
		children: []
	};

	// handle dynamic tags
	tag = tag.replace(/(__\$props__\[.*\])/g, "'$1'");

    // FIX ME! tag names should be validated to avoid chinese and arabic tags, and also avoid numberic and special chars.
	tag.replace(ATTRIBUTE_REGEX, match => {
		if (tokenIndex === 0) {
			if (voidTags[match] || tag.charAt(tag.length - 2) === '/') { // 'charAt' slow - consider slice etc?
				res.selfClosing = true;
			}
			res.name = match;
		}
		else if (tokenIndex % 2) {
			key = match;
		} else {
			// Process attributes
			processAttributes(key, match.replace(attributeWhitespace, ''), res);
		}
		tokenIndex++;
	});

	return res;
};
