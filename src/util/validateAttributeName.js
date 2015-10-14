let xlink = {
	'xlink:actuate': 'actuate',
	'xlink:arcrole': 'arcrole',
	'xlink:href': 'href',
	'xlink:role': 'role',
	'xlink:show': 'show',
	'xlink:title': 'title',
	'xlink:type': 'type'
};

let xml = {
	'xml:base': 'base',
	'xml:id': 'id',
	'xml:lang': 'lang',
	'xml:space': 'spac'
};

// Simplified subset
let VALID_ATTRIBUTE_NAME_REGEX = /^[a-zA-Z_][a-zA-Z_\.\-\d]*$/,
    illegalAttributeNameCache = {},
    validatedAttributeNameCache = {};

/**
 * Validate custom attributes
 *
 * @param  {String} name  The boolean attribute name to set.
 */
function validateAttribute( name ) {

    if ( validatedAttributeNameCache[name] ) {
        return true;
    }

    if ( illegalAttributeNameCache[name] ) {
        return false;
    }
    if ( VALID_ATTRIBUTE_NAME_REGEX.test( name ) || 

    // namespace attributes are seen as non-valid, avoid that!
	    ( xml[name] ) || 
		( xlink[name] ) ) {
			
        validatedAttributeNameCache[name] = true;
        return true;
    }

    illegalAttributeNameCache[name] = true;

    return false;
}

export default validateAttribute;