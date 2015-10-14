/**
 * Validate namespace through the 'xmlns' attribute
 * @param {String}  ns  The namespace to validate
 * @return {Boolean} true / false
 *
 * Usage:
 *
 * let xmlns='http://www.w3.org/1999/xhtml';
 *
 *  validNamespaces(xmlns);
 */
function validNamespaces(ns) {
    switch (ns) {
        case 'http://www.w3.org/1999/xhtml': // html
        case 'http://www.w3.org/1998/Math/MathML': // MathML
        case 'http://www.w3.org/2000/svg': // SVG
        case 'http://www.w3.org/1999/xlink': // Xlink
        case 'http://www.w3.org/XML/1998/namespace': // XML
        case 'http://www.w3.org/2000/xmlns/': // XMLNS
            return true;
        default:
            return false;
    }
};

export default validNamespaces;