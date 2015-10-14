// prevent 'special' name to become a component name
function isReservedNames(name) {
        switch (name) {
        case 'CLASS':
        case 'ENUM':
        case 'EXPORT':
        case 'CASE':
        case 'INTERFACE':
        case 'PACKAGE':
        case 'PRIVATE':
        case 'PUBLIC':
        case 'PROTECTED':
        case 'STATIC':
        case 'XHTML':
        case 'CSS':
        case 'YIELD':
        case 'REACT':
        case 'BABEL':										
        case 'T7':
		case 'IMPORT':
        case 'SUPER':
            return true;
        default:
            return false;
        }
    }

export default isReservedNames;