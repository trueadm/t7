import isArray from '../../util/isArray';
import isComponent from '../../util/isComponent';

function compileTemplateAttributes(ast) {
	let attrsParams = [];
    let childRegex = /__\$props__\[\d*\]/g;
	let whitespace = /[\t\r\n\f]+/gm;

	for (let name in ast.attrs) {
		let val = ast.attrs[name];
		val = val.replace(/(__\$props__\[.*\])/g, '" + $1 + "') // Todo
		attrsParams.push('"' + name + '":"' + val + '"');
	}
	return attrsParams.join(', ');
}

function compileTemplateChildren(ast, rootChildrenStringBuilder, childrenProp) {
	let childrenStringBuilder = [];

	if (ast.children != null && isArray(ast.children)) {
		for (let i = 0, n = ast.children.length; i < n; i++) {
			let child = ast.children[i];
			if (child != null) {
				if (typeof child === 'string') {
					child = child.replace(whitespace, '');
					let matches = child.match(childRegex);

					if (matches != null) {
						childrenStringBuilder.push(ast.children[i]);
					} else {
						childrenStringBuilder.push('"' + ast.children[i] + '"');
					}
				} else {
					compileTemplateRoot(ast.children[i], childrenStringBuilder);
				}
			}
		}
	} else if (ast.children != null && typeof ast.children === 'string') {
		let child = ast.children.replace(whitespace, '');
		child = child.replace(/(__\$props__\[.*\])/g, '",$1,"')
		//if the last two characters are ,', replace them with nothing
		if (child.substring(child.length - 2) === ',"') {
			child = child.substring(0, child.length - 2);
			rootChildrenStringBuilder.push((childrenProp ? "children: " : "") + '"' + child);
		} else {
			rootChildrenStringBuilder.push((childrenProp ? "children: " : "") + '"' + child + '"');
		}
	} else {
		compileTemplateRoot(root.children, childrenStringBuilder);
	}
	//if we have some children in our string builder, create it up and put it on our root children string builder
	if (childrenStringBuilder.length === 1) {
		rootChildrenStringBuilder.push(childrenStringBuilder[0]);
	} else if (childrenStringBuilder.length > 1) {
		rootChildrenStringBuilder.push(childrenStringBuilder.join(", "));
	} else {
        rootChildrenStringBuilder.push("null");
    }
}

function compileTemplateRoot(ast, rootStringBuilder) {
	if (ast.name != null) {
		let rootString = '';

		if(isComponent(ast.name)) {
			rootString = 'React.createElement(t7.load("' + ast.name + '")';
		} else {
			rootString = 'React.createElement("' + ast.name + '"';
		}

        let attrsParams = '';

		if (ast.attrs != null) {
			attrsParams = compileTemplateAttributes(ast);
		}
        if(attrsParams !== '') {
            rootString += ', {' + attrsParams + '}';
        } else {
            rootString += ', null';
        }

		if (ast.children != null) {
			let childrenStringBuilder = [];
			compileTemplateChildren(ast, childrenStringBuilder, true);
			//add the children and close the object
			rootString += ', ' + childrenStringBuilder.join(',') + ')';
		} else {
			//close the object if there are not children
			rootString += ')';
		}
		rootStringBuilder.push(rootString);
	} else {
		//no root? then it's a text node
        let child = ast.content;
        child = child.replace(/(__\$props__\[.*\])/g, '",$1,"')
		rootStringBuilder.push('"' + child + '"');
	}
}

export default {
	compile(ast) {
		let templateStringBuilder = [];

		compileTemplateRoot(ast[0], templateStringBuilder);
		return templateStringBuilder.join(', ');
	}
};
