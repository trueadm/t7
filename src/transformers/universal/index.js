import isArray from '../../util/isArray';
import isComponent from '../../util/isComponent';

function transform(ast) {
	// 'ast' now contains a description for the tag
	if (ast.type === 'text') {
		return ast.content;
	}
	else {
		if (isArray(ast)) {
			let length = ast.length;

			if (length === 1) {
				return transform(ast[0]);
			} else {
				let children = new Array(length);
				for(let i = 0; i < length; i++) {
					children[i] = transform(ast[i]);
				}
				return children;
			}
		} else {
			let hasAttrs = ast.attrs && Object.keys(ast.attrs).length > 0;
			let hasChildren = ast.children && ast.children.length > 0;
			let childrenIsString = false;

			if (hasChildren && hasAttrs) {
				return {
					tag: ast.name,
					attrs: ast.attrs,
					children: transform(ast.children)
				}
			} else if (hasChildren && !hasAttrs) {
				return {
					tag: ast.name,
					children: transform(ast.children)
				}
			} else if (!hasChildren && hasAttrs) {
				return {
					tag: ast.name,
					attrs: ast.attrs
				}
			} else {
				return {
					tag: ast.name,
				}
			}
		}
	}
}

function compileTemplateAttributes(ast) {
	let attrsParams = [];

	for (let name in ast.attrs) {
		let val = ast.attrs[name];
		val = val.replace(/(__\$props__\[.*\])/g, '" + $1 + "')
		attrsParams.push('"' + name + '":"' + val + '"');
	}
	return attrsParams.join(', ');
}

function compileTemplateChildren(root, rootChildrenStringBuilder, childrenProp) {
	let childrenStringBuilder = [];

	if (root.children != null && isArray(root.children)) {
		for (let i = 0, n = root.children.length; i < n; i++) {
			let child = root.children[i];
			if (child != null) {
				if (typeof child === 'string') {
					child = child.replace(/(\r\n|\n|\r)/gm, '');
					let matches = child.match(/__\$props__\[\d*\]/g);

					if (matches !== null) {
						childrenStringBuilder.push(root.children[i]);
					} else {
						childrenStringBuilder.push('"' + root.children[i] + '"');
					}
				} else {
					compileTemplateRoot(root.children[i], childrenStringBuilder);
				}
			}
		}
	} else if (root.children != null && typeof root.children === 'string') {
		let child = root.children.replace(/(\r\n|\n|\r)/gm, '');
		let noManipulate = true;
		child = child.replace(/(__\$props__\[.*\])/g, '",$1,"')
		//if the last two characters are ,', replace them with nothing
		if (child.substring(child.length - 2) === ',"') {
			child = child.substring(0, child.length - 2);
			noManipulate = false;
		}
		if (child.substring(0, 2) === '",') {
			child = child.substring(2);
			noManipulate = false;
		}
		if(noManipulate) {
			rootChildrenStringBuilder.push((childrenProp ? "children: " : "") + '"' + child + '"');
		} else {
			rootChildrenStringBuilder.push((childrenProp ? "children: " : "") + child);
		}
	} else {
		compileTemplateRoot(root.children, childrenStringBuilder);
	}
	//if we have some children in our string builder, create it up and put it on our root children string builder
	if (childrenStringBuilder.length === 1) {
		rootChildrenStringBuilder.push((childrenProp ? 'children: ' : '') + childrenStringBuilder[0]);
	} else if (childrenStringBuilder.length > 1) {
		rootChildrenStringBuilder.push((childrenProp ? 'children: ' : '') + '[' + childrenStringBuilder.join(",") + ']');
	}
}

function compileTemplateRoot(root, rootStringBuilder) {
	if (root.tag != null) {
		let rootString;

		if(isComponent(root.tag)) {
			let attrsParams = null;

			if (root.attrs != null) {
				attrsParams = compileTemplateAttributes(root);
			}

			rootString = 'components.' + root.tag + '({' + attrsParams + '})';
		} else {
			rootString = '{tag: "' + root.tag + '"';

			if (root.key != null) {
				rootString += ', key: ' + root.key;
			}
			if (root.attrs != null) {
				let attrsParams = compileTemplateAttributes(root);
				rootString += ', attrs: {' + attrsParams + '}';
			}
			if (root.children != null) {
				let childrenStringBuilder = [];
				compileTemplateChildren(root, childrenStringBuilder, true);
				//add the children and close the object
				rootString += ', ' + childrenStringBuilder.join(',') + '}';
			} else {
				//close the object if there are not children
				rootString += '}';
			}
		}

		rootStringBuilder.push(rootString);
	} else {
		//no root? then it's a text node
		rootStringBuilder.push("'" + root + "'");
	}
}

export default {
	compile(ast) {
		let templateStringBuilder = [];

		compileTemplateRoot(transform(ast), templateStringBuilder);
		return templateStringBuilder.join(', ');
	}
};
