import isArray from '../../util/isArray';

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

function compileTemplateAttributes(root) {
	let attrsParams = '';

	for (let name in root.attrs) {
		let val = root.attrs[name];
		let matches = val.match(/__\$props__\[\d*\]/g);

		if (matches === null) {
			attrsParams += "'" + name + "':'" + val + "'";
		} else {
			attrsParams += "'" + name + "':" + val;
		}
	}	
	return attrsParams;
}

function compileTemplateRoot(root, templateStringBuilder) {
	debugger;
	if (root.tag != null) {
		templateStringBuilder.push("{tag: '" + root.tag + "'");

		if (root.key != null) {
			templateStringBuilder.push("key: " + root.key);
		}
		if (root.attrs != null) {
			let attrsParams = compileTemplateAttributes(root);
			tagParams.push("attrs: {" + attrsParams + "}");
		}
	} else {
		//no root? then it's a text node
		templateStringBuilder.push("'" + root + "'");
	}
}

export default {
	compile(ast) {
		let templateStringBuilder = [];

		compileTemplateRoot(transform(ast), templateStringBuilder);
		return templateStringBuilder.join("");
	}
};
