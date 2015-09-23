import parseTag from './parseTag';

let tagRE = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;
let empty = Object.create(null);

export default function parseHtml(html, options = {}) {
    options.components || (options.components = empty);
    let result = [];
    let current;
    let level = -1;
    let arr = [];
    let byTag = {};
    let inComponent = false;

    html.replace(tagRE, function (tag, index) {
        if (inComponent) {
            if (tag !== ('</' + current.name + '>')) {
                return;
            } else {
                inComponent = false;
            }
        }
        let isOpen = tag.charAt(1) !== '/';
        let start = index + tag.length;
        let nextChar = html.charAt(start);
        let parent;

        if (isOpen) {
            level++;

            current = parseTag(tag);
            if (current.type === 'tag' && options.components[current.name]) {
                current.type = 'component';
                inComponent = true;
            }

            if (!current.voidElement && !inComponent && nextChar && nextChar !== '<') {
                current.children.push({
                    type: 'text',
                    content: html.slice(start, html.indexOf('<', start))
                });
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

        if (!isOpen || current.voidElement) {
            level--;
            if (!inComponent && nextChar !== '<' && nextChar) {
                // trailing text node
                arr[level].children.push({
                    type: 'text',
                    content: html.slice(start, html.indexOf('<', start))
                });
            }
        }
    });

    return result;
};
