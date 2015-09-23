import isArray from '../../util/isArray';

function transform(ast) {
    if(ast.type === "text") {
        return ast.content;
    } else {
        if(isArray(ast)) {
            if(ast.length === 1) {
                return transform(ast[0]);
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
