import validateAttribute from '../util/validateAttributeName';
import voidTags from '../spec/voidTags';

const excludedChars = {
	"\n": true,
	"\t": true,
	"\r": true,
	"\n": true,
	"\f": true
};

export default function parseHtml(html) {
	let i = 0, size = html.length, char = "", result = [], current, inTag = false,
		outerTag = false, inQuotes = false, inComment = false, content = '', level = -1, arr = [], lastChar = '', parent,
		attrName = '';

	while((char = html[i++]) || i < size) {
		if (excludedChars[char]) {
			continue;
		}
		if (!inComment && lastChar === '<' && char !== '/') {
			if (level > -1 && content.trim() !== '' && !arr[level].isVoid) {
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
				children: [],
				isVoid: false
			};
			if (level === 0) {
				result.push(current);
			}
			parent = arr[level - 1];
			if (parent && !parent.isVoid) {
				parent.children.push(current);
			}
			arr[level] = current;
		} else if (!inComment && ((lastChar === '<' && char === '/') || (lastChar === '/' && char === '>' && inTag))) {
			outerTag = true;
			if(content !== '' && !inTag) {
				if(content.trim() !== '' && !arr[level].isVoid) {
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
		} else if (inTag && char === '-' && lastChar === "-" && !inComment) {
			if(content === "!-") {
				inComment = true;
				current.name = '#comment'
			}
		} else if (inComment && char === '>' && lastChar === '-' && content[content.length - 2] === '-') {
			inComment = false;
			current.children = content.substring(2, content.length - 2).trim();
			level--;
			inTag = false;
			content = '';
		} else if (outerTag && char === '>' && !inComment) {
			//TODO validate tag
			content = '';
			outerTag = false;
		} else if (inTag && !inComment && (char === '>' || (char === ' ' && !inQuotes))) {
			if (current.name === '') {
				current.name = content;
				if(voidTags[content]) {
					current.isVoid = true;
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
		} else if (!inComment && inTag && (char === '"' || char === '\'')) {
			inQuotes = !inQuotes;
		} else if (!inComment && inTag && !inQuotes && char === '=') {
			if(validateAttribute(content)) {
				if(content) {
					attrName = content;
				} else {
						throw Error('t7 expects no whitespace between attribute names and their values. e.g. foo="bar", not foo = "bar"');
				}
			} else {
				//TODO throw error
				attrName = null;
			}
			content = '';
		} else if (inComment || (char !== '<' && char !== '>')) {
			content += char;
		}
		lastChar = char;
	}
	return result;
}
