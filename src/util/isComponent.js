export default function isComponent(tagName) {
// FIX ME!! 'xml/xhtml' have upper case latters in tagname. Need to avoid conflict
// TODO! Validate 'tagName'
    return tagName[0] === tagName[0].toUpperCase();
};
