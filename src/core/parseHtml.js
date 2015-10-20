import parseTag from './parseTag';

let tagRegex = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
let empty = {};
let whitespace = /[\t\r\n\f]+/g

export default function parseHtml(html, options = {}) {
	options.components || (options.components = empty);

	let result = [];
	let current;
	let level = -1;
	let arr = [];
	let byTag = {};
	let inComponent = false;
	html = html.replace( whitespace,''); // calculate for special and hidden chars etc etc

	html.replace(tagRegex, (tagElement, index) => {
		if (inComponent) {
			if (tagElement !== ('</' + current.name + '>')) {
				return;
			} else {
				inComponent = false;
			}
		}

		let isOpen = tagElement[1] !== '/';
		let start = index + tagElement.length;
		let nextChar = html.charAt(start);
		let parent;

		if (isOpen) {
			level++;
			current = parseTag(tagElement);
			result.description = current.description
			if (current.type === 'tag' && (options.components[current.name])) {
				current.type = 'component';
				inComponent = true;
			}
			if (!current.selfClosing && (!inComponent && nextChar && nextChar !== '<')) {
				var content = html.slice(start, html.indexOf('<', start));
				if(content.trim() !== "") {
					current.children.push({
						type: 'text',
						content: content
					});
				}
			}
			byTag[current.tagName] = current;
			// if we're at root, push new base node
			if (level === 0) {
				result.push(current);
			}
			parent = arr[level - 1];
			if (parent) {
				parent.children.push(current);
			}
			arr[level] = current;
		}

		if (!isOpen || current.selfClosing) {
			level--;
			if (!inComponent && nextChar !== '<' && nextChar) {
				var content = html.slice(start, html.indexOf('<', start));
				// trailing text node
				if(content.trim() !== "") {
					arr[level].children.push({
						type: 'text',
						content: content
					});
				}
			}
		}
	});

	return result;
};
