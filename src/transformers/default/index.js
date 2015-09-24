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

export default {
	transform(ast) {
		return transform(ast);
	}
};
