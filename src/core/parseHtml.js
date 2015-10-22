import validateAttribute from '../util/validateAttributeName';

const excludedChars = {
	"\n": true,
	"\t": true,
	"\r": true,
	"\n": true,
	"\f": true
};

export default function parseHtml(html) {
	let i = 0, size = html.length, char = "", result = [], current, inTag = false,
		outerTag = false, inQuotes = false, content = '', level = -1, arr = [], lastChar = '', parent,
		attrName = '';

	while((char = html[i++]) || i < size) {
		if (excludedChars[char]) {
			continue;
		}
		if (lastChar === '<' && char !== '/') {
			if (level > -1 && content.trim() !== '') {
				arr[level].children.push({
					type: 'text',
					content: content
				});
			}
			level++;
			content = char;
			inTag = true;
			current = {
				type: 'tag',
				name: '',
				attrs: {},
				children: []
			};
			if (level === 0) {
				result.push(current);
			}
			parent = arr[level - 1];
			if (parent) {
				parent.children.push(current);
			}
			arr[level] = current;
		} else if ((lastChar === '<' && char === '/') || (lastChar === '/' && char === '>' && inTag)) {
			outerTag = true;
			if(content !== '' && !inTag) {
				if(content.trim() !== '') {
					if(current.name === '#comment') {
						content = content.substring(0, content.trim().length - 3);
					}
					arr[level].children.push({
						type: 'text',
						content: content
					});
				}
			} else if (inTag) {
				inTag = false;
				if(content[content.length - 1] === "/") {
					content = content.substring(0, content.length - 1);
				}
				if (current.name === '') {
					current.name = content;
				} else if (content && attrName) {
					current.attrs[attrName] = content;
				}
			}
			attrName = '';
			content = '';
			level--;
		} else if (outerTag && char === '>') {
			//TODO validate tag
			content = '';
			outerTag = false;
		} else if (inTag && (char === '>' || (char === ' ' && !inQuotes))) {
			if (current.name === '') {
				if (content === '!--') {
					current.name = '#comment';
					inTag = false;
				} else {
					current.name = content;
				}
			} else if (content && attrName) {
				current.attrs[attrName] = content;
			} else if (content && attrName !== null) {
				current.attrs[content] = true;
			}
			attrName = '';
			content = '';
			if (char === '>') {
				inTag = false;
			}
		} else if (inTag && (char === '"' || char === '\'')) {
			inQuotes = !inQuotes;
		} else if (inTag && !inQuotes && char === '=') {
			if(validateAttribute(content)) {
				attrName = content;
			} else {
				//TODO throw error
				attrName = null;
			}
			content = '';
		} else if (char !== '<' && char !== '>') {
			content += char;
		}
		lastChar = char;
	}
	return result;
}
